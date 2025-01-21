const express = require('express');
const userRoutes = require('../services/user_example/user.routes');
const authRoutes = require('../services/auth/auth.routes');
const formRoutes = require('../services/form.generator/form.routes');

const router = express.Router();

// Define route modules
router.use('/users', userRoutes); // All user-related routes
router.use('/login', authRoutes);
router.use('/form', formRoutes);

module.exports = router;
