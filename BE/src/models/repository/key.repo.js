
const keyModel = require('../key.model');
const { objectIdParser } = require('../../utils');

class KeyRepository {

    static createNewKey = async (currentUserId, publicKey) => {
        return await keyModel.findOneAndUpdate({ user_id: objectIdParser(currentUserId) }, {
            user_id: objectIdParser(currentUserId),
            public_key: publicKey
        }, {
            upsert: true,
            new: true
        })
    }

    static deleteKey = async (filter) => {
        return await keyModel.deleteOne({ ...filter })
    }

    static findKey = async (filter, select) => {
        return await keyModel.findOne({ ...filter })
            .select({ ...select })
            .lean()
    }

}

module.exports = KeyRepository