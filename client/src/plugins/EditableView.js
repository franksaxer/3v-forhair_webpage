// The plugin itself.
const EditableView = {
  install: function (Vue, options) {
    /* Mixin */

    Vue.mixin({
      computed: {
        editableViewEnabled () {
          return false
        }
      }
    })

    /* Directory */

    Vue.directive('editable', {
      bind (el, binding, vnode) {
        // for (let i in vnode.data) {
          // console.log(i + ' ' + vnode.data[i])
        // }
        vnode.data.class = {'test': true}
        console.log(vnode.data.class)
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
