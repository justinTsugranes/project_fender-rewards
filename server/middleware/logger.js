const { format } = require('date-fns')
const { v4: uuid } = require('uuid')
const fs = require('fs')
const fsPromises = fs.promises
const path = require('path')

const logEvents = async (message, logFileName) => {
  const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss')
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`

  try {
    if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
      await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
    }
    await fsPromises.appendFile(
      path.join(__dirname, '..', 'logs', logFileName),
      logItem,
    )
  } catch (err) {
    console.error(`Failed to write log: ${err.message}`)
    throw err // re-throw the error after logging it
  }
}

const logger = async (req, res, next) => {
  try {
    await logEvents(`${req.method}\t${req.url}\t${req.ip}`, 'reqLog.log')
    console.log(`${req.method} ${req.path}`)
    next()
  } catch (err) {
    console.error(`Logger middleware error: ${err.message}`)
    // Handle the error as you see fit - you might want to send a response with a 500 status code, or just call next(err) to pass the error to your error handling middleware (if any)
    next(err)
  }
}

module.exports = { logEvents, logger }
