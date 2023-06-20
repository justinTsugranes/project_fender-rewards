const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

// Load environment variables from .env file
dotenv.config()

// Create a new Express application instance
const app = express()

// Middleware
// Enable all CORS requests
app.use(cors())
// Parse incoming JSON bodies
app.use(express.json())

// Import routes
const userRoutes = require('./routes/users') // Make sure the file is named 'users.js', not 'user.js'

// Use routes
app.use('/user', userRoutes)

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB successfully.'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err))

// Specify the port
const port = process.env.PORT || 5000

// Start the server and listen on the specified port
app.listen(port, () => console.log(`Server is running on port: ${port}`))
