const express = require('express');
const userRoutes = require('../services/user_example/user.routes');
const authRoutes = require('../services/auth/auth.routes');
const formRoutes = require('../services/form.generator/form.routes');
const authMiddleWare = require('../middlewares/authMiddleware.js');
const router = express.Router();

// Define route modules
router.use('/login', authRoutes); // /api/login
router.use('/users', authMiddleWare, userRoutes); // All user-related routes
router.use('/form', formRoutes);

module.exports = router;
