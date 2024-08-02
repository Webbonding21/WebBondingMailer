// utils/sendEmail.js
const nodemailer = require('nodemailer');
const fs = require('fs');
const handlebars = require('handlebars');
require('dotenv').config();

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const source = fs.readFileSync('templates/emailTemplate.html', 'utf8');
  const template = handlebars.compile(source);
  const htmlToSend = template(options.context);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: options.to,
    subject: options.subject,
    html: htmlToSend,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
