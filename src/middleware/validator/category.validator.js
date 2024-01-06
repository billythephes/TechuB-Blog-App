const { checkNullForObject } = require("../../utils")
const Error = require('../../core/error.response')
const Utils = require('../../utils/index')

const requiredFields = {
    CREATE: ["category_name", "category_description"],
    UPDATE: ["category_name", "category_description"]
}

const createCategoryValidator = (req, res, next) => {
    const filteredRequestObject = Utils.filterRequiredFields(req.body, requiredFields.CREATE)
    checkNullForObject(filteredRequestObject)
    if (filteredRequestObject.category_name.length < 3 || filteredRequestObject.category_description.length < 10) throw new Error.BadRequestError("Input is not valid")
    req.body = filteredRequestObject
    next()
}

const updateCategoryValidator = (req, res, next) => {
    let filteredRequestObject = Utils.filterRequiredFields(req.body, requiredFields.CREATE)
    filteredRequestObject = Utils.nullObjectParser(filteredRequestObject)
    if (Utils.isEmptyObject(filteredRequestObject)) throw new Error.BadRequestError("Input is not valid")
    if (filteredRequestObject.category_name?.length < 3 || filteredRequestObject.category_description?.length < 10) throw new Error.BadRequestError("Input is not valid")
    req.body = filteredRequestObject
    next()
}



module.exports = {
    createCategoryValidator,
    updateCategoryValidator
}

