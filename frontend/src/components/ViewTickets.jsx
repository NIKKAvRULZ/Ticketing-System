import React, { useEffect, useState } from 'react';
import { fetchTickets } from '../services/api';

const ViewTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const getTickets = async () => {
      const data = await fetchTickets();
      setTickets(data);
    };
    getTickets();
  }, []);

  return (
    <div>
      <h2>All Tickets</h2>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket._id}>
            {ticket.title} - {ticket.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewTickets;
