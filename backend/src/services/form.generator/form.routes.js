const express = require('express');
const {createForm} = require('./form.controller');

const router = express.Router();

router.post('/create', createForm); // /api/form/create
router.delete('/delete')


module.exports = router;