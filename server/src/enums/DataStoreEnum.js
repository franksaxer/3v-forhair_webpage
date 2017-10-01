/**
 * The enumeration object with the keys.
 */
const DataStoreEnum = {
  contact: 'LGBNePt?3@Z%!TfV'
}

/**
 * Check if a given entry exist in the enumeration.
 * @param  data
 *         The entry that should be checked if it exist.
 * @return true - if it exist
 *              - else
 */
const checkEntry = function (data) {
  for (let key in DataStoreEnum) {
    if (DataStoreEnum[key] === data) {
      return true
    }
  }

  return false
}

// Define what should be exported.
export {DataStoreEnum, checkEntry}

// Per default only export the enumeration.
export default DataStoreEnum
