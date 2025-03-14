const express = require('express');
const {createForm, getAllForms, getFormByIdController, getFormsByUserController, getUsersController} = require('./form.controller');
const {createFormPayload} = require('../../validators/form.validators');
const validate = require('../../validators/validate');
const isAdmin = require('../../middlewares/isAdmin');
const hasRole = require('../../middlewares/hasRole');
const router = express.Router();

router.post('/create', isAdmin, createFormPayload, validate, createForm); // create a new form
router.get('/get', isAdmin, getAllForms); // get all forms
router.get('/get/:form_id', hasRole, getFormByIdController); // get form by form_id
router.get('/user/:user_id', hasRole, getFormsByUserController); // get form by user_id
router.get('/users', isAdmin, getUsersController); // get all users

module.exports = router;