require('dotenv').config()
const devConfig = {
    username: process.env.GOOGLE_USERNAME,
    password: process.env.GOOGLE_PASSWORD,
    mail_host: process.env.MAIL_HOST,
    mail_port: process.env.MAIL_PORT,
}

module.exports = devConfig