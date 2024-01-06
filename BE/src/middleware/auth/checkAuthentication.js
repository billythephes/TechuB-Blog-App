'use strict'

const { HEADER, objectIdParser } = require('../../utils/index')
const Error = require('../../core/error.response')
const KeyRepository = require('../../models/repository/key.repo')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

//-------------------------------MAIN FUCNTION---------------------------------------------
const autherizeAccessToken = async (req, res, next) => {
    const accessToken = getAccessTokenFromReq(req)
    const userId = getUserIdFromToken(accessToken)
    await checkUserLogin(req, userId) // Check if user login or not
    await checkJWT(req, accessToken, req.keyStore.public_key) // check JWT
    next()
}


const autherizeRefreshToken = async (req, res, next) => {
    const refreshToken = getRefreshTokenFromReq(req)
    const userId = getUserIdFromToken(refreshToken)
    await checkUserLogin(req, userId) // Check if user login or not
    await Promise.all([checkLegalRefreshToken(userId, refreshToken, req.keyStore.used_refresh_tokens), checkJWT(req, refreshToken, req.keyStore.public_key)]);
    next();
}


//-------------------------------SUB FUNCTION---------------------------------------------

function getAccessTokenFromReq(req) {
    const jwt = getObjectFromReqHeader(req, HEADER.autherization)
    if (!jwt) throw new Error.AuthError('Unvalid token')
    const accessToken = getAccessTokenFromJWT(jwt)
    if (!accessToken) throw new Error.AuthError('Unvalid token')
    return accessToken
}

function getRefreshTokenFromReq(req) {
    const refreshToken = getObjectFromReqHeader(req, HEADER.refreshToken)
    if (!refreshToken) throw new Error.AuthError('Unvalid token')
    return refreshToken
}

function getUserIdFromToken(token) {
    const decodeUser = jwt.decode(token)
    if (!decodeUser || !decodeUser.userid) throw new Error.AuthError('Unvalid token')
    return decodeUser.userid
}

async function checkUserLogin(req, userId) {
    const keyStore = await isUserLogin(userId)
    req.keyStore = keyStore
    return keyStore
}

async function checkLegalRefreshToken(userId, refreshToken, usedRefreshTokens) {
    if (!isLegalRefreshToken(refreshToken, usedRefreshTokens)) {
        await hanldeWithIllegalToken(userId)
    }
}

async function hanldeWithIllegalToken(userId) {
    await deleteKeyStore(userId)
    throw new Error.AuthError("Invalid RefreshToken! Please Login Again")
}

async function deleteKeyStore(userId) {
    const filter = {
        user_id: userId
    }
    return await KeyRepository.deleteKey(filter)
}

function isLegalRefreshToken(refreshToken, usedRefreshTokens) {
    const result = usedRefreshTokens.includes(refreshToken)
    return result === true ? false : true
}

function getObjectFromReqHeader(req, keyword) {
    return req.headers[keyword]
}

function getAccessTokenFromJWT(JWT) {
    return JWT.split(' ')[1]
}

async function checkJWT(req, token, key) {
    const keyObject = await createPublicKeyObject(key)
    const decodeObject = await jwt.verify(token, keyObject)
    req.decodeUser = decodeObject
    return decodeObject
}

async function createPublicKeyObject(publicKeyString) {
    return await crypto.createPublicKey(publicKeyString)
}

async function isUserLogin(userId) {
    const keyStore = await KeyRepository.findKey({ "user_id": objectIdParser(userId) })
    if (!keyStore) throw new Error.AuthError("User isn't login")
    return keyStore
}
//----------------------------------------------------------------------------

module.exports = {
    autherizeAccessToken,
    autherizeRefreshToken
}

