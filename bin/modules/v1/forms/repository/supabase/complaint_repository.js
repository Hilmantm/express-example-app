const supabase = require('../../../../../infra/database/supabase/supabase')
const {databaseResult} = require("../../../../../utils/response");

const getAllComplaints = async () => {
    const { data, error } = await supabase
        .from('complaints')
        .select()

    return databaseResult(data, error)
}

const getComplaintById = async (id) => {
    const { data, error } = await supabase
        .from('complaints')
        .select()
        .eq('id', id)

    return databaseResult(data, error)
}

const insertComplaint = async (complaint) => {
    const { data, error } = await supabase
        .from('complaints')
        .insert(complaint)
        .select()

    return databaseResult(data, error)
}

const updateComplaint = async (id, updatedComplaint) => {
    const { data, error } = await supabase
        .from('complaints')
        .update(updatedComplaint)
        .eq('id', id)
        .select()

    return databaseResult(data, error)
}

const deleteComplaint = async (id) => {
    const { error } = await supabase
        .from('complaints')
        .delete()
        .eq('id', id)
        .select()

    return databaseResult(null, error)
}

module.exports = {
    getAllComplaints,
    getComplaintById,
    insertComplaint,
    updateComplaint,
    deleteComplaint
}