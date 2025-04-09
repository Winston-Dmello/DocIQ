const nodemailer = require('nodemailer');
require('dotenv').config();


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'postnanda200@gmail.com',
        pass: "paste it here"
    }
});

//Also, drop tables once because there are changes in the user model.


module.exports = transporter;