/* Load all necessary modules */
// 3rd party
const fs = require('fs')

// Own
const general_prop = require(__dirname + '/general_prop.js')


/* Parameter & Variables */
const path_base = '/../certificate'
const path_dev = path_base + '/dev/'
const path_prd = path_base + '/prd/' 
const key_fileName = 'key.pem'
const cert_fileName = 'cert.pem'


// Define the locations for the key and cert for all environments.
const locations = {
  development: {
    key: path_dev + key_fileName,
    cert: path_dev + cert_fileName,
  },

  production: {
    key: path_prd + key_fileName,
    cert: path_prd + cert_fileName,
  }
}


// Load the key and cert from the file system.
function options_https(env) {
  return {
      key: fs.readFileSync(__dirname + locations[env].key),
      cert: fs.readFileSync(__dirname + locations[env].cert)
  }
}


// Define the sslify options to enforce HTTPS.
function options_sslify(env) {
  return {
    port: general_prop(env).port_https
  }
}


// Define what will be exported. 
module.exports = function(env) {
  return {
    options_https: options_https(env),
    options_sslify: options_sslify(env)
  }
}

