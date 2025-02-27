const sequelize = require('../../sequelize');
const Submissions = require('../../models/submissions.model');
const Documents = require('../../models/documents.model');

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


module.exports = { createSubmission, getAllSubmissions };