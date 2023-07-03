const { connectDB, mongoose } = require('../config')

// Middleware for DB Connection
const checkDbConnection = async (req, res, next) => {
  try {
    if (!mongoose.connections[0].readyState) {
      await connectDB()
    }
    next()
  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports = { checkDbConnection }
