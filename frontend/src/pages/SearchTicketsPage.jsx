import React, { useState } from 'react';
import { searchTickets } from '../services/api'; // API function for searching tickets
import '../styles/PageStyles.css'; // Import shared styles

const SearchTicketsPage = () => {
  const [name, setName] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!name.trim()) {
      setError('Please enter a purchaser name.');
      return;
    }

    setError('');
    setLoading(true);
    try {
      const data = await searchTickets(name);
      setResults(data);
    } catch (err) {
      console.error('Error searching tickets:', err);
      setError('An error occurred while searching. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h1>Search Tickets</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter Purchaser Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <br/>
      {error && <p className="error-text">{error}</p>}
      {loading ? (
        <p className="loading-text">Searching for tickets...</p>
      ) : (
        
        <div className="tickets-container">
          {results.length > 0 ? (
            results.map((ticket) => (
              <div key={ticket._id} className={`ticket-card ${ticket.status}`}>
                <h2>{ticket.title}</h2>
                <p>Status: <strong>{ticket.status.toUpperCase()}</strong></p>
                <p>
                  Purchaser: {ticket.purchaser ? ticket.purchaser : 'Not Purchased'}
                </p>
              </div>
            ))
          ) : (
            <p className="no-tickets-text">No tickets found for the provided name.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchTicketsPage;
