/* Require all necessary modules */
const fs = require('fs')

// Mail properties object.
const mail_prop = {
  port: 587,
  host: 'smtp.web.de',
  auth: {
    type: 'login',
    user: '3v-forhair',
    pass: fs.readFileSync(__dirname + '/password', 'utf-8').replace('\n', '')
  },
  pool: true,
  logger: true,
  disableFileAccess: true
}

// Define what will be exported.
module.exports = mail_prop
