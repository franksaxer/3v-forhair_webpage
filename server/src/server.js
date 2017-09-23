/* Import all necessary modules. */
// External
const koa       = require('koa') // General Koa package the server base on.
const http      = require('http') // To recieve and send HTTP messages.
const serve     = require('koa-static') // To deliver static content.


/* Initiate Modules */
// Create the Koa application.
const app = new koa()


/* Add Middleware */
// Provide the client content.
app.use(serve(__dirname + '/../client'))


/* Start Server */
http.createServer(app.callback()).listen(8080)

