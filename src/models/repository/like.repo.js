const { objectIdParser } = require('../../utils')
const likeModel = require('../like.model')

class LikeRepository {
    // like_user_id: {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'user'
    // },
    // like_post_id: {
    //     type: mongoose.Types.ObjectId,
    //     required: true,
    //     ref: 'post'
    // }
    static async findLike(filter, selectField = {}) {
        return await likeModel.findOne(filter, selectField).lean()
    }

    static async findLikeById(id, selectField = {}) {
        return await likeModel.findById(id, selectField).lean()
    }

    static async findLikes(filter, limit = {}, skip = {}, selectFields = {}, sortOption = {}) {
        return await likeModel.find(filter)
            .skip(skip)
            .limit(limit)
            .select(selectFields)
            .sort(sortOption)
            .lean()
    }

    static async deleteLikeByIdWithSession(likeId, session) {
        return await likeModel.findByIdAndDelete(likeId, { session: session })
    }

    static async likePostWithSession(postId, userId, session) {
        const object = {
            like_user_id: objectIdParser(userId),
            like_post_id: objectIdParser(postId)
        }
        const options = {
            session: session
        }
        return await likeModel.create([{ ...object }], options)
    }



}

module.exports = LikeRepository