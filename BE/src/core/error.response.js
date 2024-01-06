
const { statusCode, reasonPhrases } = require('../utils/httpStatusCode')
// const errorStatus = {
//     FORBIDDEN: 403,
//     NOT_FOUND: 404,
//     CONFLICT: 409
// }
// const errorMessage = {
//     FORBIDDEN: "Bad request error",
//     NOT_FOUND: "Internal error network",
//     CONFLICT: "Conflict error"
// }

class ErrorResponse extends Error {
    constructor(message, status) {
        super(message)
        this.status = status
    }
}

class ConflictRequestError extends ErrorResponse {
    constructor(message = reasonPhrases.CONFLICT, status = statusCode.CONFLICT) {
        super(message, status)
    }
}

class ServiceUnAvailible extends ErrorResponse {
    constructor(message = reasonPhrases.SERVICE_UNAVAILABLE, status = statusCode.SERVICE_UNAVAILABLE) {
        super(message, status)
    }
}

class NotFoundError extends ErrorResponse {
    constructor(message = reasonPhrases.NOT_FOUND, status = statusCode.NOT_FOUND) {
        super(message, status)
    }
}

class BadRequestError extends ErrorResponse {
    constructor(message = reasonPhrases.BAD_REQUEST, status = statusCode.BAD_REQUEST) {
        super(message, status)
    }
}

class AuthError extends ErrorResponse {
    constructor(message = reasonPhrases.UNAUTHORIZED, status = statusCode.UNAUTHORIZED) {
        super(message, status)
    }
}

class ForBiddenRequestError extends ErrorResponse {
    constructor(message = reasonPhrases.FORBIDDEN, status = statusCode.FORBIDDEN) {
        super(message, status)
    }
}

class TooManyRequest extends ErrorResponse {
    constructor(message = reasonPhrases.TOO_MANY_REQUESTS, status = statusCode.TOO_MANY_REQUESTS) {
        super(message, status)
    }
}

const catchError = (targetFunction) => {
    return (req, res, next) => {
        return Promise.resolve(targetFunction(req, res, next)).catch(next);
    };
};

module.exports = {
    TooManyRequest,
    ErrorResponse,
    ConflictRequestError,
    ForBiddenRequestError,
    NotFoundError,
    ServiceUnAvailible,
    AuthError,
    BadRequestError,
    catchError
}


