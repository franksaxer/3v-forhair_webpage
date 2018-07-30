/* Load all necessary modules */
// 3rd party
const router = require('koa-router') // The parent object for the router.
const fs = require('fs') // To write data to files.

// Own
const mailUtils = require(__dirname + '/../mailUtils.js')
const logger = require(__dirname + '/../logger.js').logger // To log.
const RequestParameterKeys = require(__dirname +
  '/../data/json/core/RequestParamaterKeys.json')
const routeNames = require(__dirname + '/../constants/routeNames.js')

/* Initialize the router */
const mailRouter = new router()
mailRouter.prefix(routeNames.MAIL.BASE)

/* Define the methods */
mailRouter.post(routeNames.MAIL.SEND, async ctx => {
  // Build the message content by its parameters.
  let content = ''

  for (let i in RequestParameterKeys.mail) {
    let value = ctx.request.body[RequestParameterKeys.mail[i]]
    console.log(i + ' : ' + value)
    value = value ? value : ''
    content += i.charAt(0).toUpperCase() + i.slice(1) + ':\t' + value + '\n'
  }

  // Send the mail with the given parameters.
  try {
    await mailUtils.sendMail(content)
  } catch (err) {
    logger.info('Something went wrong while sending the mail!')
    logger.info(err)

    // Send feedback that the server has failed.
    ctx.status = 500
  }

  // Send feedback that everything went fine.
  ctx.status = 200
})

// Define what should be exported.
module.exports = mailRouter
