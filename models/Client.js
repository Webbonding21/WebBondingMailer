const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    option: { type: String, required: true }
});

module.exports = mongoose.model('Client', clientSchema);
