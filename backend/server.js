require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Routes
const ticketRoutes = require('./routes/ticketRoutes');
const userRoutes = require('./routes/userRoutes');
const logRoutes = require('./routes/logRoutes');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// API Routes
app.use('/api/tickets', ticketRoutes);
app.use('/api/users', userRoutes);
app.use('/api/logs', logRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
