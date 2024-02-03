const http = require('http')
const api = require('./bin/api/server')
const {initMySQLPool} = require("./bin/infra/database/mysql/mysql");
const port = process.env.PORT

const server = http.createServer(api)

const mysqlConfig = {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    connectionLimit: process.env.MYSQL_CONNECTION_LIMIT
}
// initMySQLPool(mysqlConfig)

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})