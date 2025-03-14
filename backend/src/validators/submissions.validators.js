const { body } = require('express-validator');

const createSubmissionPayload = [
    body('form_id').isInt().withMessage('Form ID must be an integer')
    .notEmpty().withMessage('Form ID is required'),

    body('user_id').isInt().withMessage('User ID must be an integer')
    .notEmpty().withMessage('User ID is required'),

    body('submission_data').isArray().withMessage('Submission data must be an array')
    .notEmpty().withMessage('Submission data is required'),

    body('submission_data.*').isObject().withMessage('Each Submission data entry must be a JSON object'),
    // body('status').isIn(['pending', 'resubmit', 'approved']).withMessage('Invalid status value')
    // .notEmpty().withMessage('Status is required'),

    // body('file_paths').isArray().withMessage('File paths must be an array')
    // .notEmpty().withMessage('File paths are required'),

    // body('file_paths.*').isString().withMessage('Each file path must be a string'),
    body('reason').optional().isString().withMessage('Reason must be a string'),
]

module.exports = { createSubmissionPayload };