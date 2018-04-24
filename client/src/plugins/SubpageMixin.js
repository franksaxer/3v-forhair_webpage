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

  methods: {
    /**
     * The basic save function for subpages without any special data properties.
     * Will be overwritten by those who need to handle such properties.
     */
    save () {
      this.finalSave()
    }
  },

  async created () {
    this.data = await loadDataObject(this.dataKey)
  }
}
