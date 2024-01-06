const { config } = require('dotenv')
const Error = require('../core/error.response')
const SeriesRepository = require('../models/repository/series.repo')
const Utils = require('../utils')
const PostRepository = require('../models/repository/post.repo')
const TransactionWrapper = require('../dbs/transaction.wrapper');
const PostUtils = require('../utils/post.utils')
const { UserService } = require('./user.service')


class SeriesService {

    static async createNewSeries(userId, filteredObject) {
        await checkValidPostIds(filteredObject.series_post_ids)
        await checkValidNameSeries(filteredObject.series_name)
        return await new TransactionWrapper(processCreateNewSeries).process({ userId, filteredObject })
    }

    static async deleteSeries(userId, seriesId) {
        const currentSeries = await checkExistingSeries(seriesId, userId)
        return await new TransactionWrapper(processDeleteSeries).process({ currentSeries })
    }

    static async findAllSeriesOfUser(ownerId, requestUserId, { limit = 20, offset = 0, sortBy = "ctime", keyword, startDate, endDate, status }) {
        let { skip, sortOption, unSelectField, filter } = configForQueryAllSeriesOfUser(ownerId, limit, offset, sortBy)
        if (isOwnerOfSeries(requestUserId, ownerId)) {
            configFilterForGetAllSeries(filter, sortOption, keyword, startDate, endDate, status)
        } else {
            configFilterForGetAllSeries(filter, sortOption, keyword, startDate, endDate, status = true)
        }
        return await SeriesRepository.findSeries(filter, limit, skip, unSelectField, sortOption)
    }

    static async addPostsIntoSeries(userId, { series_post_ids }, seriesId) {
        series_post_ids = series_post_ids.map(id => Utils.objectIdParser(id))
        const result1 = await Promise.all([checkExistingSeries(seriesId, userId), checkValidPostIds(series_post_ids)])
        const currentSeries = result1[0]
        checkPostIdsNotExistsInSeries(series_post_ids, currentSeries.series_post_ids)
        const filter = {
            _id: seriesId
        }
        const result2 = await Promise.all([SeriesRepository.addPostsIntoSeries(filter, series_post_ids), updateSeriesStatusForPost(series_post_ids, seriesId)])
        return result2[0]
    }

    static async findAllSeries({ limit = 20, offset = 0, sortBy = "ctime", keyword, startDate, endDate, authorId }) {
        const { skip, sortOption, unSelectField, filter } = configForQueryAllSeries(limit, offset, sortBy)
        configFilterForGetAllSeries(filter, sortOption, keyword, startDate, endDate, null, authorId)
        return await SeriesRepository.findSeries(filter, limit, skip, unSelectField, sortOption)
    }

    static async updateSeries(userId, seriesId, filteredObject) {
        await checkExistingSeries(seriesId, userId)
        return await SeriesRepository.updateSeriesById(seriesId, filteredObject, { new: true })
    }

    static async removePostFromSeries(userId, { series_post_ids }, seriesId) {
        if (!Array.isArray(series_post_ids)) {
            throw new Error.BadRequestError('postIds must be an array')
        }
        const listPostIdsForRemoving = series_post_ids.map(id => Utils.objectIdParser(id))
        const currentSeries = await checkExistingSeries(seriesId, userId)
        checkPostIdsExistsInSeries(listPostIdsForRemoving, currentSeries.series_post_ids)
        const filter = {
            _id: seriesId
        }
        const results = await Promise.all([SeriesRepository.removePostsFromSeries(filter, listPostIdsForRemoving), removeSeriesStatusFromPost(seriesId, listPostIdsForRemoving)])
        return results[0]
    }

}
//--------------SUB FUNCTION-----------------------

function isOwnerOfSeries(requestUserId, OwnerId) {
    return requestUserId === OwnerId
}

function checkPostIdsExistsInSeries(checkingPostIds, postIdsInSeries) {
    if (!isPostIdsExistedInSeries(checkingPostIds, postIdsInSeries))
        throw new Error.BadRequestError("Post Ids is not valid")
}

function checkPostIdsNotExistsInSeries(checkingPostIds, postIdsInSeries) {
    if (isPostIdsExistedInSeries(checkingPostIds, postIdsInSeries))
        throw new Error.BadRequestError("Post Ids is not valid")
}

function isPostIdsExistedInSeries(checkingPostIds, postIdsInSeries) {
    checkingPostIds = checkingPostIds.map(it => it.toString())
    postIdsInSeries = postIdsInSeries.map(it => it.toString())
    const result = checkingPostIds.every(id => postIdsInSeries.includes(id))
    return result
}

function configForQueryAllSeries(limit = 20, offset = 0, sortBy = "ctime") {
    const skip = limit * offset
    let sortOption = sortBy === 'ctime' ? { createdAt: -1 } : { createdAt: 1 }
    const unSelectField = Utils.getUnselectDataForQuery(["status", "__v", "series_status"])
    let filter = {
        series_status: true
    }
    return { skip, sortOption, unSelectField, filter }
}

