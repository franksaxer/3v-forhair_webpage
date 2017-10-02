// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// Import modules
import Vue from 'vue'
import Resource from 'vue-resource'

// Import components
import App from './App'

Vue.config.productionTip = false
Vue.use(Resource)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  http: {
    // TODO
  }
})
