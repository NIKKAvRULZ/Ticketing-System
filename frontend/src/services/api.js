import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const fetchTickets = async () => {
  const response = await axios.get(`${API_BASE_URL}/tickets`);
  return response.data;
};

export const addTicket = async (ticketData) => {
  const response = await axios.post(`${API_BASE_URL}/tickets`, ticketData);
  return response.data;
};

export const buyTicket = async (ticketId, purchaser) => {
  const response = await axios.patch(`${API_BASE_URL}/tickets/${ticketId}`, { purchaser });
  return response.data;
};

export const searchTickets = async (purchaserName) => {
  const response = await axios.get(`${API_BASE_URL}/tickets/search`, {
    params: { purchaser: purchaserName },
  });
  return response.data;
};

// DELETE request to delete a ticket
export const deleteTicket = async (ticketId) => {
  const response = await axios.delete(`${API_BASE_URL}/tickets/${ticketId}`);
  return response.data; // Returns a success message
};
