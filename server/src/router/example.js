/* Load all necessary modules */
// 3rd party
var router = require('koa-router');


/* Initialize the router */
var exampleRouter = new router();
exampleRouter.prefix('/api')


/* Define the methods */
exampleRouter.all('/', async ctx => {
    ctx.body = 'example'
})


// Define what should be exported.
module.exports = exampleRouter
