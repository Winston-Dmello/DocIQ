const { body } = require('express-validator');

const createDivisionPayload = [
    body('division_name').notEmpty().isLength({min: 2}).withMessage('Division name cannot be empty or lesser than 2 characters')
];

module.exports = { createDivisionPayload };