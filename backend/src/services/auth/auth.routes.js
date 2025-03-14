const express = require('express');
const { loginUser, loginAdmin, refreshTokenController, logoutController } = require('./auth.controller');
 

const router = express.Router();

router.post('/user', loginUser); 
router.post('/admin', loginAdmin);
router.post('/refreshToken', refreshTokenController); 
router.post('/logout', logoutController);

module.exports = router;