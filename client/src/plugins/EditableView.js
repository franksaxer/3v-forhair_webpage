// Import the edit window component.
import EditWindow from './EditWindow'

// The plugin itself.
const EditableView = {
  install: function (Vue, options) {
    // Define a communication bus for the editable view.
    window.editableViewBus = new Vue()

    // Global variable to mark if the page is editable or not.
    Vue.prototype.$editable = false

    /**
     * Function that allows to en- or disable the editable view.
     */
    Vue.prototype.$setEditable = function (enable = true) {
      Vue.prototype.$editable = enable
      window.editableViewBus.$emit('setEditable', enable)
    }

    /**
     * A wrapper component used to hide editable components within.
     * It provides a slot, which can be filled with anything.
     * The whole content will be not shown, if the editable view is not enabled.
     */
    Vue.component('editable', {
      // Simple template with the if statement and the slot.
      template: '<div v-if="enabled"><slot></slot></div>',

      data: function () {
        return {
          enabled: false // Per default ediable content should not been visible.
        }
      },

      // Catch the event to show the slots content.
      created () {
        window.editableViewBus.$on('setEditable', enable => { this.enabled = enable })
      }
    })

    Vue.directive('editable', {
      bind (el) {
        el.className += ' editable-element'
      }
    })

    Vue.mixin({
      methods: {
        stringToList (text) {
          // Make working on a string object.
          if (typeof text !== 'string') {
            throw new Error('Can only split strings into lists! (is ' + typeof text + ')')
          }

          // Split the string by the newline character.
          return text.split('\n')
        },

        editText (object, prop) {
          if (Vue.prototype.$editable) {
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
        }
      }
    })
  }
}

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(EditableView)
}

// Define exports.
export default EditableView
