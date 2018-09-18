/* Load all necessary modules */
// 3rd party
const router = require('koa-router') // The parent object for the router.
const fs = require('fs') // To read the stored password.
const bcrypt = require('bcrypt') // To compare the passwords.
const logger = require(__dirname + '/../logger.js') // To log.

// Own
const sessionManager = require(__dirname + '/../SessionManager.js')
const password_prop = require(__dirname + '/../config/password_prop.js')(
  'server'
)
const dataManager = require(__dirname + '/../data/DataManager.js')
const routeNames = require(__dirname + '/../constants/routeNames.js')

/* Initialize the router */
const authRouter = new router()
authRouter.prefix(routeNames.AUTH.BASE)

/* Define the methods */

/**
 * The login method for administrators.
 * Connection has to be secure -> 400
 * Password has to be provided -> 400
 * A session has to be available -> 403
 * The password must be correct -> 401
 */
authRouter.post(routeNames.AUTH.LOGIN, async ctx => {
  const password = await ctx.request.body.password

  if (!ctx.secure) {
    ctx.status = 400
    ctx.body = 'Unsafe request! API only available with HTTPS.'
  } else if (!password) {
    ctx.status = 400
    ctx.body = 'Missing Password!'
  } else if (!(await sessionManager.sessionAvailable())) {
    ctx.status = 403
    ctx.body = 'No session available!'
  } else {
    try {
      if (await checkPassword(password)) {
        ctx.status = 200
        ctx.body = await sessionManager.openSession()
      } else {
        ctx.status = 401
        ctx.body = 'Wrong password!'
      }
    } catch (err) {
      // Report the user a problem.
      ctx.status = 500
      ctx.body =
        'Cause of an internal server error, the authentication is not possible.'
    }
  }
})

/**
 * The function to check if a session key is still valid.
 * Response is in the body as Boolean.
 */
authRouter.post(routeNames.AUTH.CHECK, async ctx => {
  const sessionKey = await ctx.request.body.sessionKey

  // Check if the provided session key is still active.
  ctx.body = await sessionManager.checkSessionKey(sessionKey)
  ctx.status = 200
})

/**
 * The logout method to clear the session.
 * The provided session key has to be valid -> 401
 * An invalid session key force a delay.
 */
authRouter.post(routeNames.AUTH.LOGOUT, async ctx => {
  const sessionKey = await ctx.request.body.sessionKey

  // Check if the provided session key is valid.
  if (await sessionManager.checkSessionKey(sessionKey)) {
    // Clear the session.
    sessionManager.clearSession()
    ctx.status = 200
  } else {
    // Invalid session key.
    ctx.status = 401
    ctx.body = 'Invalid session key.'
  }
})

async function checkPassword(password) {
  try {
    // Read the stored password first.
    const hash = await readStoredPassword()
    const hashWithOutLineBreak = hash.replace('\n', '')
    // Compare both passwords.
    return bcrypt.compareSync(password, hashWithOutLineBreak)
  } catch (err) {
    // Log the error and forward the error.
    logger.logger.error(
      'The following error occured, while try to compare passwords.'
    )
    logger.logger.error(err)
    throw err
  }
}

async function readStoredPassword() {
  try {
    // Read the stored password.
    return fs.readFileSync(
      __dirname + password_prop.passwordFilePath,
      password_prop.encoding
    )
  } catch (err) {
    // Log the error and forward the error.
    logger.logger.error(
      'The following error occurred, while try to read in the stored password.'
    )
    logger.logger.error(err)
    throw err
  }
}

// Define what should be exported.
module.exports = authRouter
