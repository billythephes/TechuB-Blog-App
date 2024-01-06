'use strict'

const { checkNullForObject } = require("../../utils")
const Error = require('../../core/error.response')
const UserUtils = require('../../utils/userUtils')
const Utils = require('../../utils/index')

const requiredFields = {
    SIGN_UP: ["user_nickname", "user_email", "user_password", "user_profilePhotoURL",
        "user_website", "user_bio", "user_gender","otp"],
    LOGIN: ["email", "password"]
}


//---------------------SIGN UP---------------------------------
const signUpValidator = async (req, res, next) => {
    const filteredRequestObject = Utils.filterRequiredFields(req.body, requiredFields.SIGN_UP)
    const { user_nickname, user_email, user_password, user_gender, otp } = filteredRequestObject
    checkNullForObject({ user_nickname, user_email, user_password, user_gender, otp })
    await Promise.all([UserUtils.checkEmail(user_email), UserUtils.checkGender(user_gender), UserUtils.checkNickName(user_nickname), UserUtils.checkPassword(user_password)])
    req.body=filteredRequestObject
    next()
}

//-----------------LOGIN--------------------------------------
const loginValidator = async (req, res, next) => {
    const filteredRequestObject = Utils.filterRequiredFields(req.body, requiredFields.LOGIN)
    if (checkNullForObject(filteredRequestObject)) throw new Error.BadRequestError("Please check login information again!")
    next()
}


module.exports = {
    signUpValidator,
    loginValidator
}


