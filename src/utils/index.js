const { default: mongoose } = require("mongoose")
const bcryptjs = require('bcryptjs')
const Error = require('../core/error.response')

const HEADER = {
    autherization: "authorization",
    refreshToken: 'x-rtoken-id',
    apiKey: 'x-api-key'
}

const objectIdParser = (id) => {
    return new mongoose.Types.ObjectId(id)
}

function getRequiredFieldsFromReqBody(reqBody, requiredFields) {
    const filteredRequestObject = filterRequiredFields(reqBody, requiredFields)
    return filteredRequestObject
}

const checkNullForObject = (object) => {
    const result = Object.values(object).every(value => value !== null && value !== undefined) === false ? true : false;
    if (result) {
        throw new Error.BadRequestError("Some field are required!")
    }
}


async function encryptString(keyword, salt) {
    return await bcryptjs.hash(keyword, salt)
}


async function compareEncryptedStrings(plainString, encryptedString) {
    return await bcryptjs.compare(plainString, encryptedString);
}

function getObjectFromReqHeader(req, keyword) {
    return req.headers[keyword]
}

const getSelectDataForQuery = (select) => {
    return Object.fromEntries(select.map(it => [it, 1]))
}


const nullObjectParser = (obj) => {
    for (let key in obj) {
        if (obj[key] === null) {
            delete obj[key];
        }
    }
    return obj;
};

const getUnselectDataForQuery = (select) => {
    return Object.fromEntries(select.map(it => [it, 0]))
}


const isEmptyObject = (object) => {
    return Object.keys(object).length === 0
}


const filterRequiredFields = (obj, fields) => {
    const result = {};
    fields.forEach(field => {
        result[field] = obj.hasOwnProperty(field) ? obj[field] : null;
    });
    return result;
}

const configForSortQuery= (sortBy)  =>  {
    if (sortBy === 'atime') return {createdAt: 1}
    else if (sortBy === 'ctime') return {createdAt: -1}
    return {}
}
const wrapperFunctionWithTransaction =
    module.exports = {
        HEADER,
        checkNullForObject,
        objectIdParser,
        isEmptyObject,
        getObjectFromReqHeader,
        encryptString,
        compareEncryptedStrings,
        getSelectDataForQuery,
        getUnselectDataForQuery,
        nullObjectParser,
        filterRequiredFields,
        getRequiredFieldsFromReqBody,
        configForSortQuery
    }