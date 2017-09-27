/* Load all necessary modules */
// 3rd party
const router = require('koa-router') // The parent object for the router.
const fs = require('fs') // To read the stored password.
const bcrypt = require('bcrypt') // To compare the passwords.
const logger = require(__dirname + '/../logger.js') // To log.

// Own
const password_prop = require(__dirname + '/../config/password_prop.js')('server')


/* Initialize the router */
var authRouter = new router();
authRouter.prefix('/api/authentication')


/* Define the methods */
authRouter.post('/login', async ctx => {
    const password = await ctx.request.body.password
    
    
    if (!ctx.secure) {
        ctx.status = 400
	ctx.body = 'Unsafe request! API only available with HTTPS.'
    }
    
    else if (!password) {
        ctx.status = 400
	ctx.body = 'Missing Password!'
    }

    else {
        try {
           const auth = await checkPassword(password)
           ctx.body = auth
        }
        
        catch (err) {
            // Report the user a problem.
            ctx.status = 500
            ctx.body = 'Cause of an internal server error, the authentication is not possible.'
        }
    }
})


async function checkPassword (password) {
    try {
	// Read the stored password first.
        const hash = await readStoredPassword()

        // Compare both passwords.
	return bcrypt.compareSync(password, hash)
    }
    
    catch (err) {
        // Log the error and forward the error.
        logger.logger.error('The following error occured, while try to compare passwords.')
        logger.logger.error(err)
        throw err
    }
}

async function readStoredPassword () {
    try {
	// Read the stored password.
        return fs.readFileSync(__dirname + password_prop.passwordFilePath, password_prop.encoding)
    }
    
    catch (err) {
        // Log the error and forward the error.
        logger.logger.error('The following error occured, while try to read in the stored password.')
        logger.logger.error(err)
	throw err
    }
}


// Define what should be exported.
module.exports = authRouter

