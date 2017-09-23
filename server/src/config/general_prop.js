/* Properties */

// Environment independent properties.
const clientPath = '/../client'


// Overall properties object.
const props = {
    development: {
        port: 8080,
	clientPath: clientPath
    },
    production: {
        port: 80,
        clientPath: clientPath
    }
}


// Define what will be exported.
module.exports = function (env) {
    return props[env]
}
