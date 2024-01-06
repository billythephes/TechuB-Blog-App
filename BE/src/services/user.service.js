const UserRepository = require('../models/repository/user.repo')
const Error = require('../core/error.response')
const { encryptString, compareEncryptedStrings, checkNullForObject, objectIdParser, getUnselectDataForQuery, getSelectDataForQuery } = require('../utils')
const { statusOfPost } = require('../utils/post.utils')
const PostRepository = require('../models/repository/post.repo')
//------------------------------MAIN-FUNCTION--------------------
class UserService {
    static async resetPassword(userId, { oldPassword, newPassword }) {
        const currentUser = await UserService.checkUser(userId)
        await checkOldPassword(oldPassword, currentUser.user_password)
        const encryptedNewPassword = await encryptString(newPassword, 10)
        await updateUserPassword(userId, encryptedNewPassword)
    }

    static async updateGeneralProfile(userId, payload) {
        await UserService.checkUser(userId)
        const filter = {
            _id: userId
        }
        const bodyUpdateObject = {
            $set: {
                ...payload
            }
        }
        const unSelectField = getUnselectDataForQuery(["role", "updatedAt", "createdAt", "__v", "user_password"])
        const option = {
            new: true
        }
        return await UserRepository.updateUser(filter, bodyUpdateObject, unSelectField, option)
    }

    static async checkUser(userId) {
        const currentUser = await UserRepository.findUserById(userId)
        if (!currentUser) throw new Error.BadRequestError("Not exits user")
        return currentUser
    }

    static async addPostToWishList(userId, { postId }) {
        const result = await Promise.all([this.checkUser(userId), checkActivePost(postId)])
        checkExistingPostIdInWishList(result[0].user_favorite_posts, postId)
        const { filter, bodyUpdate, option, selectField } = configQueryForAddWishList(userId, postId)
        return await UserRepository.updateUser(filter, bodyUpdate, selectField, option)
    }
    /**
     * 
     * @param {*} userId : id của user muốn thao tác với service
     * @param {*} postIds : những ids của bài posts muốn gỡ 
     */
    static async removePostFromWishList(userId, { postIds }) {
        await checkPostIdsBeforeRemove(userId, postIds)
        const filteredPostIds = postIds.map(id => objectIdParser(id))        
        return await removePostIdsFromWishList(userId, filteredPostIds)
    }
}
//--------------------------SUB-FUNCTION------------------------

async function removePostIdsFromWishList(userId, postIds) {
    const filter = {
        _id: objectIdParser(userId)
    }
    const bodyUpdate = {
        $pull: {
            user_favorite_posts: {
                $in: postIds
            }
        }
    }
    const option = {
        new: true
    }
    const unSelectField = getUnselectDataForQuery(["role", "createdAt", "updatedAt", "__v"])
    return await UserRepository.updateUser(filter, bodyUpdate, unSelectField, option)
}

async function checkPostIdsBeforeRemove(userId, postIdsForRemoving) {
    const currentUser = await UserService.checkUser(userId)
    const postIds = currentUser.user_favorite_posts.map(id => id.toString())
    const isAllExist = postIdsForRemoving.every(id => {
        let idCompare = id.toString()
        return postIds.includes(idCompare)
    });
    if (!isAllExist) throw new Error.BadRequestError("Post ids is not valid")
}

function checkExistingPostIdInWishList(wishList, postId) {
    const newPostId = objectIdParser(postId).toString(); // Chuyển đổi sang chuỗi
    const result = wishList.some(id => id.toString() === newPostId);
    if (result) throw new Error.BadRequestError("Post is already existed!")
}

function configQueryForAddWishList(userId, postId) {
    const filter = {
        _id: objectIdParser(userId)
    }
    const bodyUpdate = {
        $addToSet: {
            user_favorite_posts: objectIdParser(postId)
        }
    }
    const option = {
        new: true
    }
    const selectField = getSelectDataForQuery(["user_nickname", "user_email", "user_favorite_posts"])
    return { filter, bodyUpdate, option, selectField }
}

async function checkActivePost(postId) {
    const currentPost = await findActivePostById(postId)
    if (!currentPost) throw new Error.BadRequestError("Post is not valid")
    return currentPost
}
async function findActivePostById(postId) {
    const filter = {
        _id: objectIdParser(postId),
        status: statusOfPost.ACTIVE
    }
    return await PostRepository.findPost(filter)
}

async function updateUserPassword(userId, encryptedPassword) {
    const filter = {
        _id: objectIdParser(userId)
    }
    const bodyUpdate = {
        $set: {
            user_password: encryptedPassword
        }
    }
    const options = {
        new: true
    }
    return await UserRepository.updateUser(filter, bodyUpdate, {}, options)
}

async function checkOldPassword(plainPassword, encryptedPassword) {
    const result = await compareEncryptedStrings(plainPassword, encryptedPassword)
    if (!result) throw new Error.BadRequestError("Incorrect password")
}



module.exports = { UserService, checkActivePost }


