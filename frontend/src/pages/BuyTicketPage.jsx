import React, { useEffect, useState } from 'react';
import { fetchTickets } from '../services/api'; // API function to fetch tickets
import BuyTicket from '../components/BuyTicket';

const BuyTicketPage = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const getTickets = async () => {
      const data = await fetchTickets();
      setTickets(data.filter(ticket => ticket.status === 'available')); // Filter available tickets
    };

    getTickets();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Buy Tickets</h1>
      {tickets.length > 0 ? (
        <BuyTicket tickets={tickets} />
      ) : (
        <p>No available tickets at the moment.</p>
      )}
    </div>
  );
};

export default BuyTicketPage;
