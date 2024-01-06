
const emailRegrex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
const validGenders = {
    male: true,
    female: true,
    unknown: true
};
const Error = require('../core/error.response')

async function checkGender(gender) {
    const result = validGenders[gender];
    if (!result) throw new Error.BadRequestError("Gender's not valid")
}
async function checkPassword(password) {
    const result = password.length >= 8
    if (!result) throw new Error.BadRequestError("Password's not valid")
}

async function checkNickName(nickname) {
    const result = (nickname.length >= 3 && nickname.length <= 20)
    if (!result) throw new Error.BadRequestError("Nickname's not valid")
}

async function checkEmail(email) {
    const result = emailRegrex.test(email)
    if (!result) throw new Error.BadRequestError("Email's not valid")

}


module.exports = {
    checkGender,
    checkPassword,
    checkNickName,
    checkEmail
}