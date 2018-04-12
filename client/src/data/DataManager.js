import DataStoreEntries from './json/core/DataStoreEntries.json' // The entries that can be loaded.
import * as LabelKeys from '../enums/LabelKeys' // Label keys to replace references.

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
const checkEntry = (key) => {
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
const getEntry = (key) => {
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
 * Extend a JSON object with special types.
 * Such 'special' types is an URL that have to be required, for example.
 * The method is used recursive.
 *
 * @param {Object} json
 *        The JSON object to extend.
 *
 * @return  {Object} extended json
 *          The extended version of the given JSON object.
 */
const extendJson = async (json) => {
  for (let i in json) {
    const entry = json[i]

    if (typeof entry === 'object') {
      try {
        json[i] = await extendJson(entry)
      } catch (err) {
        // Fall back: Leave it as it is.
        json[i] = entry
      }
    }

    if (typeof entry === 'string') {
      console.log('Test')
      // Check if the property is an URL, related to the 'assets' folder.
      if (entry.substring(0, 3) === 'Url') {
        // Load the source by the relative URL.
        json[i] = require('../assets/' + entry.substring(4))
      } else if (entry.substring(0, 5) === 'Label') {
        // Replace with the label key.
        json[i] = LabelKeys[entry.substring(6)]
      } else if (entry.substring(0, 9) === 'Component') {
        // Replace with Vue component object.
        json[i] = require('../components/' + entry.substring(10) + '.vue')
      }
    }
  }

  console.log(json)
  // Resolve promise with the edited JSON object.
  return json
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
const loadDataObject = async (key) => {
  // Check if it is a valid key of the store object.
  if (!checkEntry(key)) {
    return null
  }

  // Load JSON if not stored internally from an earlier call.
  if (!DATA_STORE[key]) {
    // Load the entry and afterwards the associated JSON file.
    const entry = getEntry(key)
    let json = require('/' + entry.path)

    // Extend special types in the dataset.
    json = await extendJson(json)

    // Put the JSON into the store.
    DATA_STORE[key] = json
  }

  // Return the key object.
  return DATA_STORE[key]
}

// Define what should be exported.
export {loadDataObject, DataStoreEntries}
