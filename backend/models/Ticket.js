const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },   // Ticket price
  quantity: { type: Number, required: true }, // Total number of tickets
  sold: { type: Number, default: 0 },         // Number of sold tickets
  availableCount: { type: Number, default: 0 }, // Available tickets
  purchaser: { type: String, default: null },  // Purchaser's name
});

module.exports = mongoose.model('Ticket', ticketSchema);
