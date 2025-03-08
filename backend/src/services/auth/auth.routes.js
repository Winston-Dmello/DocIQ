const express = require('express');
const { loginUser, loginAdmin } = require('./auth.controller');
 

const router = express.Router();

router.post('/user', loginUser); 
router.post('/admin', loginAdmin); 

module.exports = router;