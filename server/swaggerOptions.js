const swaggerDefinitions = require('./swaggerDef')

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
  apis: ['./routes/*.js'],
  components: swaggerDefinitions,
}

module.exports = swaggerOptions
