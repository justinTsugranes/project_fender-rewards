const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const fs = require('fs')
const customCss = fs.readFileSync(process.cwd() + '/swagger.css', 'utf8')

// Import the dbConfig file
require('dotenv').config({ path: './config/.env' })
const dbConfig = require('./config/dbConfig')

// Create a new Express application instance
const app = express()

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fender Rewards API',
      version: '1.0.0',
      description:
        'An example express API for implementing a Fender Rewards program',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: ['./routes/*.js'], // path to the API docs
}

// Middleware
app.use(cors()) // Enable all CORS requests
app.use(express.json()) // parse json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Import routes
const userRoutes = require('./routes/userRoutes')
// const transactionRoutes = require('./routes/transactionRoutes')
// const pointsRoutes = require('./routes/pointsRoutes')

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJsDoc(swaggerOptions)

// Use routes
app.use('/users', userRoutes)
// app.use('/transactions', transactionRoutes)
// app.use('/points', pointsRoutes)
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { customCss }),
)

// Connect to MongoDB using MONGODB_URI from dbConfig.js
mongoose
  .connect(dbConfig.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error))

// Specify the port using PORT from dbConfig.js
const port = dbConfig.PORT || 5000

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
