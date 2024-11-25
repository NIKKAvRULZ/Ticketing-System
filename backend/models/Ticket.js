const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, enum: ['available', 'sold'], default: 'available' },
  purchaser: { type: String, default: null }, // Store purchaser's name
});

module.exports = mongoose.model('Ticket', ticketSchema);
