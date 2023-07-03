const fs = require('fs')

const customCss = fs.readFileSync(
  process.cwd() + '/swagger/swagger.css',
  'utf8',
)

module.exports = { customCss }
