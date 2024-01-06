const crypto = require('crypto')
const keyModel = require('../models/key.model')
const jwt = require('jsonwebtoken')
const { Types } = require('mongoose')
const KeyRepository = require('../models/repository/key.repo')
const Error = require('../core/error.response')

const ALGORITHM = 'RS256';
const ACCESS_TOKEN_EXPIRY = '2days';
const REFRESH_TOKEN_EXPIRY = '7days';

class KeyService {

    static genToken = async (user, typeOfGenToken) => {
        //---CONFIG JWT
        const {
            accessTokenOptions,
            refreshTokenOptions,
            payload
        } = configJWTForGenTokenSection(user)
        // ---GEN TOKEN
        const { privateKey, publicKey } = await this.genPubicAndPrivateKey()
        const [pairToken, insertKeyResult] = await Promise.all([
            this.createPairToken(payload, privateKey, accessTokenOptions, refreshTokenOptions),
            tokenAction[typeOfGenToken](publicKey, user._id)
        ]);
        if (!insertKeyResult) {
            throw new Error.ServiceUnAvailible("Something went wrong!")
        }
        // const { privateKey, publicKey } = await this.genPubicAndPrivateKey()
        // const pairToken = await this.createPairToken(payload, privateKey, accessTokenOptions, refreshTokenOptions)
        // const insertKeyResult = await tokenAction[typeOfGenToken](publicKey, user._id)
        // if (!insertKeyResult) {
        //     throw new Error.ServiceUnAvailible("Something went wrong!")
        // }
        return {
            accessToken: pairToken.accessToken,
            refreshToken: pairToken.refreshToken
        }
    }

    static async genNewKey(publicKey, userId) {
        const result = await KeyRepository.createNewKey(userId, publicKey.toString())
        return result
    }

    static async getRefreshKey(publicKey, userId) {

    }

    static genPubicAndPrivateKey = async () => {
        const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048, // Độ mạnh của thuật toán generateKey
            publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
            privateKeyEncoding: { type: 'pkcs1', format: 'pem' }
        })
        return { privateKey, publicKey }
    }

    static async createPairToken(payload, privateKey, optionAccessToken, optionRefreshToken) {
        const [accessToken, refreshToken] = await Promise.all([jwt.sign(payload, privateKey, optionAccessToken), jwt.sign(payload, privateKey, optionRefreshToken)])
        return {
            accessToken,
            refreshToken
        }
    }
}
//-----------------SUB FUNCTION--------------
function configJWTForGenTokenSection(user) {
    const accessTokenOptions = {
        algorithm: ALGORITHM,
        expiresIn: ACCESS_TOKEN_EXPIRY
    };
    const refreshTokenOptions = {
        algorithm: ALGORITHM,
        expiresIn: REFRESH_TOKEN_EXPIRY
    };
    const payload = {
        userid: user._id,
        email: user.email
    }
    return {
        accessTokenOptions,
        refreshTokenOptions,
        payload
    }
}
const tokenAction = {
    "NEW": KeyService.genNewKey,
    "REFRESH": KeyService.getRefreshKey
}

module.exports = KeyService

