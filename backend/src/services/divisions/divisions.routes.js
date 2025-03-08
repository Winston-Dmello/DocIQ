const express = require('express');
const { getDivisionsController, createDivisionsController, updateDivisionController, delDivisionController } = require('./divisions.controller');
const { createDivisionPayload } = require('../../validators/divisions.validators');
const validate = require('../../validators/validate');

const router = express.Router();

router.get('/', getDivisionsController);
router.post('/', createDivisionPayload, validate, createDivisionsController);
router.put('/:id', updateDivisionController);
router.delete('/:id', delDivisionController);

module.exports = router;