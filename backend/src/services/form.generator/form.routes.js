const express = require('express');
const {createForm} = require('./form.controller');

const router = express.Router();

router.post("/create", createForm);


module.exports = router;