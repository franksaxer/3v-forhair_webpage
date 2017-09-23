/* Import all necessary modules. */
// External
const koa       = require('koa') // General Koa package the server base on.
const http      = require('http') // To recieve and send HTTP messages.
const serve     = require('koa-static') // To deliver static content.


/* Load Configurations */
const general_prop  = require(__dirname + '/config/general_prop.js')


/* Initiate Modules */
// Create the Koa application.
const app = new koa()


/* Add Middleware */
// Provide the client content.
app.use(serve(__dirname + general_prop.clientPath))


/* Start Server */
http.createServer(app.callback()).listen(general_prop.port)

