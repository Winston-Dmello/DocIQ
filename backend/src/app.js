const express = require('express');
const routes = require('./routes'); // Import all routes
const { errorHandler } = require('./middlewares/errorHandler');
const logger = require('./utils/logger');

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.use(logger);
// Routes
app.use('/api', routes); // Prefix all routes with /api


// Error Handling
app.use(errorHandler);

module.exports = app;
