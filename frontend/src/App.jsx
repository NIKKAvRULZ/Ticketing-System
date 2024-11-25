import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddTicketPage from './pages/AddTicketPage';
import BuyTicketPage from './pages/BuyTicketPage';
import ViewTicketsPage from './pages/ViewTicketsPage';
import SearchTicketsPage from './pages/SearchTicketsPage';

const App = () => {
  return (
    <Router>
      <nav style={{ padding: '10px', backgroundColor: '#f0f0f0', marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '10px' }}>Add Tickets</Link>
        <Link to="/buy" style={{ marginRight: '10px' }}>Buy Tickets</Link>
        <Link to="/view" style={{ marginRight: '10px' }}>View Tickets</Link>
        <Link to="/search" style={{ marginRight: '10px' }}>Search Tickets</Link>
      </nav>

      <div>
        <Routes>
          <Route path="/" element={<AddTicketPage />} />
          <Route path="/buy" element={<BuyTicketPage />} />
          <Route path="/view" element={<ViewTicketsPage />} />
          <Route path="/search" element={<SearchTicketsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
