
const LikeRepository = require('../models/repository/like.repo')
const Error = require('../core/error.response')
const { checkActivePost } = require('./user.service')
const { objectIdParser, checkNullForObject, getUnselectDataForQuery } = require('../utils')
const PostRepository = require('../models/repository/post.repo')
const TransactionWrapper = require('../dbs/transaction.wrapper')
const { configForStartDate, configForEndDate, checkExistingPost } = require('./post.service')
const { sortBy } = require('lodash')
//-------------MAIN SERVICE-----------------
class LikeService {

    static async likePost(userId, postId) {
        checkNullForObject({ postId })
        return await new TransactionWrapper(processLikePost).process({ userId, postId })
    }

    static async unLikePost(userId, likeId) {
        checkNullForObject({ likeId })
        const currentLike = await checkUnExistingLikeById(likeId)
        if (currentLike.like_user_id.toString() !== userId) throw new Error.AuthError("You don't have permission for doing that")
        await new TransactionWrapper(processUnlikePost).process({ currentLike })
    }

    static async findAllLikeHistoryOfUser(userId, { startDate, endDate, limit = 20, offset = 0, sortBy = 'ctime' }) {
        const skip = limit * offset
        const unSelectField = getUnselectDataForQuery(["__v"])
        const { filter, sortOption } = configQueryForLikeOfUser(userId, sortBy, startDate, endDate)
        return await LikeRepository.findLikes(filter, limit, skip, unSelectField, sortOption)
    }

    static async findAllLikeHistoryOfPost(postId, { startDate, endDate, limit = 20, offset = 0, sortBy = 'ctime' }) {
        await checkExistingPost(postId)
        const skip = limit * offset
        const unSelectField = getUnselectDataForQuery(["__v"])
        const { filter, sortOption } = configQueryForLikeOfPost(postId, sortBy, startDate, endDate)
        return await LikeRepository.findLikes(filter, limit, skip, unSelectField, sortOption)
    }


}
//-------------SUB SERVICE-----------------

function isOwnerOfLike(requesterId, ownerId) {
    return requesterId === ownerId
}

function configQueryForLikeOfUser(userId, sortBy, startDate, endDate) {
    let filter = {
        like_user_id: objectIdParser(userId)
    }
    const sortOption = sortBy === 'ctime' ? { createdAt: -1 } : { createdAt: 1 }
    configFilterForGetAllLike(filter, startDate, endDate)
    return { filter, sortOption }
}

function configQueryForLikeOfPost(postId, sortBy, startDate, endDate) {
    let filter = {
        like_post_id: objectIdParser(postId)
    }
    const sortOption = sortBy === 'ctime' ? { createdAt: -1 } : { createdAt: 1 }
    configFilterForGetAllLike(filter, startDate, endDate)
    return { filter, sortOption }
}

function configFilterForGetAllLike(filter, startDate, endDate) {
    if (startDate) {
        configForStartDate(filter, startDate)
    }
    if (endDate) {
        configForEndDate(filter, endDate)
    }
}


async function processLikePost({ userId, postId }, session) {
    await checkExistingLike(userId, postId)
    await checkActivePost(postId)
    await LikeRepository.likePostWithSession(postId, userId, session)
    return await updateLikeForPost(userId, postId, session)
}

async function processUnlikePost({ currentLike }, session) {
    await LikeRepository.deleteLikeByIdWithSession(currentLike._id, session)
    return await updateUnlikeForPost(currentLike.like_post_id, session)
}

async function checkUnExistingLikeById(likeId) {
    const currentLike = await LikeRepository.findLikeById(likeId)
    if (!currentLike) throw new Error.NotFoundError("You didn't like this post before!")
    return currentLike
}

async function updateLikeForPost(userId, postId, session) {
    const { filter, bodyUpdate, options } = configForUpdateLikeForPost(userId, postId, session)
    return await PostRepository.updatePost(filter, bodyUpdate, options)
}

async function updateUnlikeForPost(postId, session) {
    const { filter, bodyUpdate, options } = configForUpdateUnLikeForPost(postId, session)
    return await PostRepository.updatePost(filter, bodyUpdate, options)
}

function configForUpdateUnLikeForPost(postId, session) {
    const filter = {
        _id: postId
    }
    const bodyUpdate = {
        $inc: {
            post_likes_count: -1
        }
    }
    const options = {
        new: true,
        session: session
    }
    return { filter, bodyUpdate, options }
}

function configForUpdateLikeForPost(userId, postId, session) {
    const filter = {
        _id: objectIdParser(postId)
    }
    const bodyUpdate = {
        $inc: {
            post_likes_count: 1
        }
    }
    const options = {
        new: true,
        session: session
    }
    return { filter, bodyUpdate, options }
}

async function checkExistingLike(userId, postId) {
    const currentLike = await findLikeWithUserIdAndPostId(userId, postId)
    if (currentLike) throw new Error.BadRequestError("You have liked before already")
}

async function findLikeWithUserIdAndPostId(userId, postId) {
    const filter = {
        like_user_id: userId,
        like_post_id: postId
    }
    return await LikeRepository.findLike(filter)
}

module.exports = LikeService