'use strict'
const Error = require('../core/error.response')
const CategoryRepository = require('../models/repository/category.repo')
const PostRepository = require('../models/repository/post.repo')
const { objectIdParser, getUnselectDataForQuery, checkNullForObject, configForSortQuery } = require('../utils')
const { UserService, checkActivePost } = require('./user.service')

const statusOfPost = {
    ACTIVE: 'active',
    PENDING: 'pending',
    BLOCKED: 'blocked'
}

//-------------------MAIN FUNCTION--------------------
class PostService {

    static async createNewPost(userId, payload) {
        const listOfCategories = await checkCategoryIds(payload.post_category_ids)
        const newPost = createPostObject(userId, payload.post_title, payload.post_content, payload.post_thumb_url, payload.post_description, listOfCategories)
        const result = await Promise.all([PostRepository.createNewPost(newPost), updateCountOfCategoryByIds(payload.post_category_ids, 1)])
        return result[0]
    }

    static async getPost(postId, requesterId) {
        const currentPost = await PostRepository.findPostById(postId)
        if (!currentPost) throw new Error.NotFoundError("Post not found!")
        if (isOwner(requesterId, currentPost.post_user_id.toString())) {
            return currentPost
        } else {
            return processUserGetPostNotOwner(currentPost)
        }
    }

    static async updateStatusOfPost(postId, { newStatus }) {
        newStatus = newStatus.trim()
        checkNullForObject({ newStatus })
        checkNotExistingStatus(newStatus)
        const currentPost = await checkExistingPost(postId)
        checkDuplicatedStatus(currentPost.status, newStatus)
        const filter = {
            _id: objectIdParser(postId)
        }
        return await PostRepository.updateStatusOfPost(filter, newStatus)
    }

    static async updateGeneralInformationOfPost(userId, postId, filteredPayload) {
        const currentPost = await checkExistingPost(postId)
        if (isOwner(userId, currentPost.post_user_id.toString())) {
            return await updatePostWithId(postId, filteredPayload)
        }
        throw new Error.AuthError("You aren't autherized for doing that")
    }


    static async getAllPost({ limit = 20, offset = 0, sortBy, keyword, startDate, endDate, categoryId, authorId }) {
        const skip = limit * offset
        const unSelectField = getUnselectDataForQuery(["post_content", "status", "__v", "post_series_ids"])
        const { filter, sortOption } = configQueryForgetAllPost(sortBy, keyword, startDate, endDate, categoryId, authorId)
        console.time('Execution Time');
        const result = await PostRepository.findPosts(filter, limit, skip, unSelectField, sortOption)
        console.timeEnd('Execution Time');
        return result
    }

    static async getAllPostOfUser(requestUserId, ownerId, { limit = 20, offset = 0, sortBy = "ctime", keyword, startDate, endDate, categoryId, status }) {
        const skip = limit * offset
        const unSelectField = getUnselectDataForQuery(["__v"])
        let filter, sortOption;
        if (isOwner(requestUserId, ownerId)) {
            ({ filter, sortOption } = configQueryForgetAllPostOfUser(ownerId, sortBy, keyword, startDate, endDate, categoryId, status))
        } else {
            ({ filter, sortOption } = configQueryForgetAllPostOfUser(ownerId, sortBy, keyword, startDate, endDate, categoryId, status = true))
        }
        return await PostRepository.findPosts(filter, limit, skip, unSelectField, sortOption)
    }
}
//-------------------SUB FUNCTION--------------------

function processUserGetPostNotOwner(post) {
    if (isActivePost(post)) {
        return post
    } else {
        throw new Error.AuthError("You can't get this post")
    }
}

function isActivePost(post) {
    return post.status === statusOfPost.ACTIVE
}

async function updatePostWithId(postId, payload) {
    const filter = {
        _id: objectIdParser(postId)
    }
    const bodyUpdate = {
        $set: {
            ...payload
        }
    }
    const option = {
        new: true
    }
    return await PostRepository.updatePost(filter, bodyUpdate, option)
}

