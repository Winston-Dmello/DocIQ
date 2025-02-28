const sequelize = require('../../sequelize');
const Documents = require('../../models/documents.model');
const { getUserById } = require('../user/user.service');
const { getFormById } = require('../form.generator/form.service');

const createDocument = async (file_path, submission, transaction = null) => {
    try{

        const user = await getUserById(submission.user_id);
        const form = await getFormById(submission.form_id);

        const document = await Documents.create({
            file_name: file_path.split('/').pop(),
            form_name: form.form_name,
            user_name: user.user_name,
            submission_id: submission.submission_id, // Extract filename from path
            division_name: user.division,
            category: form.category,
            meta_data: submission.submission_data || {},
            file_path: file_path,
            date: new Date()
        }, { transaction });
        console.log(document.document_id);
        return document.document_id;
    }catch(error){
        throw error;    
    }
}


module.exports = { createDocument }; 