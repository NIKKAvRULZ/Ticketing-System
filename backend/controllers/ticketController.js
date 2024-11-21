const Ticket = require('../models/Ticket');

// Get all tickets
exports.getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single ticket by ID
exports.getTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) return res.status(404).json({ message: "Ticket not found" });
        res.json(ticket);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new ticket
exports.createTicket = async (req, res) => {
    try {
        const newTicket = new Ticket(req.body);
        await newTicket.save();
        res.status(201).json(newTicket);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a ticket by ID
exports.updateTicket = async (req, res) => {
    try {
        const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTicket) return res.status(404).json({ message: "Ticket not found" });
        res.json(updatedTicket);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a ticket by ID
exports.deleteTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndDelete(req.params.id);
        if (!ticket) return res.status(404).json({ message: "Ticket not found" });
        res.json({ message: "Ticket deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
