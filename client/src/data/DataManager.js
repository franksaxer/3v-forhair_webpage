import DataStoreEntries from './json/core/DataStoreEntries.json' // The entries that can be loaded.
import * as RouteNames from '../enums/RouteNames' // Route names to replace references.

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
const checkEntry = key => {
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
const getEntry = key => {
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
const extendJson = async json => {
  for (let i in json) {
    const entry = json[i]

    if (typeof entry === 'object') {
      try {
        json[i] = await extendJson(entry)
      } catch (err) {
        // Fall back: Leave it as it is.
        console.log(err)
      }
    }

    if (typeof entry === 'string') {
      // Check if the property is an URL, related to the 'assets' folder.
      if (entry.substring(0, 3) === 'Url') {
        // Load the source by the relative URL.
        json[i] = require('../assets/' + entry.substring(4))
      } else if (entry.substring(0, 9) === 'Component') {
        // Replace with Vue component object.
        json[i] = require('../components/' + entry.substring(10) + '.vue')
      } else if (entry.substring(0, 5) === 'Route') {
        // Replace with route name.
        json[i] = RouteNames[entry.substring(6)]
      }
    }
  }

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
const loadDataObject = async key => {
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

  // Return the key object as deep copy.
  return JSON.parse(JSON.stringify(DATA_STORE[key]))
}

/**
 * Function that converts back a data object to the original format.
 * This is requirede, cause the original description has some special properties defined.
 * The components does use a converted format with image objects as example.
 * Such properties has to be converted back to the special format.
 *
 * @param   key
 *          The key of the original data store entry.
 *
 * @param   data
 *          The new data object that should be converted back.
 *
 * @param   original
 *          The original data object as reference.
 *          Is optional and null per default.
 *          By using the given the key, it will be loaded on first call.
 */
const convertNewData = async (key, data, original = null) => {
  // Load the original json object as reference.
  if (original === null) {
    original = require('/' + getEntry(key).path)
  }

  for (let i in data) {
    const entry = data[i]

    if (typeof entry === 'object') {
      try {
        data[i] = await convertNewData(key, entry, original)
      } catch (err) {
        // Fall back: Leave it as it is.
      }
    } else if (original[i]) {
      if (typeof entry === 'string') {
        // Check if the property any special thing.
        if (
          entry.substring(0, 3) === 'Url' ||
          entry.substring(0, 5) === 'Label' ||
          entry.substring(0, 9) === 'Component' ||
          entry.substring(0, 5) === 'Route'
        ) {
          // Currently changes will be ignored and the original onces will be used instead of the converted ones.
          data[i] = original[i]
        }

        // Nothing to do for normal stuff.
      }
    }
  }

  return data
}

// Define what should be exported.
export { loadDataObject, convertNewData, DataStoreEntries }
