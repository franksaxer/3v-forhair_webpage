/**
 * Middleware function to redirect to startup if requested resource is unknown.
 * This requires, that this middleware is called right after the static serve plugin.
 */
const catchNotFound = async function(ctx, next) {
  await next()

  if (ctx.status === 404) {
    console.log('Not found page detected')
    ctx.status = 301
    ctx.set('Location', '/')
  }
}

// Define what to export.
module.exports = catchNotFound
