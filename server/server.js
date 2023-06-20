const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

// Load environment variables
dotenv.config()

const app = express()

// Enable all CORS requests
app.use(cors())

// Parse JSON bodies (as sent by API clients)
app.use(express.json())

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

app.listen(port, () => console.log(`Server is running on port: ${port}`))
