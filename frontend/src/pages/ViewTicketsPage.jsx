import React, { useEffect, useState } from 'react';
import { fetchTickets } from '../services/api'; // API function to fetch tickets
import '../styles/ViewTicketsPage.css'; // Styles for the page

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

  if (loading) {
    return (
      <div className="view-tickets-page">
        <h1>View Tickets</h1>
        <p className="loading-text">Loading tickets...</p>
      </div>
    );
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
              <p>
                Purchaser: {ticket.purchaser ? ticket.purchaser : 'Not Purchased'}
              </p>
            </div>
          ))
        ) : (
          <p className="no-tickets-text">No tickets available.</p>
        )}
      </div>
    </div>
  );
};

export default ViewTicketsPage;
