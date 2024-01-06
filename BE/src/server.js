const app = require('./app')
const https = require('https');
const fs = require('fs');
//------Https
const options = {
    key: fs.readFileSync('C:\\WINDOWS\\system32\\localhost-key.pem'),
    cert: fs.readFileSync('C:\\WINDOWS\\system32\\localhost.pem')
};

const server = https.createServer(options, app).listen(6890, () => {
    console.log("Welcome to BlogD ", 6890)
})

//------http
// const server = app.listen(6890, () => {
//     console.log("Welcome to BlogD ", 6890)
// })

process.on('SIGINT', () => {
    server.close(() => { console.log("Close server", 6890) })
})

module.exports = server