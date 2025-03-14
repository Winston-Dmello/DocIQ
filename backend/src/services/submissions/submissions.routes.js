const express = require('express');
const router = express.Router();
const upload = require('../../middlewares/multerConfig');
const validate = require('../../validators/validate');
const { createSubmissionPayload } = require('../../validators/submissions.validators');
const { 
    createSubmissionController,
    getSubmissionsController, 
    getSubmissionByIdController, 
    updateSubmissionController,
    approveSubmissionController,
    getSubmissionsByUserController,
    delSubmissionController } = require('./submissions.controller');

router.post('/create', upload.array('files', 10), createSubmissionPayload, validate, createSubmissionController);
router.get('/', getSubmissionsController);
router.get('/:id', getSubmissionByIdController);
router.put('/approve', approveSubmissionController);
router.get('/user/:user_id', getSubmissionsByUserController);
router.put('/:id', upload.array('files', 10), updateSubmissionController);
router.delete('/:id', delSubmissionController);

module.exports = router;