function configForQueryAllSeriesOfUser(userId, limit = 20, offset = 0, sortBy = "ctime") {
    const skip = limit * offset
    let sortOption = sortBy === 'ctime' ? { createdAt: -1 } : { createdAt: 1 }
    const unSelectField = Utils.getUnselectDataForQuery(["__v"])
    let filter = {
        series_user_id: Utils.objectIdParser(userId)
    }
    return { skip, sortOption, unSelectField, filter }
}


async function checkExistingSeries(seriesId, userId) {
    const currentSeries = await findOneSeries(seriesId, userId)
    if (!currentSeries) throw new Error.NotFoundError("Series is not your own or dont existed!")
    return currentSeries
}

async function findOneSeries(seriesId, userId) {
    const filter = {
        _id: Utils.objectIdParser(seriesId),
        series_user_id: Utils.objectIdParser(userId)
    }
    return await SeriesRepository.findOneSeries(filter)
}


function configFilterForGetAllSeries(filter, sortOption, keyword, startDate, endDate, status, authorId) {
    if (startDate) {
        configForStartDate(filter, startDate)
    }
    if (endDate) {
        configForEndDate(filter, endDate)
    }
    if (status) {
        configForStatus(filter, status)
    }
    if (keyword) {
        configForKeyWord(filter, sortOption, keyword)
    }
    if (authorId) {
        configForAuthorId(filter, authorId)
    }
}

function configForAuthorId(filter, authorId) {
    filter.series_user_id = Utils.objectIdParser(authorId)
}

function configForStatus(filter, status) {
    filter.series_status = status
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

function configForEndDate(filter, endDate) {
    filter.createdAt = {
        ...filter.createdAt,
        $lte: endDate
    }
}

async function processDeleteSeries({ currentSeries }) {
    await Promise.all([SeriesRepository.deleteSeriesById(currentSeries._id), removeSeriesStatusFromPost(currentSeries._id, currentSeries.series_post_ids)])
}


async function processCreateNewSeries({ userId, filteredObject }) {
    const newSeriesObject = createNewSeriesObject(userId, filteredObject)
    const result = await SeriesRepository.createNewSeries(newSeriesObject)
    if (!result) throw new Error.NotFoundError("Something went wrong!")
    await updateSeriesStatusForPost(newSeriesObject.series_post_ids, result._id)
    return result
}



async function updateSeriesStatusForPost(seriesPostIds, seriesId) {
    const filter = {
        _id: {
            $in: seriesPostIds
        }
    }
    const updateBody = {
        $addToSet: {
            post_series_ids: seriesId
        }
    }
    const option = {
        new: true
    }

    return await PostRepository.updatePosts(filter, updateBody, option)
}

async function removeSeriesStatusFromPost(seriesId, seriesPostIds) {
    const filter = {
        _id: {
            $in: seriesPostIds
        }
    }
    const updateBody = {
        $pull: {
            post_series_ids: seriesId
        }
    }
    return await PostRepository.updatePosts(filter, updateBody)
}

async function checkValidPostIds(postIds) {
    const initialNumberOfPostIds = postIds.length
    const foundedPost = await findActivePostByIds(postIds)
    if (initialNumberOfPostIds !== foundedPost.length) throw new Error.BadRequestError("Post id you want to add is not valid!")
}

async function checkValidNameSeries(name) {
    const currentSerries = await findSeriesByName(name)
    if (currentSerries) {
        throw new Error.BadRequestError("Name is duplicated!")
    }
}

async function findSeriesByName(name) {
    let keyword = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').trim(); // escape special characters
    let regex = new RegExp(keyword, 'i');
    const filter = {
        series_name: regex
    }
    return await SeriesRepository.findOneSeries(filter)
}

async function checkValidPostIdsWithSeries(postIds, seriesId) {
    if (!Array.isArray(postIds)) {
        throw new Error.BadRequestError('postIds must be an array')
    }
    const initialNumberOfPostIds = postIds.length
    const foundedPost = await findPostWithSeriesByIds(postIds, seriesId)
    if (initialNumberOfPostIds !== foundedPost.length) throw new Error.BadRequestError("Post id you want to remove is not valid!")
}

/**
 * 
 * @param {*} postIds : "Những post ids mà chưa có tồn tại series"
 * @returns : "Trả về những post thỏa điều kiện chưa có series và đã được duyệt(trạng thái không phải pending hoặc blocked"
 */
async function findActivePostByIds(postIds) {
    const filter = {
        _id: {
            $in: postIds
        },
        status: PostUtils.statusOfPost.ACTIVE
    }
    return await PostRepository.findPosts(filter)
}

async function findPostWithSeriesByIds(postIds, seriesId) {
    const filter = {
        _id: {
            $in: postIds
        },
        post_series_ids: Utils.objectIdParser(seriesId),
        status: PostUtils.statusOfPost.ACTIVE
    }
    return await PostRepository.findPosts(filter)
}

function createNewSeriesObject(userId, filteredObject) {
    const object = {
        series_name: filteredObject.series_name.toLowerCase().trim(),
        series_post_ids: filteredObject.series_post_ids,
        series_user_id: Utils.objectIdParser(userId),
        series_status: filteredObject.series_status
    }
    return object
}


module.exports = SeriesService


