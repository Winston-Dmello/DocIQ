const express = require('express');
const userRoutes = require('./user.routes');

const router = express.Router();

// Define route modules
router.use('/users', userRoutes); // All user-related routes

module.exports = router;
