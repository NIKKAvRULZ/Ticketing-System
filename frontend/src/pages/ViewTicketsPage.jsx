import React, { useEffect, useState } from 'react';
import { fetchTickets, deleteTicket } from '../services/api'; // Import the API function for fetching and deleting tickets
import '../styles/PageStyles.css'; // Import shared styles

const ViewTicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTickets = async () => {
      try {
        const data = await fetchTickets();
        setTickets(data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      } finally {
        setLoading(false);
      }
    };

    getTickets();
  }, []);

  const handleDelete = async (ticketId) => {
    try {
      // Call the deleteTicket API function
      await deleteTicket(ticketId);
      // Remove the deleted ticket from the state
      setTickets(tickets.filter((ticket) => ticket._id !== ticketId));
    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  };

  if (loading) {
    return <p>Loading tickets...</p>;
  }

  return (
    <div className="view-tickets-page">
      <h1>View Tickets</h1>
      <div className="tickets-container">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <div key={ticket._id} className={`ticket-card ${ticket.availableCount > 0 ? 'available' : 'sold'}`}>
              <h2>{ticket.title}</h2>
              <p>Status: <strong>{ticket.availableCount > 0 ? 'Available' : 'Sold'}</strong></p>
              <p>Price: ${ticket.price}</p>
              <p>Available: {ticket.availableCount}</p>
              <p>Sold: {ticket.sold}</p>
              {/* Delete button */}
              <button className="delete-button" onClick={() => handleDelete(ticket._id)}>
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No tickets available.</p>
        )}
      </div>
    </div>
  );
};

export default ViewTicketsPage;
