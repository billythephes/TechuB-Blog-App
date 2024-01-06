const { checkNullForObject } = require("../../utils")
const Error = require('../../core/error.response')
const Utils = require('../../utils/index')

const requiredFields = {
    CREATE: ["cmt_post_id", "cmt_content"]
}

const commentPostValidator = async (req, res, next) => {
    let filteredRequestObject = Utils.filterRequiredFields(req.body, requiredFields.CREATE)
    checkNullForObject(filteredRequestObject)
    if (!isValidContentOfComment(filteredRequestObject.cmt_content)) throw new Error.BadRequestError("Comment's content must be greater than 5 character!")
    next()
}

function isValidContentOfComment(content) {
    return content.length >= 5
}

module.exports = {
    commentPostValidator
}
