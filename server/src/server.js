/* Import all necessary modules. */
// 3rd Party
const koa = require('koa') // General Koa package the server base on.
const http = require('http') // To recieve and send HTTP messages.
const serve = require('koa-static') // To deliver static content.i
const logger_bunyan = require('koa-bunyan-logger') // To logg connections and other content.


// Own
const logger = require(__dirname + '/logger.js')


/* Initiate Modules */
// Create the Koa application.
const app = new koa()


/* Load Configurations */
// Have to be load after the app initiation, cause else the environment is not defined.
const general_prop  = require(__dirname + '/config/general_prop.js')(app.env)


/* Add Middleware */
// The order of the different middle ware compontents is absolutely important!

// Add logger for the connections.
app.use(logger_bunyan(logger.logger))
app.use(logger_bunyan.requestLogger(logger.logger))



// Provide the client content.
app.use(serve(__dirname + general_prop.clientPath))


/* Start Server */
http.createServer(app.callback()).listen(general_prop.port)
logger.logger.info('Server has started and is listening on port %d', general_prop.port)
