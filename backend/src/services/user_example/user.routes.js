const express = require('express');
const { getUsers, createUser } = require('./user.controller');

const router = express.Router();

router.get('/', getUsers); // GET /api/users
router.post('/', createUser); // POST /api/users

module.exports = router;
