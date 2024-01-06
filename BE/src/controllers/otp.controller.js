const OTPService = require('../services/otp.service')
const SuccesResponse = require('../core/success.response')

class OTPController {
    createNewOTP = async (req, res, next) => {
        return new SuccesResponse.OkResponse({
            ...req.body,
            message: "Check your email to get your OTP code!",
            metaData: await OTPService.createNewOTP(req.body)
        }).send(res)
    }
}
const otpController = new OTPController()
module.exports = otpController