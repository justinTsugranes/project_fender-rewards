const functions = require('firebase-functions')

const express = require('express')
const app = express()
const colors = require('colors')
const { errorHandler, logger, checkDbConnection } = require('./middleware')
const { corsOptions, connection } = require('./config')
// const { connectDB, PORT } = require('./config')
const cors = require('cors')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const { swaggerOptions, swaggerCss } = require('./swagger')
const swaggerSpec = swaggerJsDoc(swaggerOptions)
const path = require('path')
// const port = PORT || 5000
const UserRoutes = require('./routes')
require('./services/dbIndexing')

// Middleware
app.use(logger)
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', UserRoutes)
app.use(checkDbConnection)
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerCss,
  }),
)

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/../client/public')))

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '/../', 'client', 'public', 'index.html'),
    ),
  )
} else {
  app.get('/', (req, res) => res.send('Please set to production'))
}

// Error handling middleware
app.use(errorHandler)

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(colors.red(`Error: ${err.message}`))
  // Close server & exit process
  server.close(async () => {
    await connection.close() // Close the database connection
    process.exit(1)
  })
})

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(colors.red(`Error: ${err.message}`))
  // Close server & exit process
  server.close(async () => {
    await connection.close() // Close the database connection
    process.exit(1)
  })
})

// let server // Declare server variable at top scope

// Async function to start the server after database connection
// async function startServer() {
//   try {
//     await connectDB()
//     server = app.listen(port, () => {
//       // Assign the return value of app.listen to server
//       if (process.env.NODE_ENV !== 'production') {
//         console.log(colors.cyan(`Server started on port ${port}`))
//       }
//     })
//   } catch (err) {
//     console.error(colors.red(`Failed to start the server: ${err.message}`))
//     process.exit(1)
//   }
// }

// startServer()

// export the app as a function
exports.api = functions.https.onRequest(app)
