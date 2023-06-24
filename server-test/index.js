const express = require('express')
const cors = require('cors')
const app = express()

app.use(
  cors({
    origin: 'http://localhost:3001',
  }),
)

app.use(express.json())

// Import Routes
const { userRoutes } = require('./routes')

app.use('/users', userRoutes)

app.listen(3000, () => console.log('Server listening on port 3000'))
