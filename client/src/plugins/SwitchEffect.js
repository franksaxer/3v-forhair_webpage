const SwitchEffect = {
  install: function (Vue, options) {
    Vue.directive('switchLeftEffect', {
      bind (el, binding, vnode) {
        el.className += ' switch-effect left'
        el.classNameBackup = el.className
        el.className += ' inactive'
      },

      inserted (el, binding, vnode) {
        setTimeout(() => { el.className = el.classNameBackup }, 0)
      }
    })
  }
}

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(SwitchEffect)
}

// Define exports.
export default SwitchEffect
