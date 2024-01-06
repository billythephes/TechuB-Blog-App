const express = require('express')
const { autherizeAccessToken, autherizeRefreshToken } = require('../middleware/auth/checkAuthentication')
const { catchError } = require('../core/error.response')
const router = express.Router()

const initApiRoute = (app) => {
    router.use("/users", require('./user/index'))
    router.use('/access', require('./access/index'))
    router.use('/otps', require('./otp/index'))
    router.use('/follows', require('./follow/index'))
    router.use('/posts', require('./post/index'))
    router.use('/categories', require('./category/index'))
    router.use('/series', require('./series/index'))
    router.use('/likes', require('./like/index'))
    router.use('/comments', require('./comment/index'))
    return app.use("/api/v1", router)
}

module.exports = initApiRoute