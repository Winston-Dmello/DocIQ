const express = require('express');
const { getCategoriesController, createCategoriesController } = require('./categories.controller');

const router = express.Router();

router.get('/', getCategoriesController);
router.post('/', createCategoriesController);


module.exports = router;