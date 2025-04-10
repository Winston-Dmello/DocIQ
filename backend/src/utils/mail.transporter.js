const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'postnanda200@gmail.com',
        pass: process.env.APP_PASSWORD
    }
});


module.exports = transporter;