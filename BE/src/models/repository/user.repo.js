
const userModel = require('../user.model')

class UserRepository {

    static async findUsers(filter, limit, skip, select = {}, sortOption = {}) {

    }

    static async updateUser(filter, bodyUpdate, select = {}, option = {}) {
        console.log("option", option)
        return await userModel.findOneAndUpdate({ ...filter }, {
            ...bodyUpdate
        }, {
            ...option
        }).select({ ...select })
    }

    static async updateFollowerCountOfUser(userId, count, options = {}) {
        const filter = {
            _id: userId
        }
        return await userModel.findOneAndUpdate({ ...filter }, {
            $inc: {
                user_follower_count: count
            }
        }, {
            ...options
        })
    }

    static async updateFollowingCountOfUser(userId, count, options = {}) {
        const filter = {
            _id: userId
        }
        return await userModel.findOneAndUpdate({ ...filter }, {
            $inc: {
                user_following_count: count
            }
        }, {
            ...options
        })
    }



    static async findUser(filter, select = {}) {
        return await userModel.findOne({ ...filter }).select({ ...select }).lean()
    }

    static async findUserByEmail(email) {
        return await userModel.findOne({
            user_email: email
        }).lean()
    }

    static async findUserById(userId) {
        return await userModel.findOne({ _id: userId }).lean()
    }

    static async createNewUser({ user_nickname, user_email, user_password, user_profilePhotoURL, user_website, user_bio, user_gender }) {
        return await userModel.create({
            user_nickname, user_email, user_password, user_profilePhotoURL, user_website, user_bio, user_gender
        })
    }

}

module.exports = UserRepository