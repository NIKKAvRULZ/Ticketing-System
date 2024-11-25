import React from 'react';
import AddTicket from '../components/AddTicket';
import '../styles/PageStyles.css'; // Import shared styles

const AddTicketPage = () => {
  return (
    <div className="page-container">
      <h1 className="page-title">Add Tickets</h1>
        <AddTicket />
    </div>
  );
};
export default AddTicketPage;
