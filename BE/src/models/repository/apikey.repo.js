const ApiKeyModel = require('../apikey.model')

class ApiKeyRepository {

    static async findApiKey(filter, select) {
        return await ApiKeyModel.findOne({ ...filter })
            .select({ ...select })
            .lean()
    }

    static async createNewApiKey(apikey, permission = ['0000'], status = true) {
        const newObject = {
            key: apikey,
            permisson: permission,
            status: status
        }
        return await ApiKeyModel.create({ ...newObject })
    }

    static async updateApiKey(filter, bodyUpdate, isNew = true) {
        return await ApiKeyModel.updateOne({ ...filter }, {
            $set: {
                ...bodyUpdate
            }
        }, {
            new: isNew
        })
    }


    static async addPermission(filter, permission) {
        return await ApiKeyModel.updateOne({ ...filter }, {
            $addToSet: {
                permissions: permission
            }
        }, {
            new: isNew
        })
    }

    static async removePermission(filter, permission) {
        return await ApiKeyModel.updateOne({ ...filter }, {
            $addToSet: {
                permissions: permission
            }
        }, {
            new: isNew
        })
    }

}

module.exports = ApiKeyRepository