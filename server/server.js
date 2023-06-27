const express = require('express') // Import the express module
const cors = require('cors') // Import the cors module
const mongoose = require('mongoose') // Import the mongoose module
const swaggerJsDoc = require('swagger-jsdoc') // Import the swagger-jsdoc module
const swaggerUi = require('swagger-ui-express') // Import the swagger-ui-express module
const swaggerOptions = require('./swagger/swaggerOptions') // Import Swagger options
const fs = require('fs') // Import the fs module
const customCss = fs.readFileSync(
  process.cwd() + '/swagger/swagger.css',
  'utf8',
) // Read the swagger.css file

// Import the dbConfig file
require('dotenv').config({ path: './config/.env' }) // Load environment variables from the .env file
const dbConfig = require('./config/dbConfig') // Import the dbConfig file

// Create a new Express application instance
const app = express()

// Middleware
app.use(cors()) // Enable all CORS requests
app.use(express.json()) // Parse JSON requests
app.use(express.urlencoded({ extended: true })) // Parse URL-encoded requests

// Import routes
const UserRoutes = require('./routes/user.routes') // Import the UserRoutes module

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJsDoc(swaggerOptions)

// Use routes
app.use('/api/users', UserRoutes) // Mount the UserRoutes at the '/api/users' path
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: err.message })
})
// Serve swagger docs
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
  }) // Connect to MongoDB using the provided options
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error))

// Specify the port using PORT from dbConfig.js
const port = dbConfig.PORT || 5000

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
