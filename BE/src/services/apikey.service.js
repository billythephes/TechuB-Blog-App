const Error = require('../core/error.response')
const ApiKeyRepository = require('../models/repository/apikey.repo')

class ApiKeyService {

    static async getActiveApiKey(apikey) {
        if (!apikey) throw new Error.BadRequestError('Unvalid Api Key')
        const filter = {
            "key": apikey,
            "status": true
        }
        return await ApiKeyRepository.findApiKey(filter)
    }


    static async createNewApiKey(permission) {
        const randomKey = await crypto.randomBytes(64).toString()
        return await ApiKeyRepository.createNewApiKey(randomKey, permission)
    }

    static async updateApiKeyStatus(key, status) {
        if (!key || !status) throw new Error.BadRequestError("Check request body!")
        const filter = {
            key: key
        }
        const updateStatusConfig = {
            status: status
        }
        return await ApiKeyRepository.updateApiKey(filter, updateStatusConfig, true)
    }

    static async addPermission(key, newPermission) {
        const currentApiKey = await this.getActiveApiKey(key)
        currentApiKey.permissions.add(newPermission)
        await currentApiKey.save()
    }

    static async removePermission(key, oldPermission) {
        const currentApiKey = await this.getActiveApiKey(key)
        currentApiKey.permissions = currentApiKey.permissions.filter(permission => {
            permission !== oldPermission
        })
        await currentApiKey.save()
    }

}


module.exports = ApiKeyService