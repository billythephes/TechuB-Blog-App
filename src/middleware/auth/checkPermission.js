
const Error = require('../../core/error.response')
const { UserService } = require('../../services/user.service')

const autherizePermission = (permission) => {
    return async (req, res, next) => {
        const decodeUser = req.decodeUser // decodeUser lấy được từ xác minh JWT
        const currentUser = await UserService.checkUser(decodeUser.userid)
        if (!currentUser.role.includes(permission)) throw new Error.AuthError("You don't have permission to access!")
        next()
    }
}


module.exports = {
    autherizePermission
}
