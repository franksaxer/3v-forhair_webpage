// Import all necessary modules
const readline = require('readline') // To read the users input.
const bcrypt = require('bcrypt') // To encrypt the password.
const fs = require('fs'); // To store the enrypred password.

// Paramater & Variables
const saltRounds = 15  // Define how much rounds the password will be hashed. As higher as more safe, but also as longer.
const passwordLocation = './src/password'


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
    return bcrypt.hashSync(plainPassword, saltRounds, (err) => {
        console.log('Something went wrong while try to hash the password.')
        process.exit(1)
    })
}


// Store encrypted password.
async function storePassword (encryptedPassword) {
    console.log('Save password...')
   
    // Delete old password to avoid problems with unequal length password hashed.
    fs.unlink(passwordLocation, (err) => { /* Ignore */ })
        
    // Store new password.
    fs.writeFileSync(passwordLocation, encryptedPassword, (err) => {    
        console.log('Something went wrong while try to store the password!')
        process.exit(1)
    })
}

