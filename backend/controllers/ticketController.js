const Ticket = require('../models/Ticket');

// Fetch all tickets
exports.getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tickets' });
  }
};

// Add a new ticket
exports.addTicket = async (req, res) => {
  try {
    const { title } = req.body;
    const ticket = new Ticket({ title });
    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Error adding ticket' });
  }
};

// Buy a ticket
exports.buyTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { purchaser } = req.body;

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    if (ticket.status === 'sold') {
      return res.status(400).json({ message: 'Ticket is already sold' });
    }

    ticket.status = 'sold';
    ticket.purchaser = purchaser;

    await ticket.save();

    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Error purchasing ticket' });
  }
};
// Search tickets by purchaser's name
exports.searchTickets = async (req, res) => {
    try {
      const { purchaser } = req.query; // Get the query parameter
      if (!purchaser) {
        return res.status(400).json({ message: 'Purchaser name is required' });
      }
  
      // Find tickets where purchaser matches (case-insensitive)
      const tickets = await Ticket.find({ purchaser: { $regex: purchaser, $options: 'i' } });
  
      res.status(200).json(tickets);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error searching tickets' });
    }
  };
  