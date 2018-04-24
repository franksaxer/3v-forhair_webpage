// Import from the data manager and api connector.
import { loadDataObject, convertNewData } from '../data/DataManager'
import ApiConnector from '../ApiConnector'

// The mixin for subpage components.
export default {
  data () {
    return {
      dataKey: null, // Have to be replaced by the parent component.
      data: {} // Placeholder for the content data object.
    }
  },

  methods: {
    /**
     * The basic save function for subpages without any special data properties.
     * Will be overwritten by those who need to handle such properties.
     */
    async save () {
      const data = await convertNewData(this.dataKey, JSON.parse(JSON.stringify(this.data)))

      try {
        await ApiConnector.update(this.dataKey, data)
      } catch (err) {
        // TODO: Show the error to the user.
        console.log('Message: ' + err.message)
      }

      // Call to build the client on backend.
      this.finalBuild()
    }
  },

  async created () {
    this.data = await loadDataObject(this.dataKey)
  }
}
