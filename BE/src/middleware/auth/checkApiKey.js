
const ApiKeyService = require('../../services/apikey.service')
const { HEADER, getObjectFromReqHeader } = require('../../utils/index')
const Error = require('../../core/error.response')

const checkApiKey = async (req, res, next) => {
    const keyString = getObjectFromReqHeader(req, HEADER.apiKey)
    if (!key) throw new Error.AuthError('unvalid api key')
    const apiKeyInstance = ApiKeyService.getActiveApiKey(keyString)
    if (!apiKeyInstance) throw new Error.AuthError('unvalid api key')
    req.apiKey = apiKeyInstance
    next()
}

const checkPermission = async (permission) => {
    return (req, res, next) => {
        const currentApiKey = req.apiKey
        if (!currentApiKey.permission) throw new Error.AuthError('Denied permission')
        if (!isContainPermission(permission, currentApiKey)) throw new Error.AuthError('Denied permission')
        next()
    }
}

const isContainPermission = (permission, apiKey) => {
    return apiKey.permissions.includes(permission)
}

module.exports = {
    checkApiKey,
    checkPermission
}

