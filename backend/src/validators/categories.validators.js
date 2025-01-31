const { body } = require('express-validator');


const createCategoryPayload = [
    body('category_name').notEmpty().isLength({min: 2}).withMessage('Category name cannot be empty or lesser than 2 characters')
];

module.exports = { createCategoryPayload };