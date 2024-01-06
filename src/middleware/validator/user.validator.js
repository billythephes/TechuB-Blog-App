const { checkNullForObject } = require("../../utils")
const Error = require('../../core/error.response')
const UserUtils = require('../../utils/userUtils')
const Utils = require('../../utils/index')
//------------------UPDATE GENERAL PROFILE---------------------
const requiredFields = {
    UPDATE: ["user_nickname", "user_profilePhotoURL", "user_website", "user_bio", "user_gender"],
    RESET_PASSWORD: ["oldPassword", "newPassword"],
    ADD_WIST_LIST: ["postId"],
    REMOVE_WIST_LIST: ["postIds"]
}

const updateProfileValidator = async (req, res, next) => {
    let filteredRequestObject = Utils.filterRequiredFields(req.body, requiredFields.UPDATE)
    filteredRequestObject = Utils.nullObjectParser(filteredRequestObject)
    if (Utils.isEmptyObject(filteredRequestObject)) throw new Error.BadRequestError("Nothing for update")
    filteredRequestObject.user_gender ? await UserUtils.checkGender(filteredRequestObject.user_gender) : null
    filteredRequestObject.user_nickname ? await UserUtils.checkNickName(filteredRequestObject.user_nickname) : null
    req.body = filteredRequestObject
    next()
}

const removeWishListValidator = async (req, res, next) => {
    const filteredRequestObject = Utils.filterRequiredFields(req.body, requiredFields.REMOVE_WIST_LIST)
    checkNullForObject(filteredRequestObject)
    if (!isValidPostIdForRemovePostToWishList(filteredRequestObject.postIds)) throw new Error.BadRequestError("Input must be array")
    req.body = filteredRequestObject
    next()
}

const addWishListValidator = async (req, res, next) => {
    const filteredRequestObject = Utils.filterRequiredFields(req.body, requiredFields.ADD_WIST_LIST)
    checkNullForObject(filteredRequestObject)
    if (!isValidPostIdForAddPostToWishList(filteredRequestObject.postId)) throw new Error.BadRequestError("Input must be string")
    req.body = filteredRequestObject
    next()
}

function isValidPostIdForAddPostToWishList(postId) {
    return typeof postId === 'string'
}

function isValidPostIdForRemovePostToWishList(postIds) {
    console.log("🚀 ~ file: user.validator.js:45 ~ isValidPostIdForRemovePostToWishList ~ postIds:", postIds)
    return Array.isArray(postIds) && postIds.length !== 0
}

const resetPasswordValidator = async (req, res, next) => {
    const filteredRequestObject = Utils.filterRequiredFields(req.body, requiredFields.RESET_PASSWORD)
    checkNullForObject(filteredRequestObject)
    await Promise.all([UserUtils.checkPassword(filteredRequestObject.oldPassword), UserUtils.checkPassword(filteredRequestObject.newPassword)])
    req.body = filteredRequestObject
    next()
}

module.exports = { updateProfileValidator, resetPasswordValidator, addWishListValidator, removeWishListValidator }