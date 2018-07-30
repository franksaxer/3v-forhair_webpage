/* Import all necessary modules */
const routeNames = require(__dirname + '/../constants/routeNames.js')

/**
 * Middleware function to rewrite the admin view URL.
 * @param   ctx
 *          The context object from Koa.
 * @param   next
 *          Function to forward to the next middleware.
 */
const rewriteUrl = async function(ctx, next) {
  // Check if the requested URL is the admin view.
  if (ctx.request.url === routeNames.ADMIN) {
    // Rewrite the URL, so the static content could be delivered.
    // Do not redirect, cause the client should believe to get this URL.
    ctx.request.url = '/'
  }

  // Go to the other middleware.
  await next()

  // Do nothing on the way back.
}

// Define what to export.
module.exports = rewriteUrl
