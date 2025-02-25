const express = require('express');
const router = express.Router();
const {createSubmissionController} = require('./submissions.controller');
const upload = require('../../middlewares/multerConfig');

router.post('/create', upload.array('files', 10) ,createSubmissionController);

module.exports = router;