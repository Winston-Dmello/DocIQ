const express = require('express');
const {createForm, getAllForms, getFormByIdController, getFormsByUserController, getUsersController} = require('./form.controller');
const {createFormPayload} = require('../../validators/form.validators');
const validate = require('../../validators/validate');
const authMiddleware = require('../../middlewares/authMiddleware');
const router = express.Router();

router.post('/create', createFormPayload, validate, createForm); // /api/form/create
router.get('/get', getAllForms); //api/form/get
router.get('/get/:form_id', getFormByIdController); //api/form/get/id
router.get('/user/:user_id', getFormsByUserController); // api/form/user/id
router.get('/users', getUsersController);


module.exports = router;