/* Load all necessary modules */
// 3rd party
const router = require('koa-router') // The parent object for the router.
const fs = require('fs') // To write data to files.
const exec = require('child_process').execSync // To run shell command to build the client.
  
// Own
const logger = require(__dirname + '/../logger.js').logger // To log.
const DataManager = require(__dirname + '/../data/DataManager.js') // To work with the configuration data files.


/* Initialize the router */
const editorRouter = new router();
editorRouter.prefix('/api/editor')


/* Define the methods */

/**
 * Method to update the configurations of the client.
 * Used to get a key, which data set should been updated.
 * Furthermore it expect an JSON object, used to overwrite the current configuration.
 *
 * 400 -> invalid data key / missing data object / not existing dataset file
 * 500 -> error during writing the dataset
 * 200 -> everything went fine
 */
editorRouter.put('/updateConfig', async ctx => {
  const dataKey = ctx.request.body.dataKey
  const dataObject = ctx.request.body.dataObject

  // Check if the given data key is a valid one.
  if (!DataManager.checkEntry(dataKey)) {
    const message = 'Invalid data key provided: ' + dataKey
    logger.info(message)
    ctx.body = message
    ctx.status = 400
  }

  else if (!dataObject) {
    const message = 'Missing data object!'
    logger.info(message)
    ctx.body = message
    ctx.srctatus = 400
  }

  else {
    // Further checks if the object is well structured are not necessary.
    // This will be handled by the body parser module automatically.

    // Get the data store entry and the absolute path of the dataset to update.
    const entry = DataManager.getEntry(dataKey) 
    const path = DataManager.absolutePath_data(entry.path)

    // Make sure the file already exist.
    // Only existing datasets can be updated.
    if (!fs.existsSync(path)) {
      const message = 'Defined dataset file does not exist. Create new ones is not allowed!'
      logger.info(message)
      ctx.body = message
      ctx.status = 400
    }

    // Overwrite the dataset file.
    else {
      try {
        // Overwrite the dataset with the send object.
        fs.writeFileSync(path, JSON.stringify(dataObject))
        ctx.status = 200
      }

      catch (e) {
        logger.error(e)
        ctx.body = 'The configuration could not been updated due to the following error: ' + JSON.stringify(e)
        ctx.status = 500
      }
    }
  }

})

editorRouter.put('/uploadFile', async ctx => {
  const mediaPath = ctx.request.body.fields.mediaPath
  const mediaFile = ctx.request.body.files.mediaFile

  // Check if necessary parameter exist.
  if (!mediaPath) {
    const message = 'Missing media path!'
    logger.info(message)
    ctx.body = message
    ctx.status = 400
  }

  else if (!mediaFile) {
    const message = 'Missing media file!'
    logger.info(message)
    ctx.body = message
    ctx.status = 400
  }

  else {
    // Get the absolute path and extract the folder where the media file should lie in.
    const path = DataManager.absolutePath_media(mediaPath)
    const folder = path.substring(0, path.lastIndexOf('/'))

    // Check if the parent folder exist.
    if (!fs.existsSync(folder)) {
      const message = 'The media path have to be in an already existing folder!'
      logger.info(message)
      ctx.body = message
      ctx.status = 400
    }

    else {
      // Copy the media file form the temporally folder to the clients source directory.
      try {
        exec('mv '+ mediaFile.path + ' ' + path)
        ctx.status = 200
      } catch (e) {
        logger.error(e)
        ctx.status = 500
      }
    }
  }
})

/**
 * Method to build the client new by its resources.
 * Will be typically called after several changes.
 *
 * 500 -> if the build script throws any error 
 * 200 -> everythign went fine
 */
editorRouter.put('/save', async ctx => {
  // Executes Webpacks build script.
  logger.info('Build client new.')
  
  try {
    const stdo = exec('npm run build', {cwd: __dirname + '/../../../client'})
    ctx.status = 200 
  }

  catch (e) {
    logger.error(e)
    ctx.body = 'The client could not been build new due to the following error: ' + JSON.stringify(e)
    ctx.status = 500
  }
})

// Define what should be exported.
module.exports = editorRouter
