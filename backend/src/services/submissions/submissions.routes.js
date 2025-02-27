const express = require('express');
const router = express.Router();
const { createSubmissionController, getSubmissionsController, getSubmissionByIdController, updateSubmissionController } = require('./submissions.controller');
const upload = require('../../middlewares/multerConfig');

router.post('/create', upload.array('files', 10) ,createSubmissionController);
router.get('/', getSubmissionsController);
router.get('/:id', getSubmissionByIdController);
router.put('/', upload.array('files', 10), updateSubmissionController);

module.exports = router;