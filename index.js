const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Conectar a la base de datos
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api/clients', require('./routes/clients'));

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en https://webbondingmailer.onrender.com`);
});
