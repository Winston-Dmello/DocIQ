const sequelize = require('../../sequelize');
const Submissions = require('../../models/submissions.model');
const Form = require('../../models/form.model');
const UsersToForms = require('../../models/usersToForms.model');
const { createDocument, delDocument } = require('../../services/documents/documents.service');
const { uploadFile, deleteFile } = require('../s3/s3.service');
const { Sequelize } = require('sequelize');

const createSubmission = async (data, file_list, files) => {
    console.log(data.form_id);

    try{ 
        const form = await Form.findByPk(data.form_id);
        const relatedFormAndUser = await UsersToForms.findOne({
            where: {
                user_id: data.user_id,
                form_id: data.form_id,
            }
        });
        const form_status = relatedFormAndUser.form_status;
        const sub_data = JSON.parse(data.submission_data);
        console.log("FORM STATUS: ", form_status);
        console.log("SUBMISSION TYPE: ", form.submission_type);
        if(form.submission_type === 'one-time' && form_status === 'close') {
            throw new Error('This Form is closed');
        }

        const file_paths = await Promise.all(files.map(file => uploadFile(file, file_list)));

        const newSubmission = await Submissions.create({
            form_id: data.form_id,
            user_id: data.user_id,
            submission_data: sub_data,
            file_paths: file_paths,
        });
        
        if(newSubmission && form.submission_type === 'one-time') {
            await UsersToForms.update(
                {form_status: 'close'},
                { where: { user_id: data.user_id, form_id: data.form_id } }
            );
        }

        return newSubmission;
    }catch(error){
        throw error;
    }
}

const getAllSubmissions = async () => {
    try {
        const submissions = await Submissions.findAll({
            attributes: ['submission_id', 'status', 'updatedAt', 'form_id'], // Ensure 'form_id' is selected
            include: [{
                model: Form,
                attributes: ['form_name'], // Fetch only the form_name
                required: true // Ensures only submissions with a valid form_id are included
            }],
            order: [['updatedAt', 'DESC']]
        });

        const response = submissions.map(submission => ({
            submission_id: submission.submission_id,
            form_id: submission.form_id, // Ensure form_id is included
            form_name: submission.form.form_name, // Access form_name correctly
            status: submission.status,
            updatedAt: submission.updatedAt.toISOString().split('T')[0],
        }));
        return response;
    } catch (error) {
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
        const file_paths = submission.file_paths || [];
        if (status === 1){ //Submission Approved
            console.log("File_paths: ",file_paths);
            
            await Promise.all(
                file_paths.map(async (file_path) => await createDocument(file_path, submission, transaction))
            ); 
            await Submissions.update(
                { status: 'approved', reason: reason ? reason : "OK" },
                { where: { submission_id: id }, transaction }
            ); 
        }else if(status === 0){ //Submission Rejected
            await Submissions.update(
                { status: 'resubmit', reason: reason ? reason : "No reason" },
                { where: { submission_id: id }, transaction }
            );
        }else if(status === 2){ //Submission Pending

            await Promise.all(
                file_paths.map(async (file_path) => await delDocument(file_path, transaction))
            ); 

            await Submissions.update(
                { status: 'pending', reason: reason ? reason : "No reason" },
                { where: { submission_id: id }, transaction }
            );
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
            order: [['updatedAt', 'DESC']]
        });

        const response = submissions.map(submission => ({
            submission_id: submission.submission_id,
            form_id: submission.form_id, // Ensure form_id is included
            form_name: submission.form.form_name, // Access form_name correctly
            status: submission.status,
            updatedAt: submission.updatedAt.toISOString().split('T')[0],
        }));
        return response;
    } catch (error) {
        throw error;
    }
};

const delSubmission = async (submission_id) => {
    try{
        const submission = await Submissions.findOne({
            where: { submission_id: submission_id }
        });
        if (!submission) throw new Error('Submission not found');
        if (submission.status != "pending" && submission.status != "resubmit") {
            const error = new Error('Cannot Delete Approved Submission');
            error.statusCode = 403; // Forbidden
            throw error;
        }
        const user_id = submission.user_id;
        const form_id = submission.form_id;

        await UsersToForms.update( //update the users_to_forms table to keep the form open
            {form_status: 'open'},
            { where: { user_id: user_id, form_id: form_id } }
        );

        const file_paths = submission.file_paths;
        await Promise.all(file_paths.map((file) => deleteFile(file)));
        await Submissions.destroy({
            where: {  submission_id: submission_id }
        });
        return {message: "Submission destroyed successfully"};
    }catch(error){
        throw error;
    }
}  

const updateSubmission = async (submission_id, updateData) => {
    try{
        const submission = await Submissions.findByPk(submission_id);
        if (!submission) throw new Error('Submission not found');
        if (submission.status != "pending" && submission.status != "resubmit") {
            const error = new Error('Cannot Edit Approved Submission');
            error.statusCode = 403; // Forbidden
            throw error;
        }
        const file_paths = submission.file_paths;
        await Promise.all(file_paths.map((file) => deleteFile(file)));
        
        const updatedSubmission = await submission.update(updateData);
        return updatedSubmission;
    }catch (error) {
        throw new Error(error.message);
    }
}

const searchSubmissions = async (query) => {
    try {
      await Submissions.sequelize.query(`
        UPDATE "submissions"
        SET search_vector = to_tsvector('english', submission_data::text)
      `);
  
      const results = await Submissions.sequelize.query(`
        SELECT *
        FROM "submissions"
        WHERE search_vector @@ plainto_tsquery('english', :query)
      `, {
        replacements: { query },
        type: Sequelize.QueryTypes.SELECT
      });
  
      return results;
    } catch (error) {
      console.error('Search failed:', error);
    }
  };
  

module.exports = { 
    createSubmission, 
    getAllSubmissions, 
    getSubmissionById, 
    approveSubmission,
    getSubmissionsByUser,
    delSubmission,
    updateSubmission,
    searchSubmissions
 };