const sequelize = require('../../sequelize');
const Submissions = require('../../models/submissions.model');

const createSubmission = async (data, file_paths) => {
    console.log(data.form_id);
    console.log(file_paths);
    try{ 
        const sub_data = JSON.parse(data.submission_data);
        const newSubmission = await Submissions.create({
            form_id: data.form_id,
            user_id: data.user_id,
            submission_data: sub_data,
            file_paths: file_paths,
        });
        return newSubmission;
    }catch(error){
        throw error;
    }
}

const getAllSubmissions = async () => {
    try{
        const submissions = await Submissions.findAll({
            attributes: ['submission_id', 'submission_data'],
        });
        return submissions;
    }catch(error){
        throw error;
    }
}

const getSubmissionById = async (id) => {
    try{
        const submission = await Submissions.findOne({
            where: {submission_id: id},
        });
        return submission;
    }catch(error){  
        throw error;
    }
}

const approveSubmission = async (id, status, reason) => { // status is 0 (rejected) or 1 (approved)
    try{
        const submission = await getSubmissionById(id);
        if (status){
            
        }else{
            
        }
    }catch(error){
        throw error;
    }
}

const getSubmissionsByUser = async (id) => {
    try{
        const submissions = await Submissions.findAll({
            attributes: ['status', 'updatedAt'],
            include: [{
                model: Form,
                attributes: ['form_name'], // Fetching the form name from Forms table
                required: true
            }]
        });
        const response = submissions.map(submission => ({
            form_name: submission.Form.form_name,
            status: submission.status,
            updatedAt: submission.updatedAt,
        }));
        return response;
    }catch(error){
        throw error;
    }
}

module.exports = { 
    createSubmission, 
    getAllSubmissions, 
    getSubmissionById, 
    approveSubmission,
    getSubmissionsByUser
 };