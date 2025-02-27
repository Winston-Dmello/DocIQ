const { createSubmission, getAllSubmissions, getSubmissionById, getSubmissionsByUser } = require('./submissions.service');

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
        const id = req.params.id;
        const submission = await getSubmissionById(id);
        if(!submission) return res.status(404).json({message: 'Submission not found'});
        return res.json(submission);
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

const approveSubmissionController = async (req, res, next) => {
    try{

    }catch(error){
        next(error);
    }
}

const getSubmissionsByUserController = async (req, res, next) => {
    try{
        const user_id = req.params.user_id;
        const submissions = getSubmissionsByUser(user_id);
        if(!submissions) return res.status(404).json({message: 'Submissions not found'});
        return res.json(submissions);
    }catch(error){
        next(error);
    }
}

module.exports = { 
    createSubmissionController,
    getSubmissionByIdController,
    getSubmissionsController,
    updateSubmissionController,
    approveSubmissionController,
    getSubmissionsByUserController
};