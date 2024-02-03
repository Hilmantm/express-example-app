const connection = require('../../../../../infra/database/mysql/mysql')
const {databaseResult} = require("../../../../../utils/response");

const getAllComplaints = async () => {
    const query = "SELECT * FROM complaints"
    try {
        const currentPool = connection.getConnectionState().pool
        const [rows, _] = await currentPool.query(query)
        connection.releaseConnection(currentPool)
        return databaseResult(rows, null)
    } catch (e) {
        console.log("error", e.message)
        return databaseResult(null, new Error("query error to database"))
    }
}

const getComplaintById = async (id) => {
    const query = "SELECT * FROM complaints WHERE id=?"
    try {
        const currentPool = connection.getConnectionState().pool
        const [rows, _] = await currentPool.execute(query, [id])
        connection.releaseConnection(currentPool)
        return databaseResult(rows, null)
    } catch (e) {
        console.log("error", e.message)
        return databaseResult(null, new Error("query error to database"))
    }
}

const insertComplaint = async (complaint) => {
    const query = "INSERT INTO complaints (nama, kelas, fakultas, jurusan, keluhan) VALUES (?,?, ?, ?, ?)"
    try {
        const currentPool = connection.getConnectionState().pool
        const [rows, _] = await currentPool.execute(query, [complaint.nama, complaint.kelas, complaint.fakultas, complaint.jurusan, complaint.keluhan])
        connection.releaseConnection(currentPool)
        return databaseResult(rows, null)
    } catch (e) {
        console.log("error", e.message)
        return databaseResult(null, new Error("failed to insert new complaint"))
    }
}

const updateComplaint = async (id, updatedComplaint) => {
    const query = "UPDATE complaints SET nama=?, kelas=?, fakultas=?, jurusan=?, keluhan=? WHERE id=?"
    try {
        const currentPool = connection.getConnectionState().pool
        const [rows, _] = await currentPool.execute(query, [updatedComplaint.nama,
            updatedComplaint.kelas,
            updatedComplaint.fakultas,
            updatedComplaint.jurusan,
            updatedComplaint.keluhan,
            id])
        connection.releaseConnection(currentPool)
        return databaseResult(rows, null)
    } catch (e) {
        console.log("error", e.message)
        return databaseResult(null, new Error("failed to update complaint"))
    }
}

const deleteComplaint = async (id) => {
    const query = "DELETE FROM complaints WHERE id=?"
    try {
        const currentPool = connection.getConnectionState().pool
        const [rows, _] = await currentPool.execute(query, [id])
        connection.releaseConnection(currentPool)
        return databaseResult(rows, null)
    } catch (e) {
        console.log("error", e.message)
        return databaseResult(null, new Error("failed to remove complaint"))
    }
}

module.exports = {
    getAllComplaints,
    getComplaintById,
    insertComplaint,
    updateComplaint,
    deleteComplaint
}