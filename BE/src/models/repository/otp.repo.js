const otpModel = require('../otp.model')

class OTPRepository {

    static async findOTPByEmail(email) {
        return await otpModel.find({ email: email }).sort({ createdAt: -1 }).lean()
    }

    static async createNewOtp(email, otp) {
        return await otpModel.create({
            email: email,
            otp: otp
        })
    }



}

module.exports = OTPRepository