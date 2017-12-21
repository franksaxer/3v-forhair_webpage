const DataStoreEnum = require(__dirname + '/json/DataStoreEntries.json')

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


module.exports.checkEntry = checkEntry
