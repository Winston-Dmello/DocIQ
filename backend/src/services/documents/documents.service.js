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

//document_id, form_name, user_name, file_name, division_name, category, file_path, date
const getDocuments = async () => {
    try{
        const documents = await Documents.findAll({
            attributes: ['document_id', 'form_name', 'user_name', 'file_name', 'division_name', 'category', 'file_path', 'date']
        });
        if (!documents) throw new Error('No Documents Found');
        return documents.map(document => ({
            ...document.get({ plain: true }), // Convert to plain object
            date: document.date.toISOString().split('T')[0] // Format date
        }));
    }catch(error){
        throw error;
    }
}

const getDocumentsBySubmission = async (submission_id) => {
    try{
        const documents = await Documents.findAll({
            attributes: ['document_id', 'form_name', 'user_name', 'file_name', 'division_name', 'category', 'file_path', 'date'],
            where: {submission_id: submission_id}
        });
        if (!documents) throw new Error('No Documents Found');
        return documents.map(document => ({
            ...document.get({ plain: true }), // Convert to plain object
            date: document.date.toISOString().split('T')[0] // Format date
        }));
    }catch(error){
        throw error;
    }
}

const delDocument = async (file_path, transaction=null) => {
    try{
        const document = await Documents.findOne({ where: { file_path } });
        if (!document) throw new Error('Document not found');
        await document.destroy({transaction});
    }catch(error){
        throw error;
    }
}

module.exports = { createDocument, getDocuments, getDocumentsBySubmission, delDocument  }; 