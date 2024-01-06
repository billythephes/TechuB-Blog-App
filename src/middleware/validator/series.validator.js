const { checkNullForObject } = require("../../utils")
const Error = require('../../core/error.response')
const Utils = require('../../utils/index')

const requiredFields = {
    CREATE: ["series_name", "series_post_ids", "series_status"],
    UPDATE: ["series_name", "series_status"]
}

const createSeriesValidator = (req, res, next) => {
    const filteredRequestObject = Utils.getRequiredFieldsFromReqBody(req.body, requiredFields.CREATE)
    checkNullForObject(filteredRequestObject)
    checkSeriesName(filteredRequestObject.series_name)
    checkSeriesPostIds(filteredRequestObject.series_post_ids)
    filteredRequestObject.series_post_ids = filteredRequestObject.series_post_ids.map(id => Utils.objectIdParser(id));
    req.body = filteredRequestObject
    next()
}



const updateSeriesValidator = (req, res, next) => {
    let filteredRequestObject = Utils.getRequiredFieldsFromReqBody(req.body, requiredFields.UPDATE)
    filteredRequestObject = Utils.nullObjectParser(filteredRequestObject)
    if (Utils.isEmptyObject(filteredRequestObject)) throw new Error.BadRequestError("Nothing for update")
    filteredRequestObject.series_name ? checkSeriesName(filteredRequestObject.series_name) : null;
    req.body = filteredRequestObject
    next()
}

function checkSeriesPostIds(seriesPostIds) {
    if (!isValideSeriesPostIds(seriesPostIds)) throw new Error.BadRequestError("Check ids again!")
}

function isValideSeriesPostIds(seriesPostIds) {
    if (!Array.isArray(seriesPostIds)) {
        return false
    }
    if (seriesPostIds.length === 0) return false
    seriesPostIds.forEach(element => {
        if (element.length !== 24) return false
    });
    return true
}

function checkSeriesName(name) {
    if (!isValidName(name)) throw new Error.BadRequestError("Series name is not valid!")
}

function isValidName(name) {
    return name.length >= 10
}



module.exports = {
    createSeriesValidator,
    updateSeriesValidator
}

