import React, { useEffect, useState } from 'react';
import { fetchTickets, deleteTicket } from '../services/api'; // Import delete function
import '../styles/ViewTicketsPage.css'; // Import shared styles

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
    const confirmed = window.confirm('Are you sure you want to delete this ticket?');
    if (!confirmed) return;

    try {
      await deleteTicket(ticketId);
      setTickets(tickets.filter(ticket => ticket._id !== ticketId)); // Remove deleted ticket from state
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
            <div key={ticket._id} className={`ticket-card ${ticket.status}`}>
              <h2>{ticket.title}</h2>
              <p>Status: <strong>{ticket.status.toUpperCase()}</strong></p>
              <p>Available: {ticket.availableCount}</p>
              <p>Sold: {ticket.sold}</p>
              <button onClick={() => handleDelete(ticket._id)} className="delete-button">Delete</button>
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
