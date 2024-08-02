// routes/clients.js
const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const sendEmail = require('../utils/sendEmail');

router.post('/', async (req, res) => {
  const { name, email, message, option } = req.body;

  try {
    const newClient = new Client({ name, email, message, option });
    await newClient.save();

    await sendEmail({
      to: email,
      subject: 'Solicitud de Servicio',
      context: {
        name: name,
        message: message,
        option: option,
      },
    });

    res.status(201).json({ message: 'Formulario enviado y correo enviado' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

module.exports = router;
