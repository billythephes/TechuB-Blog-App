const { CommentService } = require('../services/comment.service')
const SuccesResponse = require('../core/success.response')

class CommentController {

    commentPost = async (req, res, next) => {
        return new SuccesResponse.CreatedResponse({
            ...req.body,
            message: "Comment succesfully!",
            metaData: await CommentService.commentPost(req.decodeUser.userid, req.body)
        }).send(res)
    }

    unCommentPost = async (req, res, next) => {
        return new SuccesResponse.OkResponse({
            ...req.body,
            message: "UnComment succesfully!",
            metaData: await CommentService.unCommentPost(req.decodeUser.userid, req.params.id)
        }).send(res)
    }

    getAllCommentHistoryOfUser = async (req, res, next) => {
        return new SuccesResponse.OkResponse({
            ...req.body,
            message: "All comment history of user!",
            metaData: await CommentService.getAllCommentHistoryByUserId(req.decodeUser.userid, req.query)
        }).send(res)
    }

    getAllCommentHistoryOfOfPost = async (req, res, next) => {
        return new SuccesResponse.OkResponse({
            ...req.body,
            message: "All comment history of post!",
            metaData: await CommentService.getAllCommentHistoryByPostId(req.decodeUser.userid, req.params.id, req.query)
        }).send(res)
    }

}

const commentController = new CommentController()
module.exports = commentController
