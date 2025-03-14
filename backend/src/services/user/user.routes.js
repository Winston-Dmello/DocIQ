const express = require('express');
const { getUsers, createUser, delUserController } = require('./user.controller');
const isAdmin = require('../../middlewares/isAdmin');
const { createUserPayload } = require('../../validators/user.validators');
const validate = require('../../validators/validate');
const router = express.Router();

router.get('/', isAdmin, createUserPayload, validate,  getUsers); // GET /api/users
router.post('/', isAdmin, createUser); // POST /api/users
router.delete('/', isAdmin, delUserController);


module.exports = router;
