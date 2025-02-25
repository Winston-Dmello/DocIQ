const sequelize = require('../../sequelize');
const Submissions = require('../../models/submissions.model');
const Documents = require('../../models/documents.model');
const Submissions = require('../../models/submissions.model');

const createSubmission = async (data, fileMap) => {

    console.log(data);
    try{    
        const newSubmission = await Submissions.create({
            form_id: data.form_id,
            user_id: data.user_id,
            submission_data: data.submission_data,
            file_map: fileMap,
        });

        return newSubmission;
    }catch(error){
        throw error;
    }

}

module.exports = { createSubmission };