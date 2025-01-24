const express = require('express');
const {createForm} = require('./form.controller');

const router = express.Router();

router.post('/create', createForm); // /api/form/create


module.exports = router;