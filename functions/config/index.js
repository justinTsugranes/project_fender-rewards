const {connectDB, connection, PORT} = require("./dbConfig.js");
const {corsOptions} = require("./corsOptions");

module.exports = {
  corsOptions,
  connectDB,
  connection,
  PORT,
};
