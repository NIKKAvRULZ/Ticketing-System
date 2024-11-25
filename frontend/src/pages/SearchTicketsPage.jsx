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
      // Search for tickets purchased by the user
      const data = await searchTickets(name);
      
      if (data.length === 0) {
        setError('No tickets found for the provided name.');
      } else {
        // Group tickets by purchaser (user)
        const groupedTickets = data.reduce((acc, ticket) => {
          if (!acc[ticket.purchaser]) {
            acc[ticket.purchaser] = [];
          }
          acc[ticket.purchaser].push(ticket);
          return acc;
        }, {});
        
        setResults(groupedTickets);
      }
    } catch (err) {
      console.error('Error searching tickets:', err);
      setError('An error occurred while searching. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-tickets-page center">
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
      {error && <p className="error-text">{error}</p>}
      {loading ? (
        <p className="loading-text">Searching for tickets...</p>
      ) : (
        <div className="user-cards-container center">
          {Object.keys(results).length > 0 ? (
            Object.keys(results).map((user) => {
              // Calculate total price and ticket count for each user
              const userTickets = results[user];
              const ticketCount = userTickets.length;
              const totalPrice = userTickets.reduce((sum, ticket) => sum + ticket.price, 0);
              
              return (
                <div key={user} className="center">
                  <h2>{user}'s Tickets</h2>
                  <div className="tickets-container">
                    {userTickets.map((ticket) => (
                      <div key={ticket._id} className={`ticket-card ${ticket.availableCount > 0 ? 'available' : 'sold'}`}>
                        <h3>{ticket.title}</h3>
                        <p>Status: <strong>{ticket.availableCount > 0 ? 'Available' : 'Sold'}</strong></p>
                        <p>Price: ${ticket.price}</p>
                      </div>
                    ))}
                  </div>
                  <div className="user-summary">
                    <p><strong>Total Tickets Purchased:</strong> {ticketCount}</p>
                    <p><strong>Total Price:</strong> ${totalPrice}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="no-tickets-text">No tickets found for the provided name.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchTicketsPage;
