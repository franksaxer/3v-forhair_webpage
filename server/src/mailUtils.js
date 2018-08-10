/* Require all necessary modules */
// 3rd Party
const nodemailer = require('nodemailer')

// Own
const mail_prop = require(__dirname + '/config/mail_prop.js')
const logger = require(__dirname + '/logger.js').logger

/* Create Transporter */
const transporter = nodemailer.createTransport(mail_prop)
transporter.verify(err => {
  if (err) {
    const msg = 'Verification of the mail transporter failed!'
    logger.info(msg)
    logger.info(err)
    console.log(msg)
  }
})

/* Properties */
const address =
  mail_prop.auth.user +
  '@' +
  mail_prop.host.substring(mail_prop.host.indexOf('.') + 1)

const message = {
  from: address,
  to: address,
  subject: 'Feedback from Webpage'
}

/* Interface */
const sendMail = async content => {
  try {
    message.text = content
    await transporter.sendMail(message)
    logger.info('Mail send.')
  } catch (err) {
    logger.info(
      'Something went wrong on sending a mail trough the transporter!'
    )
    logger.info(err)
  }
}

// Define what to export.
module.exports = {
  sendMail: sendMail
}
