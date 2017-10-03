/* Load all necessary modules */
const sessionManager = require(__dirname + '/../SessionManager.js')

// The URLs to the APIs and the authentication API.
const API_BASE_URL = '/api'
const AUTH_API_BASE_URL = '/api/authentication'

/**
 * Middleware function to rewrite the admin view URL.
 * @param   ctx
 *          The context object from Koa.
 * @param   next
 *          Function to forward to the next middleware.
 */
const checkSession = async function (ctx, next) {
  // Check if the requested URL is the admin view.
  if (ctx.request.url.startsWith(API_BASE_URL)) {
    const sessionKey = await ctx.request.body.sessionKey

    if (!sessionKey) {
      ctx.status = 401
      ctx.body = 'Session key missing!'
    }

    else if (!await sessionManager.checkSessionKey(sessionKey)) {
      ctx.status = 401
      ctx.body = 'Invalid session key!'
    }
  } else {
      // Go to the other middleware.
      await next()

      // Do nothing on the way back.
  }

}

// Define what to export.
module.exports = checkSession