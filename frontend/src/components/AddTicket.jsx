import React, { useState } from 'react';
import { addTicket } from '../services/api';

const AddTicket = () => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTicket({ title });
      setTitle('');
      alert('Ticket added successfully!');
    } catch (err) {
      setError('Failed to add ticket');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Ticket</h2>
      <input
        type="text"
        placeholder="Ticket Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <button type="submit">Add Ticket</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default AddTicket;
