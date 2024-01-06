const { checkNullForObject } = require("../../utils")
const Error = require('../../core/error.response')
const Utils = require('../../utils/index')

const requiredFields = {
    CREATE: ["post_title", "post_content", "post_thumb_url", "post_description", "post_category_ids"],
    UPDATE: ["post_title", "post_content", "post_thumb_url", "post_description"]
}
//---------------------------VALIDATOR---------------------------
const createPostValidator = async (req, res, next) => {
    //Lấy các trường được required
    const filteredRequestObject = Utils.getRequiredFieldsFromReqBody(req.body, requiredFields.CREATE)
    checkNullForObject(filteredRequestObject)
    //Promise thực hiện đồng thời các tác vụ bất đồng bộ
    await Promise.all([checkTitleOfPost(filteredRequestObject.post_title),
    checkContentOfPost(filteredRequestObject.post_content),
    checkDescriptionOfPost(filteredRequestObject.post_description),
    checkCategoryIdsOfPost(filteredRequestObject.post_category_ids)])
    //Gán lại req.body sau khi đã filter
    req.body = filteredRequestObject
    next()
}


const updatePostValidator = async (req, res, next) => {
    //Lấy các trường được required
    const filteredRequestObject = Utils.getRequiredFieldsFromReqBody(req.body, requiredFields.UPDATE)
    Utils.nullObjectParser(filteredRequestObject)
    if (Utils.isEmptyObject(filteredRequestObject)) throw new Error.BadRequestError("Dont have anything for updating!")
    filteredRequestObject.post_title ? await checkTitleOfPost(filteredRequestObject.post_title) : null
    filteredRequestObject.post_content ? await checkContentOfPost(filteredRequestObject.post_content) : null
    filteredRequestObject.post_description ? await checkDescriptionOfPost(filteredRequestObject.post_description) : null
    filteredRequestObject.post_category_ids ? await checkCategoryIdsOfPost(filteredRequestObject.post_category_ids) : null
    req.body = filteredRequestObject
    next()
}
//----------------------------SUB FUNCTION---------------------------

async function checkTitleOfPost(title) {
    if (!isValidTitle(title)) throw new Error.BadRequestError("Title's not valid")
}
async function checkContentOfPost(content) {
    if (!isValidContent(content)) throw new Error.BadRequestError("Content's not valid")
}

async function checkDescriptionOfPost(description) {
    if (!isValidDescription(description)) throw new Error.BadRequestError("Description's not valid")
}

async function checkCategoryIdsOfPost(categoryIds) {
    if (!isValidCategoryIds(categoryIds)) throw new Error.BadRequestError("CategoryIds's not valid")
}

function isValidTitle(title) {
    return title.length >= 5
}

function isValidDescription(description) {
    return description.length >= 10
}

function isValidContent(content) {
    return content.length >= 500
}

function isValidCategoryIds(categoryIds) {
    return categoryIds.length !== 0
}

module.exports = {
    createPostValidator,
    updatePostValidator
}