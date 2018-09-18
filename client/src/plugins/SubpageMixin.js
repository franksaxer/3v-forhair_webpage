// Import from the data manager and api connector.
import { loadDataObject, convertNewData } from '../data/DataManager'
import ApiConnector from '../ApiConnector'
import * as types from '../enums/ContentTypes'

// The mixin for subpage components.
export default {
  data() {
    return {
      dataKey: null, // Have to be replaced by the parent component.
      data: {}, // Placeholder for the content data object.
      contentTypes: types // Used to adjust content.
    }
  },

  methods: {
    /**
     * The basic save function for subpages without any special data properties.
     * Will be overwritten by those who need to handle such properties.
     */
    async save() {
      // Check if anything has changed or stop here.
      const originData = await loadDataObject(this.dataKey)

      if (this.data === originData) {
        console.log('Nothing changed here for ' + this.dataKey)
        return
      }

      // Convert the modified data for the backend.
      const convertedData = await convertNewData(
        this.dataKey,
        JSON.parse(JSON.stringify(this.data))
      )

      // Update the data on the backend.
      try {
        await ApiConnector.update(this.dataKey, convertedData)
      } catch (err) {
        // TODO: Show the error to the user.
        console.log('Message: ' + err.message)
      }
    }
  },

  async created() {
    this.data = await loadDataObject(this.dataKey)
  }
}
