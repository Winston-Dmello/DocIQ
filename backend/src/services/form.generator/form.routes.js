const express = require('express');
const {createForm, submitForm, getAllForms, getFormByIdController, getFormsByUserController} = require('./form.controller');
const {createFormPayload} = require('../../validators/form.validators');
const validate = require('../../validators/validate');

const router = express.Router();

router.post('/create', createFormPayload, validate, createForm); // /api/form/create
router.get('/get', getAllForms);
router.get('/get/:form_id', getFormByIdController); //api/form/get/id
router.get('/user/:user_id', getFormsByUserController); // api/form/user/id


module.exports = router;