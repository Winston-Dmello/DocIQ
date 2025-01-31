const express = require('express');
const { getDivisionsController, createDivisionsController } = require('./divisions.controller');
const { createDivisionPayload } = require('../../validators/divisions.validators');
const validate = require('../../validators/validate');

const router = express.Router();

router.get('/', getDivisionsController);
router.post('/', createDivisionPayload, validate, createDivisionsController);

module.exports = router;