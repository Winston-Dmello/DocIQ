const { getDocuments, getDocumentsBySubmission, getDocumentsByUser } = require('./documents.service');
const { getSignedUrlForFile } = require('../s3/s3.service');

const getDocumentsController = async (req, res, next) => {
    try{
        const documents = await getDocuments();
        if(!documents) return res.status(404).json({message: 'No Documents Found'});
        return res.json(documents);
    }catch(error){
        next(error);
    }
}

const getDocumentsBySubmissionController = async (req, res, next) => {
    try{
        const submission_id = req.body.submission_id;
        const documents = await getDocuments(submission_id);
        if(!documents) return res.status(404).json({message: 'No Documents Found'});
        return res.json(documents);
    }catch(error){
        next(error);
    }
}

const getURLController = async (req, res, next) => {
    try{
        const file_path = req.body.file_path;
        const signedURL = await getSignedUrlForFile(file_path);
        return res.json(signedURL);
    }catch(error){
        next(error);
    }
}

const getDocumentsByUserController = async (req, res, next) => {
    try{
        const {user_id} = req.params;
        const documents = await getDocumentsByUser(user_id);
        if (!documents) return res.status(404).json({message: 'No Documents Found'});
        return res.json(documents);
    }catch(error){
        next(error);
    }
}

module.exports = { 
    getDocumentsController,
    getDocumentsBySubmissionController,
    getURLController,
    getDocumentsByUserController
}