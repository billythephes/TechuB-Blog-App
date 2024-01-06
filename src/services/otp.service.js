const OTPRepository = require('../models/repository/otp.repo')
const Error = require('../core/error.response')
const otpGenerator = require('otp-generator')
const UserRepository = require("../models/repository/user.repo")
const { sendMail } = require('../utils/mailer')
const { encryptString } = require('../utils')
const fs = require('fs');
const path = require('path');
const userUtils = require('../utils/userUtils')
//------------------------------MAIN-FUNCTION--------------------
class OTPService {

    static async createNewOTP({ email }) {
        await Promise.all([userUtils.checkEmail(email), checkExistingEmail(email)])
        await checkOTPsCount(email)
        const OTP = getRandomOTP()
        const hashedOTP = await encryptString(OTP, 10)
        await OTPRepository.createNewOtp(email, hashedOTP)
        sendOTPtoEmail(email, OTP)
    }

    static async getOTPsByEmail(email) {
        return await OTPRepository.findOTPByEmail(email)
    }


}
//--------------------SUB FUNCTION-------------------------
function getHtmlContent (otp) {
    let htmlContent = fs.readFileSync(path.resolve(__dirname, '../view/email.layout.html'), 'utf8');
    htmlContent = htmlContent.replace('123456', otp);
    return htmlContent;
}

async function checkOTPsCount(email) {
    const OTPs = await OTPService.getOTPsByEmail(email)
    if (OTPs.length === 5) throw new Error.TooManyRequest("Please try again while later")
}
async function checkExistingEmail(email) {
    if (await findUserByEmail(email))
        throw new Error.BadRequestError("Input's not valid!")
}

function getRandomOTP() {
    return otpGenerator.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        specialChars: false,
        upperCaseAlphabets: false
    })
}

async function sendOTPtoEmail(email, code) {
    const htmlContent = getHtmlContent(code)
    const subject = "[NO-REPLY] Mã xác thực đăng ký cho TECHUB"
    return sendMail(email, subject, htmlContent)
}

async function findUserByEmail(email) {
    return await UserRepository.findUser({
        user_email: email
    })
}



module.exports = OTPService

