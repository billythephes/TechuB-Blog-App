const { isEmptyObject } = require('../../utils')
const postModel = require('../post.model')

class PostRepository {

    static async createNewPost(object) {
        return await postModel.create(object)
    }

    static async findPost(filter, selectField = {}) {
        return await postModel.findOne(filter).select(selectField).lean()
    }

    static async updatePosts(filter, body, option = {}) {
        return await postModel.updateMany(filter, { ...body }, { ...option })
    }

    static async updatePost(filter, bodyUpdate, options = {}) {
        return await postModel.findOneAndUpdate(filter, { ...bodyUpdate }, { ...options })
    }

    static async findPostById(postId, selectField = {}) {
        return await postModel.findOne({ _id: postId }).select(selectField).lean()
    }

    static async findPosts(filter, limit = {}, skip = {}, selectFields = {}, sortOption = {}) {
        const scoreOption = "$text" in filter ? { score: { '$meta': 'textScore' } } : {}
        return await postModel.find(filter, { ...scoreOption })
            .skip(skip)
            .limit(limit)
            .select(selectFields)
            .sort(sortOption)
            .lean()
    }

    static async updateStatusOfPost(filter, newStatus) {
        return await postModel.findOneAndUpdate(filter, {
            $set: {
                "status": newStatus
            }
        }, {
            new: true
        })
    }

}

module.exports = PostRepository