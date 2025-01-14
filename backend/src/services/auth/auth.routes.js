const express = require('express');
const { loginUser } = require('./auth.controller');

const router = express.Router();

router.post('/user', loginUser); // GET /api/users
// router.post('/admin', loginAdmin); // POST /api/users

module.exports = router;