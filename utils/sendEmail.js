const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

const sendEmail = async (options) => {
    // Configuración del transporte de correo
    const transporter = nodemailer.createTransport({
        service: 'gmail', // o cualquier otro servicio de correo electrónico
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Renderizar la plantilla .ejs
    const templatePath = path.join(__dirname, '..', 'templates', 'emailTemplate.ejs');
    const emailHTML = await ejs.renderFile(templatePath, {
        name: options.name,
        email: options.email,
        message: options.message,
        option: options.option
    });

    // Configuración del correo
    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: options.email,
        subject: options.subject,
        html: emailHTML
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
