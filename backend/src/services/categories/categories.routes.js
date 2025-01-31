const express = require('express');
const { getCategoriesController, createCategoriesController } = require('./categories.controller');
const { createCategoryPayload } = require('../../validators/categories.validators');
const validate = require('../../validators/validate');

const router = express.Router();

router.get('/', getCategoriesController); // /api/categories
router.post('/', createCategoryPayload, validate, createCategoriesController); // /api/categories


module.exports = router;