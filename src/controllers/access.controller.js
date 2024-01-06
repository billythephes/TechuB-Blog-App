const AccessService = require('../services/access.service')
const SuccesResponse = require('../core/success.response')

class AccessController {
    signUp = async (req, res, next) => {
        return new SuccesResponse.CreatedResponse({
            ...req.body,
            message: "Sign Up succesfully",
            metaData: await AccessService.signUp(req.body)
        }).send(res)
    }

    login = async (req, res, next) => {
        return new SuccesResponse.OkResponse({
            ...req.body,
            message: "Login succesfully",
            metaData: await AccessService.login(req.body)
        }).send(res)
    }


}
const accessController = new AccessController()
module.exports = accessController