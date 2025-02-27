const { createSubmission, getAllSubmissions } = require('./submissions.service');

const createSubmissionController = async (req, res, next) => {

    try{
        const newSubmission = await createSubmission(req.body, req.file_paths);
        return res.status(200).json({message: "Submission successful", details: newSubmission});
    }catch(error){
        next(error);
    }
}

const getSubmissionsController = async (req, res, next) => {
    try{
        const submissions = await getAllSubmissions();
        if(!submissions) return res.status(404).json({message: 'No submissions found'});
        return res.json(submissions);
    }catch(error){
        next(error);
    }
}

const getSubmissionByIdController = async (req, res, next) => {
    try{

    }catch(error){
        next(error);
    }
}

const updateSubmissionController = async (req, res, next) => {
    try{

    }catch(error){
        next(error);
    }
}
module.exports = { createSubmissionController, getSubmissionByIdController, getSubmissionsController };