/* Load all necessary modules */
const sessionManager = require(__dirname + '/../SessionManager.js')

// The URLs to the APIs and the authentication API.
const API_BASE_URL = '/api'
const AUTH_API_BASE_URL = '/api/authentication'

/**
 * Middleware function to check the session key when access API.
 * @param   ctx
 *          The context object from Koa.
 * @param   next
 *          Function to forward to the next middleware.
 */
const checkSession = async function (ctx, next) {
  // Check if the requested URL is the admin view.
  if (ctx.request.url.startsWith(API_BASE_URL) && !ctx.request.url.startsWith(AUTH_API_BASE_URL)) {
    // Get the provided session key.
    const sessionKey = await ctx.request.body.sessionKey

    // Check if a session key is provided.
    if (!sessionKey) {
      ctx.status = 401
      ctx.body = 'Session key missing!'
      // Do not forward to other middleware.
    }

    // Check if the session key is valid.
    else if (!await sessionManager.checkSessionKey(sessionKey)) {
      ctx.status = 401
      ctx.body = 'Invalid session key!'
      // Do not forward to other middleware.
    }
  } else {
      // Go to the other middleware.
      await next()

      // Do nothing on the way back.
  }

}

// Define what to export.
module.exports = checkSession