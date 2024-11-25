import React, { useState } from 'react';
import { searchTickets } from '../services/api';

const SearchTickets = () => {
  const [name, setName] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const data = await searchTickets(name);
    setResults(data);
  };

  return (
    <div>
      <h2>Search Tickets</h2>
      <input
        type="text"
        placeholder="Search by Purchaser Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {results.map((ticket) => (
          <li key={ticket._id}>
            {ticket.title} - {ticket.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchTickets;
