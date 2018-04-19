// Import the data manager and the data store entries enumeration.
import { loadDataObject } from '../data/DataManager'

// The mixin for subpage components.
export default {
  data () {
    return {
      dataKey: null, // Have to be replaced by the parent component.
      data: {} // Placeholder for the content data object.
    }
  },

  async created () {
    this.data = await loadDataObject(this.dataKey)
  }
}
