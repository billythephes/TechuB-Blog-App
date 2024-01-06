const express = require('express')
const router = express.Router()
const { catchError } = require('../../core/error.response')
const otpController = require('../../controllers/otp.controller')

router.post('/', catchError(otpController.createNewOTP))

module.exports = router