'use strict'

const UserRepository = require("../models/repository/user.repo")
const Error = require('../core/error.response')
const bcryptjs = require('bcryptjs')
const KeyService = require("./key.service")
const { encryptString } = require("../utils")
const OTPService = require("./otp.service")
//-------------------------MAIN FUNCTION-----------------------
class AccessService {

    static signUp = async (body) => {
        await Promise.all([checkExistingEmailUser(body.user_email)      /*, checkExistingOTP(body.otp, body.user_email)*/])
        body.user_password = await encryptString(body.user_password, 10)
        const user = await UserRepository.createNewUser(body)
        return await KeyService.genToken(user, "NEW")
    }

    static login = async ({ email, password }) => {
        const user = await checkEmailAndPassword(email, password)
        const { accessToken, refreshToken } = await KeyService.genToken(user, "NEW")
        return { accessToken, refreshToken }
    }
}

//--------------------------SUB FUNCTION-----------------------

async function checkExistingOTP(currentOTP, email) {
    const OTPs = await getOTPsByEmail(email)
    if (!isExistedOTP(OTPs)) throw new Error.AuthError("Your OTP code has expired or not correct!")
    const newestOTP = getNewestOTPCode(OTPs)
    if (!await bcryptjs.compare(currentOTP, newestOTP)) throw new Error.AuthError("Your OTP code has expired or not correct!")
}

function isExistedOTP(OTPs) {
    return OTPs.length === 0 ? false : true
}

function getNewestOTPCode(OTPs) {
    return OTPs[0].otp.toString()
}

async function getOTPsByEmail(email) {
    return await OTPService.getOTPsByEmail(email)
}

async function checkExistingEmailUser(email) {
    const currentEmail = await UserRepository.findUserByEmail(email)
    if (currentEmail) {
        throw new Error.ConflictRequestError("Email has existed!")
    }
}

async function checkEmailAndPassword(email, password) {
    const currentUser = await UserRepository.findUserByEmail(email)
    if (!currentUser) throw new Error.BadRequestError("Invalid email or password")
    if (!await isCorrectPassword(password, currentUser.user_password)) throw new Error.BadRequestError("Invalid email or password")
    return currentUser
}



async function isCorrectPassword(password, hashedPassword) {
    return await bcryptjs.compare(password, hashedPassword)
}



module.exports = AccessService;