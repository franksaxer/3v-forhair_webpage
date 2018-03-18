/* Require all necessary modules */
const fs = require('fs')

// Configurations
const log_prop = require(__dirname + '/config/log_prop.js');

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

// Define the export.
module.exports = {
  initLogging: initLogging
}
