const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Log', logSchema);
