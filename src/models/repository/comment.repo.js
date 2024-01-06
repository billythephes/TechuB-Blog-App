const commentModel = require('../comment.model')
const CommentModel = require('../comment.model')

class CommentRepository {

    static async createNewCommentWithSession(newCommentObject, session) {
        return await CommentModel.create([{ ...newCommentObject }], {
            session: session
        })
    }

    static async getComments(filter, limit = {}, skip = {}, selectFields = {}, sortOption = {}) {
        return await commentModel.find(filter)
            .skip(skip)
            .limit(limit)
            .select(selectFields)
            .sort(sortOption)
            .lean()
    }

    static async deleteCommentWithSession(filter, session) {
        const option = {
            session: session
        }
        return await CommentModel.findOneAndDelete(filter, { ...option })
    }

    static async getComment(filter, selectField = {}, options = {}) {
        return await CommentModel.findOne(filter, selectField, options)
    }

}

module.exports = CommentRepository