// Import the data manager and the data store entries enumeration.
import { loadDataObject } from '../data/DataManager'

// Inmport the edit window component.
import EditWindow from './EditWindow'
import Vue from 'vue'

// The mixin for subpage components.
export default {
  data () {
    return {
      dataKey: null, // Have to be replaced by the parent component.
      data: {} // Placeholder for the content data object.
    }
  },

  methods: {
    editText (object, prop) {
      // Root where to add the DOM element,
      const root = document.getElementById('app')

      // Create a new instance of the component.
      const Component = Vue.extend(EditWindow)
      const instance = new Component({
        propsData: { content: object[prop] }
      })

      // Fetch changes to the model property.
      instance.$on('change', value => {
        object[prop] = value
      })

      // Fetch destroy event.
      instance.$on('destroy', () => {
        // Destroy the Vue instance and remove the DOM element.
        instance.$destroy()
        root.removeChild(instance.$el)
      })

      // Mount and insert the instance to the DOM.
      instance.$mount()
      root.appendChild(instance.$el)
    }
  },

  async created () {
    this.data = await loadDataObject(this.dataKey)
  }
}
