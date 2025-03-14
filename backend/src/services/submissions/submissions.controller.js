const Submissions = require('../../models/submissions.model');
const { 
    createSubmission, 
    getAllSubmissions, 
    getSubmissionById, 
    getSubmissionsByUser, 
    approveSubmission,
    delSubmission,
    updateSubmission } = require('./submissions.service');
const { uploadFile } = require('../s3/s3.service');

const createSubmissionController = async (req, res, next) => {  
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No files uploaded" });
    }
    if (!req.file_paths) req.file_paths = [];
    try{
        req.file_list = req.body.file_list ? JSON.parse(req.body.file_list) : [];
        req.file_paths = await Promise.all(req.files.map(file => uploadFile(file, req.file_list)));
        console.log("File paths: ", req.file_paths);
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

const approveSubmissionController = async (req, res, next) => {
    try{
        const {submission_id, status, reason} = req.body;
        const response = await approveSubmission(submission_id, status, reason);
        if(!response) return res.status(500).json({message: 'Error approving submission'});
        return res.status(200).json(response);
    }catch(error){
        next(error);
    }
}

const getSubmissionsByUserController = async (req, res, next) => {
    try{
        const user_id = req.params.user_id;
        const submissions = await getSubmissionsByUser(user_id);
        if(!submissions) return res.status(404).json({message: 'Submissions not found'});
        return res.json(submissions);
    }catch(error){
        next(error);
    }
}

const delSubmissionController = async (req, res, next) => {
    try{
        const submission_id = req.params.id;
        const response = await delSubmission(submission_id);
        return res.status(200).json(response);
    }catch(error){
        next(error);
    }
}

const updateSubmissionController = async (req, res, next) => {
    try{
        const submission_id = req.params.id;
        const updateData = {submission_data: req.body.submission_data, file_paths: req.file_paths}
        
        const response = await updateSubmission(submission_id, updateData);
        return res.status(200).json(response);
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
    getSubmissionsByUserController,
    delSubmissionController
};