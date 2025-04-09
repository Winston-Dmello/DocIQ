const express = require('express');
const { 
    loginUser, 
    loginAdmin, 
    refreshTokenController, 
    logoutController, 
    forgotPasswordController, 
    resetPasswordController } = require('./auth.controller');
 

const router = express.Router();

router.post('/user', loginUser); 
router.post('/admin', loginAdmin);
router.post('/refreshToken', refreshTokenController); 
router.post('/logout', logoutController);
router.post('/forgot-password', forgotPasswordController);
router.post('/reset-password', resetPasswordController);

module.exports = router;