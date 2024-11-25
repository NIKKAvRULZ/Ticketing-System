import React, { useEffect, useState } from 'react';
import { fetchTickets } from '../services/api';
import BuyTicket from '../components/BuyTicket';
import '../styles/PageStyles.css'; // Import shared styles

const BuyTicketPage = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const getTickets = async () => {
      const data = await fetchTickets();
      setTickets(data.filter((ticket) => ticket.status === 'available'));
    };

    getTickets();
  }, []);

  return (
    <div className="page-container">
      <h1 className="page-title">Buy Tickets</h1>
        {tickets.length > 0 ? (
          <BuyTicket tickets={tickets} />
        ) : (
          <p className="no-data-text">No available tickets at the moment.</p>
        )}
    </div>
  );
};

export default BuyTicketPage;
