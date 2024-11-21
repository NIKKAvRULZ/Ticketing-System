const express = require('express');
const { 
    getAllTickets, 
    createTicket, 
    getTicketById, 
    updateTicket, 
    deleteTicket 
} = require('../controllers/ticketController');

const router = express.Router();

// GET all tickets
router.get('/', getAllTickets);

// GET a single ticket by ID
router.get('/:id', getTicketById);

// POST a new ticket
router.post('/', createTicket);

// PUT to update a ticket by ID
router.put('/:id', updateTicket);

// DELETE a ticket by ID
router.delete('/:id', deleteTicket);

module.exports = router;
