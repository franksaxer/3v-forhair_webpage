/* Import Enums */
import {DataStoreEnum, checkEntry} from '../enums/DataStoreEnum'

/* Import JSON Files */
import JsonContact from './json/ContactData.json'

/**
 * Local store where to put in already loaded data objects for faster future access.
 */
const DATA_STORE = {}

/**
 * Function to load a data object.
 * Checks if the data object is known or not. In case it is not, NULL will be returned.
 * Load the object from the internal store, if it has been already loaded earlier.
 * @param   data
 *          Based on the DataStoreEnum, used to define which object should be load.
 * @return  The required data object.
 */
const loadDataObject = function (data) {
  // Check if it is a valid data store object.
  if (!checkEntry(data)) {
    return null
  }

  // Load JSON if not stored internally from an earlier call.
  if (!DATA_STORE.data) {
    let json = null

    switch (data) {
      case DataStoreEnum.contact:
        json = JsonContact
        break

      default:
        json = null
    }

    DATA_STORE.data = json
  }

  // Return the data object.
  return DATA_STORE.data
}

// Define what should be exported.
export default {
  loadData: loadDataObject
}