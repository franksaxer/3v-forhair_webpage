/* Import JSON Files */
import DataStoreEntries from './json/core/DataStoreEntries.json'

/**
 * Local store where to put in already loaded data objects for faster future access.
 */
const DATA_STORE = {}

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

  // No entry could been found.
  return false
}

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

/**
 * Function to load a entry object.
 * Checks if the entry object is known or not. In case it is not, NULL will be returned.
 * Load the object from the internal store, if it has been already loaded earlier.
 *
 * @param   key
 *          Based on the DataStoreEntries, used to define which object should be load.
 *
 * @return  The required key object.
 */
const loadDataObject = function (key) {
  // Check if it is a valid key of the store object.
  if (!checkEntry(key)) {
    return null
  }

  // Load JSON if not stored internally from an earlier call.
  if (!DATA_STORE[key]) {
    // Load the entry and afterwards the associated JSON file.
    const entry = getEntry(key)
    const json = require('/' + entry.path)

    // Work on the json to make it useable.
    for (let i in json) {
      // Check if the property is an URL, related to the 'assets' folder.
      if (json[i].substring(0, 3) === 'Url') {
        // Load the source by the relative URL.
        json[i] = require('../assets/' + json[i].substring(4))
      }
    }

    // Put the JSON into the store.
    DATA_STORE[key] = json
  }

  // Return the key object.
  return DATA_STORE[key]
}

// Define what should be exported.
export {loadDataObject, DataStoreEntries}
