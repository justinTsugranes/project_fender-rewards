const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables from .env file
dotenv.config();

// Create a new Express application instance
const app = express();

// Middleware
app.use(cors()); // Enable all CORS requests
app.use(express.json()); // Parse incoming JSON bodies

// Import routes
const userRoutes = require('./routes/users');
const transactionRoutes = require('./routes/transactions');
const pointsRoutes = require('./routes/points');

// Use routes
app.use('/users', userRoutes);
app.use('/transactions', transactionRoutes);
app.use('/points', pointsRoutes); // Use the points router for points-related routes

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB successfully.'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Specify the port
const port = process.env.PORT || 5000;

// Start the server and listen on the specified port
app.listen(port, () => console.log(`Server is running on port: ${port}`));
