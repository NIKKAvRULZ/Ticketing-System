import React, { useState } from 'react';
import { addTicket } from '../services/api';
import '../styles/PageStyles.css';

const AddTicketPage = () => {
  const [title, setTitle] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !quantity || !price) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const newTicket = await addTicket({ title, quantity: Number(quantity), price: Number(price) });
      setSuccess(`Ticket "${newTicket.title}" added successfully!`);
      setTitle('');
      setQuantity('');
      setPrice('');
      setError('');
    } catch (err) {
      setError('Error adding ticket. Please try again.');
    }
  };

  return (
    <div className="page-container">
      <h1>Add Ticket</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ticket Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">Add Ticket</button>
        {error && <p className="error-text">{error}</p>}
        {success && <p className="success-text">{success}</p>}
      </form>
    </div>
  );
};

export default AddTicketPage;
