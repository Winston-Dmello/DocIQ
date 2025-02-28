const express = require('express');
const router = express.Router();
const { getDocumentsController, getDocumentsBySubmissionController } = require('./documents.controller');

router.get('/', getDocumentsController);
router.get('/submission/:submission_id', getDocumentsBySubmissionController);

module.exports = router;