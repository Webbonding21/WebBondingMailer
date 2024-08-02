const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const sendEmail = require('../utils/sendEmail');

router.post('/', async (req, res) => {
    const { name, email, message, option } = req.body;

    if (!name || !email || !message || !option) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    try {
        const newClient = new Client({ name, email, message, option });
        await newClient.save();

        const templateData = { name, message, option };
        await sendEmail(email, 'Confirmación de Solicitud de Servicios', templateData);

        res.status(200).json({ message: 'Datos recibidos y correo enviado con éxito.' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Hubo un problema al procesar tu solicitud.' });
    }
});

module.exports = router;
