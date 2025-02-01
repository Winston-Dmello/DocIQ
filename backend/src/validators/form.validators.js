const { body } = require('express-validator');

const createFormPayload = [
    body('form_name').isString().isLength({min: 2}).withMessage('Form name must be atleast 2 characters'),
    body('category').isString().isLength({min: 2}).withMessage('Catgeory must be atleast 2 characters'),
    body('submission_type').isString().isIn(['one-time', 'multiple']).withMessage('Submission type must be either "one-time" or "multiple"'),
    body('recipients').isArray({min: 1}).withMessage('Form needs atleast one recipient'),
    body('form_data').isArray().withMessage('form_data must be a valid JSON object'),
];

module.exports = {createFormPayload};