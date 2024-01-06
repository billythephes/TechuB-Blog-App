const { UserService } = require('../services/user.service')
const SuccesResponse = require('../core/success.response')

class UserController {
    resetPassword = async (req, res, next) => {
        return new SuccesResponse.OkResponse({
            ...req.body,
            message: "Reset password successfully!",
            metaData: await UserService.resetPassword(req.decodeUser.userid, req.body)
        }).send(res)
    }

    updateGeneralProfile = async (req, res, next) => {
        return new SuccesResponse.OkResponse({
            ...req.body,
            message: "Update profile successfully!",
            metaData: await UserService.updateGeneralProfile(req.decodeUser.userid, req.body)
        }).send(res)
    }

    getPostInWishList = async (req, res, next) => {
        return new SuccesResponse.OkResponse({
            ...req.body,
            message: "Posts in wishList successfully!",
            metaData: await UserService.updateGeneralProfile(req.decodeUser.userid, req.body)
        }).send(res)
    }

    addToWishList = async (req, res, next) => {
        return new SuccesResponse.OkResponse({
            ...req.body,
            message: "Add wish wish successfully!",
            metaData: await UserService.addPostToWishList(req.decodeUser.userid, req.body)
        }).send(res)
    }

    removeToWishList = async (req, res, next) => {
        return new SuccesResponse.OkResponse({
            ...req.body,
            message: "Remove post from wish list successfully!",
            metaData: await UserService.removePostFromWishList(req.decodeUser.userid, req.body)
        }).send(res)
    }

}
const userController = new UserController()
module.exports = userController