const express = require('express');
const {createForm, submitForm} = require('./form.controller');
const {createFormPayload} = require('../../validators/form.validators');
const validate = require('../../validators/validate');

const router = express.Router();

router.post('/create', createFormPayload, validate, createForm); // /api/form/create
router.post('/submit', submitForm); // /api/form/submit


module.exports = router;