const FollowService = require('../services/follow.service')
const SuccesResponse = require('../core/success.response')

class FollowController {
    followUser = async (req, res, next) => {
        return new SuccesResponse.CreatedResponse({
            ...req.body,
            message: "Follow succesfully",
            metaData: await FollowService.followUser(req.decodeUser.userid, req.body.followingUserId)
        }).send(res)
    }

    unFollowUser = async (req, res, next) => {
        return new SuccesResponse.CreatedResponse({
            ...req.body,
            message: "Unfollow succesfully",
            metaData: await FollowService.unFollowUser(req.decodeUser.userid, req.params.id)
        }).send(res)
    }

    getAllFollower = async (req, res, next) => {
        return new SuccesResponse.OkResponse({
            ...req.body,
            message: "Get list followers succesfully",
            metaData: await FollowService.getAllFollower(req.params.id,req.decodeUser.userid, { ...req.query })
        }).send(res)
    }

    getAllFollowing = async (req, res, next) => {
        return new SuccesResponse.OkResponse({
            ...req.body,
            message: "Get list following succesfully",
            metaData: await FollowService.getAllFollowing(req.params.id,req.decodeUser.userid, { ...req.query })
        }).send(res)
    }

    changeStatus = async (req, res, next) => {
        return new SuccesResponse.OkResponse({
            ...req.body,
            message: "Change status succesfully!",
            metaData: await FollowService.changeStatusFollow(req.decodeUser.userid, req.params.id, { ...req.body })
        }).send(res)
    }
}
const followController = new FollowController()
module.exports = followController