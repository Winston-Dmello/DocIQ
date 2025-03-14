const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const path = require('path');
const { errorHandler } = require('./middlewares/errorHandler');
const logger = require('./middlewares/logger');


const app = express();

corsOptions = {
    origin: ['http://localhost:5173', 'http://192.168.193.27:5173', 'http://192.168.193.194:5173'],
    methods: ['*'],
    allowedHeaders: ['*'],
    exposedHeaders: ['*'],
    credentials: true
}

// Middleware
app.use(cors(corsOptions));
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.use(logger);
// Routes
app.use('/api', routes); // Prefix all routes with /api
//serve files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Error Handling
app.use(errorHandler);

module.exports = app;
