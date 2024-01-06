const CategoryService = require('../services/category.service')
const SuccesResponse = require('../core/success.response')



class CategoryController {
    createNewCategory = async (req, res, next) => {
        return new SuccesResponse.CreatedResponse({
            ...req.body,
            message: "Create category succesfully!",
            metaData: await CategoryService.createNewCategory({ ...req.body })
        }).send(res)
    }
    getAllCategoty = async (req, res, next) => {
        return new SuccesResponse.OkResponse({
            ...req.body,
            message: "Get all category succesfully!",
            metaData: await CategoryService.findAllCategory()
        }).send(res)
    }


    removeCategory = async (req, res, next) => {
        return new SuccesResponse.OkResponse({
            ...req.body,
            message: "Remove category succesfully!",
            metaData: await CategoryService.removeCategory(req.params.id)
        }).send(res)
    }

    updateCategory = async (req, res, next) => {
        return new SuccesResponse.OkResponse({
            ...req.body,
            message: "Update category succesfully!",
            metaData: await CategoryService.updateCategory(req.params.id, req.body)
        }).send(res)
    }

}

const categoryController = new CategoryController()
module.exports = categoryController
