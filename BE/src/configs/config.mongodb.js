require('dotenv').config()

const devConfig = {
    app: {
        port: process.env.port
    },
    db: {
        host: process.env.DB_DEV_HOST_NAME,
        port: process.env.DB_DEV_PORT,
        name: process.env.DB_DEV_NAME,
        user_name: process.env.DB_DEV_USERNAME,
        password: process.env.DB_DEV_PASSWORD,
        cluster_name: process.env.DB_DEV_CLUSTER_NAME
    }
}

module.exports = devConfig
