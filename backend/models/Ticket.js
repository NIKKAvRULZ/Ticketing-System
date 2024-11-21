const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    title: { type: String, required: true },
    status: { type: String, default: 'available' },
    purchaser: { type: String, default: null },
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);
