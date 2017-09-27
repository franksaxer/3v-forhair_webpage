/* Properties */

// Password properties object.
const password_props = {
    server: {
        passwordFilePath: '/../password',
        saltRounds: 10,
        encoding: 'utf8'
    },
    
    script: {
        passwordFilePath: './password',
        saltRounds: 10,
        encoding: 'utf8'
    }
}


// Define what will be exported.
module.exports = function (caller) {
    // The properties differ between the web-server and the script to set the password..
    return password_props[caller]
}
