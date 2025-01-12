const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { errorHandler } = require('./middlewares/errorHandler');
const logger = require('./utils/logger');

const app = express();

corsOptions = {
    origin: ['http://localhost:5173'],
    methods: ['*'],
    allowedHeaders: ['*'],
    credentials: true
}

// Middleware
app.use(cors(corsOptions));
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.use(logger);
// Routes
app.use('/api', routes); // Prefix all routes with /api


// Error Handling
app.use(errorHandler);

module.exports = app;
