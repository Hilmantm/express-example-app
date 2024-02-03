const mysql = require('mysql2/promise')

const connectionState = {
    pool: null
}

const initMySQLPool = async (config) => {
    try {
        const pool = mysql.createPool(config)
        const connection = await pool.getConnection();

        connection.release()
        connectionState.pool = pool
    } catch (e) {
        console.log(e)
        throw Error("mysql error to connect")
    }
}

const getConnectionState = () => {
    return connectionState
}

const releaseConnection = (conn) => {
    connectionState.pool.releaseConnection(conn)
}

module.exports = {
    initMySQLPool,
    getConnectionState,
    releaseConnection
}