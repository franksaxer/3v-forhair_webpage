/* Properties */

// Environment independent properties.
const clientPath = '/../client'
const sessionTimeout = 1800000 // 30min
const securityTimeout = 5000 // 5s

// Overall properties object.
const props = {
    development: {
        port_http: 8080,
	    port_https: 8081,
	    clientPath: clientPath,
        sessionTimeout: sessionTimeout,
        securityTimeout: securityTimeout
    },
    production: {
        port_http: 80,
	    port_https: 443,
        clientPath: clientPath,
        sessionTimeout: sessionTimeout,
        securityTimeout: securityTimeout
    }
}


// Define what will be exported.
module.exports = function (env) {
    return props[env]
}
