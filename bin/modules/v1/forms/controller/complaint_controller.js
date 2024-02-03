const complaintRepository = require('../repository/supabase/complaint_repository')
const {baseResponse} = require("../../../../utils/response");
const {Complaint} = require("../../../../entity/complaint");

const getComplaints = async (req, res) => {
    const complaintId = req.query.id

    if (complaintId === undefined) {
        const complaints = await complaintRepository.getAllComplaints()
        if (complaints.error) {
            res.status(500).json(baseResponse(500, complaints.error.message, null))
            return
        }
        res.status(200).json(baseResponse(200, null, complaints.data))
    } else {
        const complaint = await complaintRepository.getComplaintById(complaintId)
        if (complaint.error) {
            res.status(500).json(baseResponse(500, complaint.error.message, null))
            return
        }
        if (complaint.data.length === 0) {
            res.status(404).json(baseResponse(404, "complaint not found", null))
            return
        }
        res.status(200).json(baseResponse(200, null, complaint.data))
    }

}

const insertComplaint = async (req, res) => {
    const payload = req.body
    const newComplaint = Complaint(payload)

    const {data, error} = await complaintRepository.insertComplaint(newComplaint)
    if (error) {
        res.status(500).json(baseResponse(500, error.message, null))
        return
    }

    res.status(200).json(baseResponse(201, "complaint created", data[0]))
}

const updateComplaint = async (req, res) => {
    const payload = req.body
    const complaintId = req.query.id
    const newComplaint = Complaint(payload)

    if (complaintId === undefined) {
        res.status(400).json(baseResponse(400, "complaint id should inserted to query id"))
        return
    }

    const getSingleComplaint = await complaintRepository.getComplaintById(complaintId)
    if (getSingleComplaint.error) {
        res.status(500).json(baseResponse(500, getSingleComplaint.error.message, null))
        return
    }
    if (getSingleComplaint.data.length === 0) {
        res.status(404).json(baseResponse(404, "complaint not found", null))
        return
    }

    const {data, error} = await complaintRepository.updateComplaint(complaintId, newComplaint)
    if (error) {
        res.status(500).json(baseResponse(500, error.message, null))
        return
    }

    res.status(200).json(baseResponse(200, null, data[0]))
}

const deleteComplaint = async (req, res) => {
    const complaintId = req.query.id

    if (complaintId === undefined) {
        res.status(400).json(baseResponse(400, "complaint id should inserted to query id"))
        return
    }

    const getSingleComplaint = await complaintRepository.getComplaintById(complaintId)
    if (getSingleComplaint.error) {
        res.status(500).json(baseResponse(500, getSingleComplaint.error.message, null))
        return
    }
    if (getSingleComplaint.data.length === 0) {
        res.status(404).json(baseResponse(404, "complaint not found", null))
        return
    }

    const deleteComplaint = await complaintRepository.deleteComplaint(complaintId)
    if (deleteComplaint.error) {
        res.status(500).json(baseResponse(500, deleteComplaint.error.message, null))
        return
    }

    res.status(200).json(baseResponse(200, "complaint deleted", getSingleComplaint.data[0]))
}

module.exports = {
    getComplaints,
    insertComplaint,
    updateComplaint,
    deleteComplaint
}