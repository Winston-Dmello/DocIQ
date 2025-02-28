const sequelize = require('../../sequelize');
const Submissions = require('../../models/submissions.model');
const Form = require('../../models/form.model');
const { createDocument } = require('../../services/documents/documents.service');

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
            include: [{
                model: Form,
                attributes: ['form_name'], // Fetch only the form_name
                required: true // Ensures only submissions with a valid form_id are included
            }],
            where: {submission_id: id},
        });    
        return submission;
    }catch(error){  
        throw error;
    }
}

const approveSubmission = async (id, status, reason) => { // status is 0 (rejected) or 1 (approved)
    const transaction = await sequelize.transaction();
    try{
        const submission = await getSubmissionById(id);
        if(!submission) throw new Error('Submission not found');
        console.log("Submission: ******", submission);
        console.log("Submission ID: ",submission.submission_id);
        if (status){ //Submission Approved
            const file_paths = submission.file_paths || [];
            console.log("File_paths: ",file_paths);
            
            await Promise.all(
                file_paths.map(async (file_path) => await createDocument(file_path, submission, transaction))
            ); 
            await Submissions.update(
                { status: 'approved' },
                { where: { submission_id: id }, transaction }
            ); 

        }else{ //Submission Rejected
            await Submissions.update(
                { status: 'resubmit', reason: reason },
                { where: { submission_id: id }, transaction }
            )
        }
        await transaction.commit();
        return submission;
    }catch(error){
        await transaction.rollback(); //roll back on error
        throw error;    
    }
}

const getSubmissionsByUser = async (id) => {
    try {
        const submissions = await Submissions.findAll({
            attributes: ['submission_id', 'status', 'updatedAt', 'form_id'], // Ensure 'form_id' is selected
            include: [{
                model: Form,
                attributes: ['form_name'], // Fetch only the form_name
                required: true // Ensures only submissions with a valid form_id are included
            }],
            where: {user_id: id},
        });

        const response = submissions.map(submission => ({
            submission_id: submission.submission_id,
            form_id: submission.form_id, // Ensure form_id is included
            form_name: submission.form.form_name, // Access form_name correctly
            status: submission.status,
            updatedAt: submission.updatedAt.toISOString().split('T')[0],
        }));
        console.log(response);
        return response;
    } catch (error) {
        throw error;
    }
};


module.exports = { 
    createSubmission, 
    getAllSubmissions, 
    getSubmissionById, 
    approveSubmission,
    getSubmissionsByUser
 };