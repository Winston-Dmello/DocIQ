const express = require('express');
const router = express.Router();
const { getDocumentsController, getDocumentsBySubmissionController, getURLController } = require('./documents.controller');

router.get('/', getDocumentsController);
router.get('/submission/:submission_id', getDocumentsBySubmissionController);
router.post('/getURL', getURLController);

module.exports = router;