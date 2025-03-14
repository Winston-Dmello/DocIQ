const express = require('express');
const router = express.Router();
const { 
        getDocumentsController, 
        getDocumentsBySubmissionController, 
        getURLController, 
        getDocumentsByUserController } = require('./documents.controller');

router.get('/', getDocumentsController);
router.get('/submission/:submission_id', getDocumentsBySubmissionController);
router.get('/user/:user_id', getDocumentsByUserController);
router.post('/getURL', getURLController);

module.exports = router;