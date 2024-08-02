const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const sendEmail = require('../utils/sendEmail');

router.post('/clients', async (req, res) => {
    const { name, email, message, option } = req.body;

    try {
        const client = new Client({ name, email, message, option });
        await client.save();

        await sendEmail({
            name: name,
            email: email,
            message: message,
            option: option,
            subject: 'Información de tu solicitud'
        });

        res.status(200).json({ message: 'Client saved and email sent successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
});

module.exports = router;
