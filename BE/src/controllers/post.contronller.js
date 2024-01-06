const { PostService } = require('../services/post.service')
const SuccesResponse = require('../core/success.response')

class PostController {
    createNewPost = async (req, res, next) => {
        return new SuccesResponse.CreatedResponse({
            ...req.body,
            message: "Create Post succesfully!",
            metaData: await PostService.createNewPost(req.decodeUser.userid, req.body)
        }).send(res)
    }

    getAllPost = async (req, res, next) => {
        return new SuccesResponse.OkResponse({
            ...req.body,
            message: "Get all post succesfully!",
            metaData: await PostService.getAllPost(req.query)
        }).send(res)
    }

    getAllPostOfUser = async (req, res, next) => {
        return new SuccesResponse.OkResponse({
            ...req.body,
            message: "Get all post of user succesfully!",
            metaData: await PostService.getAllPostOfUser(req.decodeUser.userid, req.params.id, req.query)
        }).send(res)
    }

    updateStatusOfPost = async (req, res, next) => {
        return new SuccesResponse.OkResponse({
            ...req.body,
            message: "Update status of post succesfully!",
            metaData: await PostService.updateStatusOfPost(req.params.id, req.body)
        }).send(res)
    }

    updateGeneralInformationOfPost = async (req, res, next) => {
        return new SuccesResponse.OkResponse({
            ...req.body,
            message: "Update general information of post succesfully!",
            metaData: await PostService.updateGeneralInformationOfPost(req.decodeUser.userid, req.params.id, req.body)
        }).send(res)
    }

    getPost = async (req, res, next) => {
        return new SuccesResponse.OkResponse({
            ...req.body,
            message: "Get post succesfully!",
            metaData: await PostService.getPost(req.params.id, req.decodeUser.userid)
        }).send(res)
    }



}
const postController = new PostController()
module.exports = postController