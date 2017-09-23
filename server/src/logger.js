/* Require all necessary modules */
// 3rd Party
const bunyan = require('bunyan');

// Own
const log_prop = require(__dirname + '/config/log_prop.js');


/* Create logger */
const logger = bunyan.createLogger(log_prop.options_bunyan);


// Define what will be exported.
module.exports = {
        logger: logger
}

