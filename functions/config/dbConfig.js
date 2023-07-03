// const mongoose = require('mongoose')
// require('dotenv').config()
// const colors = require('colors')

// const PORT = process.env.PORT || 5000
// const MONGODB_URI = process.env.MONGODB_URI

// let connection

// const connectDB = async () => {
//   try {
//     const uri = MONGODB_URI
//     mongoose.set('strictQuery', false)
//     await mongoose.connect(uri)
//     connection = mongoose.connection
//     connection.once('open', () => {
//       console.log(
//         colors.cyan.underline(
//           `MongoDB connection established: ${connection.host}`,
//         ),
//       )
//     })
//   } catch (error) {
//     console.log(error)
//     process.exit(1)
//   }
// }

// module.exports = {
//   connectDB,
//   connection,
//   PORT,
// }

const mongoose = require('mongoose')
require('dotenv').config()
const colors = require('colors')

const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI

const connectDB = async () => {
  try {
    const uri = MONGODB_URI
    mongoose.set('strictQuery', false)
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    mongoose.connection.once('open', () => {
      console.log(
        colors.cyan.underline(
          `MongoDB connection established: ${mongoose.connection.host}`,
        ),
      )
    })
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = {
  connectDB,
  mongoose,
  PORT,
}
