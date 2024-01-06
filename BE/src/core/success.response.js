'use strict'

const { statusCode, reasonPhrases } = require('../utils/httpStatusCode')



class SuccesResponse {
    constructor({ message, status, reason, metaData = {} }) {
        this.message = !message ? reason : message
        this.statusCode = status
        this.metaData = metaData
    }

    send(res, header = {}) {
        return res.status(this.statusCode).json({
            error: false,
            ...this
        })
    }
}

class OkResponse extends SuccesResponse {
    constructor({ message, status = statusCode.OK, reason = reasonPhrases.OK, metaData = {} }) {
        super({ message, status, reason, metaData })
    }
}

class NoContentResponse extends SuccesResponse {
    constructor({ message, status = statusCode.NO_CONTENT, reason = reasonPhrases.NO_CONTENT, metaData = {} }) {
        super({ message, status, reason, metaData })
    }
}

class CreatedResponse extends SuccesResponse {
    constructor({ message, status = statusCode.CREATED, reason = reasonPhrases.CREATED, metaData = {} }) {
        super({ message, status, reason, metaData })
    }
}



class AccecptedResponse extends SuccesResponse {
    constructor({ message, status = statusCode.ACCEPTED, reason = reasonPhrases.ACCEPTED, metaData = {} }) {
        super({ message, status, reason, metaData })
    }
}



module.exports = {
    OkResponse,
    CreatedResponse,
    SuccesResponse,
    AccecptedResponse,
    NoContentResponse
}

