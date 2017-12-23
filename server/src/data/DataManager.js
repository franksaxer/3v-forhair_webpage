const DataStoreEntries = require(__dirname + '/json/core/DataStoreEntries.json')

/**
 * Check if a given key fits to a known entry in the dataset.
 *
 * @param  key
 *         The entry that should be checked if it exist.
 *
 * @return true - if it exist
 *              - else
 */
const checkEntry = function (key) {
  // Go other all entries in the JSON object and compare the key.
  let entry

  for (let i in DataStoreEntries) {
    entry = DataStoreEntries[i]

    // Check if the key fits.
    if (entry.key === key) {
      return true
    }
  }

  // Entry with this key could not been found.
  return false
}

module.exports.checkEntry = checkEntry

/**
 * Get an entry of the data store by its key.
 *
 * @param key
 *        The key of the entry that should been returned.
 *
 * @return  entry
 *          The associated entry in the stored.
 *          Can be NULL if the key does not exist.
 */
const getEntry = function (key) {
  // Do not use the checkEntry() function cause it would lead to a double for-loop.

  // Iterate over all entries till find the correct one.
  let entry

  for (let i in DataStoreEntries) {
    entry = DataStoreEntries[i]

    // Check if it is the wanted entry.
    if (entry.key === key) {
      return entry
    }
  }

  // No entry fcould been found.
  return null
}

module.exports.getEntry = getEntry

/**
 * Get the absolute path of a dataset by its relative path from the data store entry.
 *
 * @param   relativePath
 *          The relative path of the entry.
 *
 * @return  absolutePath
 *          The path to the dataset within the clients source directory.
 */
const absolutePath_data = function(relativePath) {
  return (__dirname + '/../../../client/src/data/' + relativePath)
}

module.exports.absolutePath_data = absolutePath_data

/**
 * Get the absolute path of a media file by its relative path defined by the client.
 *
 * @param   relativePath
 *          The relative path by the client.
 *
 * @return  absolutePath
 *          The path to the mediafile within the clients source directory.
 */
const absolutePath_media = function(relativePath) {
  return (__dirname + '/../../../client/src/assets/' + relativePath)
}

module.exports.absolutePath_media = absolutePath_media
