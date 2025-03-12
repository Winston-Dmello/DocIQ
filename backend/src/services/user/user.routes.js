const express = require('express');
const { getUsers, createUser, delUserController } = require('./user.controller');

const router = express.Router();

router.get('/', getUsers); // GET /api/users
router.post('/', createUser); // POST /api/users
router.delete('/', delUserController);


module.exports = router;
