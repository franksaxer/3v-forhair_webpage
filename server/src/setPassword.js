/* Import all necessary modules */
// 3rd party
const readline = require('readline') // To read the users input.
const bcrypt = require('bcrypt') // To encrypt the password.
const fs = require('fs'); // To store the enrypred password.

// Own
const password_prop = require(__dirname + '/config/password_prop.js')('script')


// Initiate the reader.
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


// Ask for a new password.
rl.question('New Password: ', async function (input) {
    const hash = await encryptPassword(input)
    await storePassword(hash)
    rl.close()
    process.exit(0)
})


// Encrypt new password.
async function encryptPassword (plainPassword) {
    console.log('Encrypting...')
    
    return bcrypt.hashSync(plainPassword, password_prop.saltRounds, (err) => {
        console.log('Something went wrong while try to hash the password.')
        process.exit(1)
    })
}


// Store encrypted password.
async function storePassword (encryptedPassword) {
    console.log('Save password...')
   
    // Delete old password to avoid problems with unequal length password hashed.
    fs.unlink(password_prop.passwordFilePath, (err) => { /* Ignore */ })
        
    // Store new password.
    fs.writeFileSync(password_prop.passwordFilePath, encryptedPassword, {encoding: password_prop.encoding}, (err) => {    
        console.log('Something went wrong while try to store the password!')
        process.exit(1)
    })
}

