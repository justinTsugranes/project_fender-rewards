const { logEvents } = require('./logger')
const mongoose = require('mongoose')

// Handle MongoDB connection errors
mongoose.connection.on('error', (err) => {
  console.error(err)
  logEvents(
    `${err.name}: ${err.message}\t${err.code}\t${err.hostname}`,
    'mongoErrLog.log',
  )
})

const errorHandler = async (err, req, res, next) => {
  // Log the error before responding
  try {
    await logEvents(
      `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.ip}`,
      'appErrLog.log', // Use a different file to log application errors
    )
  } catch (logErr) {
    console.error(`Failed to write error log: ${logErr.message}`)
  }

  // If the response has already been sent, delegate to the default Express error handler
  if (res.headersSent) {
    return next(err)
  }

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}

module.exports = {
  errorHandler,
}
