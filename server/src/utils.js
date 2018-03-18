/* Require all necessary modules */
const fs = require('fs')
const execSync = require('child_process').execSync

// Configurations
const log_prop = require(__dirname + '/config/log_prop.js')
const ssl_prop = require(__dirname + '/config/ssl_prop.js')

/* Properties */
const cmd_generateKey = 'openssl genrsa -out ' + ssl_prop.paths.key + ' 2048'
const cmd_generateCert = 'echo -e "\n\n\n\n\n\n\n" | openssl req -new -x509 -key ' + ssl_prop.paths.key + ' -out ' + ssl_prop.paths.cert + ' -days 3650'
const exec_options = {stdio: 'ignore'}

/**
 * Function which initialize the logging.
 * By this is read in the logging configuration and check if every necessary file system object exist.
 * In case everyhing is already fine, this function does nothing.
 */
const initLogging = () => {
  // Create the folder for all log files, if it does not exit yet.
  if (!fs.existsSync(log_prop.path_dir)) {
    console.log('Initialize the logging directory...')
    fs.mkdirSync(log_prop.path_dir)
  }

  // Iterate over all defined log files and create them if necessary.
  for (let file in log_prop.path_files) {
    const logFile = log_prop.path_files[file]

    // Check if this file already exist.
    if (!fs.existsSync(logFile)) {
      console.log('Create log file for ' + file)
      fs.closeSync(fs.openSync(logFile, 'w'))
    }
  }
}

const initSSL = (env) => {
  // Create the folder where the key and certificate are placed, if necessary.
  if (!fs.existsSync(ssl_prop.paths.base)) {
    console.log('Create directory for SSL key and certificate...')
    fs.mkdirSync(ssl_prop.paths.base)
  }

  // Generate the key, if necessary.
  if (!fs.existsSync(ssl_prop.paths.key)) { 
    // Only available for the development mode.
    if (env !== 'development') {
      console.log('Missing SSL key!')
      process.exit(1)
    }

    try {
      console.log('Generate key')
      execSync(cmd_generateKey, exec_options)
    } catch (err) {
      console.log(err)
      process.exit(1)
    }
  }

  // Generate the certificate, if necessary.
  if (!fs.existsSync(ssl_prop.paths.cert)) { 
    // Only available for the development mode.
    if (env !== 'development') {
      console.log('Missing SSL key!')
      process.exit(1)
    }
    try {
      console.log('Generate certificate')
      const out = execSync(cmd_generateCert, exec_options)
    } catch (err) {
      console.log(err)
      process.exit(1)
    }
  }
}

// Define the export.
module.exports = {
  initLogging: initLogging,
  initSSL: initSSL
}
