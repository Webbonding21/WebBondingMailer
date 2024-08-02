const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
require('dotenv').config();

const sendEmail = async (to, subject, templateData) => {
    const templateSource = fs.readFileSync(path.join(__dirname, '../templates/emailTemplate.html'), 'utf8');
    const template = handlebars.compile(templateSource);
    const htmlToSend = template(templateData);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html: htmlToSend
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
