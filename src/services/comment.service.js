const Error = require('../core/error.response')
const CommentRepository = require('../models/repository/comment.repo');
const PostRepository = require('../models/repository/post.repo');
const Utils = require('../utils');
const { checkActivePost } = require('./user.service')
const TransactionWrapper = require('../dbs/transaction.wrapper');
const { configForStartDate, configForEndDate, checkExistingPost } = require('./post.service');

//----------------------MAIN SERVICE------------------------
class CommentService {

    static async commentPost(userId, filteredComment) {
        await checkActivePost(filteredComment.cmt_post_id)
        return await new TransactionWrapper(processCommentPost).process({ userId, filteredComment })
    }

    static async unCommentPost(userId, commentId) {
        const currentComment = await checkExistingCommentWithUserId(userId, commentId)
        return await new TransactionWrapper(processUnCommentPost).process({ currentComment })
    }

    static async getAllCommentHistoryByUserId(userId, { offset = 0, limit = 20, startDate, endDate, sortBy = 'ctime' }) {
        const skip = limit * offset
        const unSelectField = Utils.getUnselectDataForQuery(["__v"])
        const { filter, sortOption } = configForQueryAllComment(null, userId, startDate, endDate, sortBy)
        return await CommentRepository.getComments(filter, limit, skip, unSelectField, sortOption)
    }

    static async getAllCommentHistoryByPostId(requesterId, postId, { offset = 0, limit = 20, startDate, endDate, sortBy = 'ctime', status }) {
        Utils.checkNullForObject({ postId })
        const currentPost = await checkExistingPost(postId)
        if (isOwnerOfPosts(requesterId, currentPost.post_user_id.toString())) {
            return await queryAllCommentByPost(requesterId, currentPost, { offset, limit, startDate, endDate, sortBy, status })
        } else {
            return await queryAllCommentByPost(requesterId, currentPost, { offset, limit, startDate, endDate, sortBy, status: true })
        }
    }

}



//-----------------------SUB FUNCTION-----------------------

async function queryAllCommentByPost(requesterId, currentPost, paramsOfQuery) {
    const { offset, limit, startDate, endDate, sortBy, status } = paramsOfQuery
    const skip = limit * offset
    const unSelectField = Utils.getUnselectDataForQuery(["__v"])
    const { filter, sortOption } = configForQueryAllComment(currentPost._id, null, startDate, endDate, sortBy, status);
    return await CommentRepository.getComments(filter, limit, skip, unSelectField, sortOption)
}

function isOwnerOfPosts(requesterId, ownerId) {
    return requesterId === ownerId
}


function configForQueryAllComment(postId, userId, startDate, endDate, sortBy, statusOfPost) {
    const filter = configForFilterQueryAllComment(startDate, endDate, userId, postId, statusOfPost)
    const sortOption = sortBy === 'ctime' ? { createdAt: -1 } : { createdAt: 1 }
    return { filter, sortOption }
}

function configForStatus(filter, status) {
    filter.status = status
}

function configForFilterQueryAllComment(startDate, endDate, userId, postId, statusOfPost) {
    let filter = {}
    if (startDate) {
        configForStartDate(filter, startDate)
    }
    if (endDate) {
        configForEndDate(filter, endDate)
    }
    if (userId) {
        configForUserId(filter, userId)
    }
    if (postId) {
        configForPostId(filter, postId)
    }
    if (statusOfPost) {
        configForStatus(filter, statusOfPost)
    }
    return filter
}

function configForPostId(filter, postId) {
    filter.cmt_post_id = Utils.objectIdParser(postId)
}

function configForUserId(filter, userId) {
    filter.cmt_user_id = Utils.objectIdParser(userId)
}


async function findCommentWithUserId(userId, commentId) {
    const filter = {
        _id: Utils.objectIdParser(commentId),
        cmt_user_id: Utils.objectIdParser(userId)
    }
    const unSelectField = Utils.getUnselectDataForQuery(["__v"])
    return await CommentRepository.getComment(filter, unSelectField)
}

async function checkExistingCommentWithUserId(userId, commentId) {
    const currentComment = await findCommentWithUserId(userId, commentId)
    if (!currentComment) throw new Error.BadRequestError("Comment is not your own or not exist")
    return currentComment
}

async function processUnCommentPost({ currentComment }, session) {
    const filterForDelete = {
        _id: Utils.objectIdParser(currentComment._id)
    }
    await CommentRepository.deleteCommentWithSession(filterForDelete, session)
    await updatePostStatusForUnCommentSection(currentComment.cmt_post_id, session)
}

async function processCommentPost({ userId, filteredComment }, session) {
    const newComment = createCommentObjectForCreate(userId, filteredComment.cmt_post_id, filteredComment.cmt_content)
    const result = await CommentRepository.createNewCommentWithSession(newComment, session)
    await updatePostStatusForCommentSection(filteredComment.cmt_post_id, session)
    return result
}

async function updatePostStatusForUnCommentSection(postId, session) {
    const bodyUpdate = {
        $inc: {
            post_coments_count: -1
        }
    }
    const filter = {
        _id: Utils.objectIdParser(postId)
    }
    const option = {
        session: session,
        new: true
    }
    return await PostRepository.updatePost(filter, bodyUpdate, option)
}

async function updatePostStatusForCommentSection(postId, session) {
    const bodyUpdate = {
        $inc: {
            post_coments_count: 1
        }
    }
    const filter = {
        _id: Utils.objectIdParser(postId)
    }
    const option = {
        session: session,
        new: true
    }
    return await PostRepository.updatePost(filter, bodyUpdate, option)
}

function createCommentObjectForCreate(userId, postId, content) {
    return {
        cmt_post_id: Utils.objectIdParser(postId),
        cmt_user_id: Utils.objectIdParser(userId),
        cmt_content: content
    }
}


module.exports = { CommentService, isOwnerOfPosts }