// The plugin itself.
const EditableView = {
  install: function (Vue, options) {
    // Define a communication bus for the editable view.
    window.editableViewBus = new Vue()

    /**
     * Function that allows to en- or disable the editable view.
     */
    Vue.prototype.$setEditable = function (enable = true) {
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
  }
}

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(EditableView)
}

// Define exports.
export default EditableView