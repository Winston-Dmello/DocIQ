const { getDocuments, getDocumentsBySubmission } = require('./documents.service');


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

module.exports = { 
    getDocumentsController,
    getDocumentsBySubmissionController
}