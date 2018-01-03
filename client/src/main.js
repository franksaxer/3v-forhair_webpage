// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// Import modules
import Vue from 'vue'
import Resource from 'vue-resource'
import VDragged from 'v-dragged'

Vue.use(Resource)
Vue.use(VDragged)

// Import components
import App from './App'
import VueToggle from 'vue-toggle'

// Register components globally.
Vue.component('vue-toggle', VueToggle)

// Configurations.
Vue.config.productionTip = false
Vue.use(Resource)
Vue.use(VDragged)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  http: {
    // TODO
  }
})
