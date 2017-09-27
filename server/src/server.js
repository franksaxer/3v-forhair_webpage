/* Import all necessary modules. */
// 3rd Party
const koa = require('koa') // General Koa package the server base on.
const http = require('http') // To recieve and send HTTP messages.
const https = require('https') // For TLS encryption.
const sslify = require('koa-sslify') // Force HTTPS connections.
const serve = require('koa-static') // To deliver static content.i
const logger_bunyan = require('koa-bunyan-logger') // To logg connections and other content.


// Own
const logger = require(__dirname + '/logger.js')
const exampleRouter = require(__dirname + '/router/example.js')


/* Initiate Modules */
// Create the Koa application.
const app = new koa()


/* Load Configurations */
// Have to be load after the app initiation, cause else the environment is not defined.
const general_prop = require(__dirname + '/config/general_prop.js')(app.env)
const ssl_prop = require(__dirname + '/config/ssl_prop.js')(app.env)


/* Add Middleware */
// The order of the different middle ware compontents is absolutely important!

// Add logger for the connections.
app.use(logger_bunyan(logger.logger))
app.use(logger_bunyan.requestLogger(logger.logger))

// Force HTTPS connections.
app.use(sslify(ssl_prop.options_sslify))

// Provide the client content.
app.use(serve(__dirname + general_prop.clientPath))

// Add the example route API.
app.use(exampleRouter.routes())


/* Start Server */
http.createServer(app.callback()).listen(general_prop.port_http)
logger.logger.info('HTTP server has started and is listening on port %d', general_prop.port_http)

https.createServer(ssl_prop.options_https, app.callback()).listen(general_prop.port_https)
logger.logger.info('HTTPS server has started and is listening on port %d', general_prop.port_https)
