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
//Also Im making this commit because I feel like I have to or else something will happen.

module.exports = transporter;