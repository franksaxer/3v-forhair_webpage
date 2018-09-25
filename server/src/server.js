/* Import all necessary modules. */
// 3rd Party
const koa = require('koa') // General Koa package the server base on.
const http = require('http') // To recieve and send HTTP messages.
const https = require('https') // For TLS encryption.
const sslify = require('koa-sslify') // Force HTTPS connections.
const serve = require('koa-static') // To deliver static content.i
const logger_bunyan = require('koa-bunyan-logger') // To logg connections and other content.
const bodyParser = require('koa-body') // To read the requests bodies.
const cors = require('@koa/cors') // To allow cross origin requests in the development mode.

// Own
const utils = require(__dirname + '/utils.js')
const logger = require(__dirname + '/logger.js')
const authRouter = require(__dirname + '/router/authentication.js')
const editorRouter = require(__dirname + '/router/editor.js')
const mailRouter = require(__dirname + '/router/mail.js')
const authView = require(__dirname + '/middleware/adminView.js')
const sessionCheck = require(__dirname + '/middleware/sessionCheck.js')
const catchNotFound = require(__dirname + '/middleware/catchNotFound.js')

/* Initiate Modules */
// Create the Koa application.
const app = new koa()

/* Load Configurations */
// Have to be load after the app initiation, cause else the environment is not defined.
const general_prop = require(__dirname + '/config/general_prop.js')(app.env)
const ssl_prop = require(__dirname + '/config/ssl_prop.js')

/* Add Middleware */
// The order of the different middle ware compontents is absolutely important!

if (app.env === 'development') {
  console.log('Enable COR for development usage.')
  app.use(cors())
}

// Add logger for the connections.
utils.initLogging()
app.use(logger_bunyan(logger.logger))
app.use(logger_bunyan.requestLogger(logger.logger))

// Force HTTPS connections.
utils.initSSL(app.env)
app.use(sslify(ssl_prop.options_sslify(app.env)))

// Parse the request body.
app.use(
  bodyParser({
    formidable: { uploadDir: '/tmp/' },
    multipart: true
    // The rest is fine as default.
  })
)

// Rewrite for the admin view.
app.use(authView)

// Check API connections for the session key.
app.use(sessionCheck)

// Catch resource not found exceptions to redirect.
app.use(catchNotFound)

// Provide the client content.
app.use(serve(__dirname + general_prop.clientPath))

// Add the routers.
app.use(authRouter.routes())
app.use(editorRouter.routes())
app.use(mailRouter.routes())

/* Start Server */
http.createServer(app.callback()).listen(general_prop.port_http)
const msg_http =
  'HTTP server has started and is listening on port ' + general_prop.port_http
logger.logger.info(msg_http)
console.log(msg_http)

https
  .createServer(ssl_prop.options_https(), app.callback())
  .listen(general_prop.port_https)
const msg_https =
  'HTTPS server has started and is listening on port ' + general_prop.port_https
logger.logger.info(msg_https)
console.log(msg_https)
