const { body } = require('express-validator');

const createUserPayload = [
    body('user_name')
        .notEmpty().withMessage('User name is required')
        .isString().withMessage('User name must be a string'),
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    body('designation')
        .optional()
        .isString().withMessage('Designation must be a string'),
    body('role')
        .notEmpty().withMessage('Role is required')
        .isIn(['user', 'admin']).withMessage('Role must be either "user" or "admin"'),
    body('division')
        .notEmpty().withMessage('Division is required')
        .isString().withMessage('Division must be a string'),
];

module.exports = {createUserPayload};