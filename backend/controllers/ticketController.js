const Ticket = require('../models/Ticket');

// Controller to add a new ticket with quantity, price
exports.addTicket = async (req, res) => {
  try {
    const { title, quantity, price } = req.body;

    if (quantity <= 0) {
      return res.status(400).json({ message: 'Quantity must be a positive number.' });
    }

    const ticket = new Ticket({
      title,
      price,
      quantity,
      availableCount: quantity, // Initially, all tickets are available
    });

    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Error adding ticket' });
  }
};

// Controller to buy a ticket (update available and sold count)
exports.buyTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { purchaser } = req.body;

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    if (ticket.availableCount <= 0) {
      return res.status(400).json({ message: 'Ticket is sold out' });
    }

    ticket.sold += 1;
    ticket.availableCount -= 1;
    ticket.purchaser = purchaser;

    await ticket.save();

    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Error purchasing ticket' });
  }
};

// Controller to get all tickets with available count and price
exports.getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    
    const ticketsWithAvailableCount = tickets.map(ticket => ({
      ...ticket.toObject(),
      availableCount: ticket.quantity - ticket.sold, // Calculate available tickets
    }));

    res.status(200).json(ticketsWithAvailableCount);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tickets' });
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
  
  // Controller to delete a ticket by its ID
exports.deleteTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;

    // Find the ticket by ID and remove it from the database
    const deletedTicket = await Ticket.findByIdAndDelete(ticketId);

    if (!deletedTicket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.status(200).json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting ticket' });
  }
};