async function updateCountOfCategoryByIds(categoryIds, count) {
    const filter = {
        _id: {
            $in: categoryIds.map(id => objectIdParser(id))
        }
    }
    const updateObject = {
        $inc: {
            category_post_count: count
        }
    }
    return await CategoryRepository.updateCategorys(filter, updateObject)
}

function isOwner(requesterId, ownerId) {
    return requesterId === ownerId
}

function configQueryForgetAllPost(sortBy, keyword, startDate, endDate, categoryId, authorId) {
    let sortOption = configForSortQuery(sortBy)
    let filter = {
        status: statusOfPost.ACTIVE
    }
    configFilterForGetAllPost(filter, sortOption, keyword, startDate, endDate, categoryId, authorId)
    return { filter, sortOption }
}

function configQueryForgetAllPostOfUser(userId, sortBy, keyword, startDate, endDate, categoryId, status) {
    let sortOption = sortBy === 'ctime' ? { createdAt: -1 } : { createdAt: 1 }
    let filter = {
        post_user_id: objectIdParser(userId)
    }
    configFilterForGetAllPost(filter, sortOption, keyword, startDate, endDate, categoryId, "", status)
    return { filter, sortOption }
}

function checkNotExistingStatus(newStatus) {
    const result = Object.values(statusOfPost).includes(newStatus)
    if (!result) throw new Error.BadRequestError("Status is not availible")
}
function checkDuplicatedStatus(oldStatus, newStatus) {
    const result = oldStatus === newStatus ? true : false
    if (result) throw new Error.BadRequestError("Status is already like that!")
}
async function checkExistingPost(postId) {
    const unSelectField = getUnselectDataForQuery(["status", "__v"])
    const currentPost = await PostRepository.findPostById(postId, unSelectField)
    if (!currentPost) throw new Error.BadRequestError("Post isn't existed")
    return currentPost
}


function configFilterForGetAllPost(filter, sortOption, keyword, startDate, endDate, categoryId, authorId, status) {
    if (startDate) {
        configForStartDate(filter, startDate)
    }
    if (status) {
        configForStatus(filter, status)
    }
    if (endDate) {
        configForEndDate(filter, endDate)
    }
    if (categoryId) {
        configForCategory(filter, categoryId)
    }
    if (authorId) {
        configForAuthor(filter, authorId)
    }
    if (keyword) {
        configForKeyWord(filter, sortOption, keyword)
    }
}

function configForStatus(filter, status) {
    filter.status = status
}

function configForStartDate(filter, startDate) {
    filter.createdAt = {
        $gte: startDate,
    }
}

function configForKeyWord(filter, sortOption, keyword) {
    filter.$text = {
        $search: keyword
    }
    sortOption.score = {
        $meta: "textScore"
    }
}

function configForAuthor(filter, authorId) {
    filter.post_user_id = objectIdParser(authorId)
}
function configForCategory(filter, categoryId) {
    filter["post_categories._id"] = objectIdParser(categoryId);
}

function configForEndDate(filter, endDate) {
    filter.createdAt = {
        ...filter.createdAt,
        $lte: endDate
    }
}


function createPostObject(userId, title, content, thumbUrl, description, listOfCategories) {
    const newPost = {
        post_user_id: objectIdParser(userId),
        post_title: title,
        post_content: content,
        post_thumb_url: thumbUrl,
        post_description: description,
        post_categories: listOfCategories,
    }
    return newPost
}


async function checkCategoryIds(categoryIds) {
    const initialNumberOfCategory = categoryIds.length
    const listOfCategories = await findCategoriesByIds(categoryIds)
    if (initialNumberOfCategory !== listOfCategories.length) throw new Error.BadRequestError("Check category info again!")
    return listOfCategories
}

async function findCategoriesByIds(listOfCategoryIds) {
    const filter = {
        _id: {
            $in: listOfCategoryIds
        }
    }
    const unSelectField = getUnselectDataForQuery(["__v", "status", "createdAt", "updatedAt"])
    return await CategoryRepository.findCategories(filter, unSelectField)
}

module.exports = { PostService, checkExistingPost, configForStartDate, configForEndDate }