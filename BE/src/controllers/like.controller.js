const LikeService = require('../services/like.service')
const SuccesResponse = require('../core/success.response')

class LikeController {

    likePost = async (req, res, next) => {
        return new SuccesResponse.CreatedResponse({
            ...req.body,
            message: "Like post succesfully!",
            metaData: await LikeService.likePost(req.decodeUser.userid, req.body.postId)
        }).send(res)
    }

    unLikePost = async (req, res, next) => {
        return new SuccesResponse.CreatedResponse({
            ...req.body,
            message: "Unlike post succesfully!",
            metaData: await LikeService.unLikePost(req.decodeUser.userid, req.params.id)
        }).send(res)
    }

    findAllLikeOfUser = async (req, res, next) => {
        return new SuccesResponse.OkResponse({
            ...req.body,
            message: "Get like history of user succesfully!",
            metaData: await LikeService.findAllLikeHistoryOfUser(req.decodeUser.userid, req.query)
        }).send(res)
    }

    findAllLikeOfPost = async (req, res, next) => {
        return new SuccesResponse.OkResponse({
            ...req.body,
            message: "Get like history of post succesfully!",
            metaData: await LikeService.findAllLikeHistoryOfPost(req.params.id, req.query)
        }).send(res)
    }

}

const likeController = new LikeController()
module.exports = likeController
