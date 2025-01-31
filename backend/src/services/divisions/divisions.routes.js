const express = require('express');
const { getDivisionsController, createDivisionsController } = require('./divisions.controller');

const router = express.Router();

router.get('/', getDivisionsController);
router.post('/', createDivisionsController);

module.exports = router;