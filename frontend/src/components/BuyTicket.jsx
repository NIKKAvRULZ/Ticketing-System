import React, { useState } from 'react';
import { buyTicket } from '../services/api';

const BuyTicket = ({ tickets }) => {
  const [ticketId, setTicketId] = useState('');
  const [purchaser, setPurchaser] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ticketId || !purchaser) {
      setError('Please select a ticket and enter your name.');
      return;
    }
    
    try {
      const updatedTicket = await buyTicket(ticketId, purchaser);
      setSuccessMessage(`Ticket "${updatedTicket.title}" purchased successfully!`);
      setTicketId('');
      setPurchaser('');
      setError('');
    } catch (err) {
      setError('Failed to purchase ticket. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Purchase a Ticket</h2>

      <select
        value={ticketId}
        onChange={(e) => setTicketId(e.target.value)}
        required
        style={{ padding: '10px', marginBottom: '10px', width: '100%' }}
      >
        <option value="">Select a Ticket</option>
        {tickets.map((ticket) => (
          <option key={ticket._id} value={ticket._id}>
            {ticket.title}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Your Name"
        value={purchaser}
        onChange={(e) => setPurchaser(e.target.value)}
        required
        style={{ padding: '10px', marginBottom: '10px', width: '100%' }}
      />

      <button type="submit" style={{ padding: '10px', backgroundColor: '#007BFF', color: '#fff' }}>
        Buy Ticket
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </form>
  );
};

export default BuyTicket;
