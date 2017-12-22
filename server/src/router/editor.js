/* Load all necessary modules */
// 3rd party
const router = require('koa-router') // The parent object for the router.
const fs = require('fs') // To write data to files.

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
editorRouter.post('/updateConfig', async ctx => {
  console.log('Update');
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
    const path = DataManager.absolutePath(entry.path)

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


// Define what should be exported.
module.exports = editorRouter
