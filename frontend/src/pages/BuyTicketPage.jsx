import React, { useEffect, useState } from 'react';
import { fetchTickets, buyTicket } from '../services/api'; // API function to fetch tickets
import { jsPDF } from 'jspdf'; // Import jsPDF for PDF generation
import QRCode from 'qrcode';
import '../styles/PageStyles.css';

const BuyTicketPage = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null); // Store selected ticket
  const [purchaser, setPurchaser] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const getTickets = async () => {
      const data = await fetchTickets();
      setTickets(data.filter(ticket => ticket.availableCount > 0)); // Show only available tickets
    };

    getTickets();
  }, []);

  // Handle ticket selection and autofill form fields
  const handleTicketSelection = (ticket) => {
    setSelectedTicket(ticket);
    setPurchaser(''); // Clear previous purchaser name
    setSuccess(''); // Clear success message
    setError(''); // Clear any errors
  };

  // Function to generate the PDF for the purchased ticket
  const generatePDF = async () => {
    const doc = new jsPDF();
  
    // Set up the background and border for the ticket
    const ticketWidth = 180; // Width of the ticket
    const ticketHeight = 100; // Height of the ticket
    const margin = 10; // Margin around the ticket
  
    // Draw a rounded rectangle for the ticket background
    doc.setFillColor(255, 255, 255); // White background
    doc.rect(margin, margin, ticketWidth, ticketHeight, 'FD'); // 'FD' means fill and stroke
  
    // Set the border color
    doc.setDrawColor(0, 0, 0); // Black border
    doc.setLineWidth(1); // Set border width
    doc.rect(margin, margin, ticketWidth, ticketHeight); // Draw the ticket border
  
    // Add some ticket styling and text
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(18);
    doc.text('EVENT TICKET', margin + 10, margin + 20); // Title of the ticket
  
    // Ticket details (Positioning the text)
    doc.setFontSize(12);
    doc.text(`Ticket Title: ${selectedTicket.title}`, margin + 10, margin + 30);
    doc.text(`Purchaser: ${purchaser}`, margin + 10, margin + 40);
    doc.text(`Price: $${selectedTicket.price}`, margin + 10, margin + 50);
    doc.text(`Event Date: ${selectedTicket.eventDate}`, margin + 10, margin + 60);
    doc.text(`Status: ${selectedTicket.availableCount > 0 ? 'Available' : 'Sold'}`, margin + 10, margin + 70);
  
    // Generate QR Code
    const ticketDetails = `Ticket Title: ${selectedTicket.title}\nPurchaser: ${purchaser}\nPrice: $${selectedTicket.price}\nEvent Date: ${selectedTicket.eventDate}\nStatus: ${selectedTicket.availableCount > 0 ? 'Available' : 'Sold'}`;
    
    // Create QR code
    const qrCodeDataUrl = await QRCode.toDataURL(ticketDetails);
  
    // Add the QR code to the PDF (Position it in the bottom right corner)
    doc.addImage(qrCodeDataUrl, 'PNG', margin + 90, margin + 10, 80, 80); // x, y, width, height
  
    // Optional: Add a footer with "Terms & Conditions" or event info
    doc.setFontSize(8);
    doc.text('Terms and Conditions apply. Event subject to availability.', margin + 10, margin + ticketHeight - 10);
  
    // Save the PDF with a dynamic filename
    doc.save(`${selectedTicket.title}_ticket.pdf`);
  };
  

  const handlePurchase = async () => {
    if (!purchaser.trim()) {
      setError('Please enter your name.');
      return;
    }

    try {
      await buyTicket(selectedTicket._id, purchaser);
      setSuccess('Ticket purchased successfully!');
      setPurchaser('');
      setSelectedTicket(null); // Clear selected ticket after purchase

      // Generate PDF after purchase
      generatePDF();
    } catch (error) {
      setError('Error purchasing ticket. Please try again.');
    }
  };

  return (
    <div className="page-container">
      <h1>Buy Tickets</h1>

      {tickets.length > 0 ? (
        <div className="tickets-info">
          {tickets.map((ticket) => (
            <button
              key={ticket._id}
              className="ticket-info-button"
              onClick={() => handleTicketSelection(ticket)}
            >
              {ticket.title} - Available: {ticket.availableCount}
            </button>
          ))}
        </div>
      ) : (
        <p>No available tickets at the moment.</p>
      )}

      {/* Ticket Details Form */}
      {selectedTicket && (
        <div className="ticket-details-form">
          <h2>Ticket Details</h2>
          <form>
            <div>
              <label>Title:</label>
              <input
                type="text"
                value={selectedTicket.title}
                disabled
              />
            </div>
            <div>
              <label>Price:</label>
              <input
                type="text"
                value={`$${selectedTicket.price}`}
                disabled
              />
            </div>
            <div>
              <label>Available:</label>
              <input
                type="text"
                value={selectedTicket.availableCount}
                disabled
              />
            </div>
            <div>
              <label>Your Name:</label>
              <input
                type="text"
                value={purchaser}
                onChange={(e) => setPurchaser(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            {error && <p className="error-text">{error}</p>}
            {success && <p className="success-text">{success}</p>}
            <button type="button" onClick={handlePurchase}>Buy Ticket</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default BuyTicketPage;
