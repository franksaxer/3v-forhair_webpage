// Import the basic Vue module.
import Vue from 'vue'

// Import plugins.
import Resource from 'vue-resource'
import VDragged from 'v-dragged'
import DeviceDetector from 'vue-device-detector'
import MultilangStore from 'vue-multilang-store'

// Other stuff
import * as langs from './enums/Languages'
import * as keys from './enums/LabelKeys'
import labels from './data/Labels'

// Register the plugins.
Vue.use(Resource)
Vue.use(VDragged)
Vue.use(DeviceDetector)
Vue.use(MultilangStore, {
  languageList: langs,
  defaultLanguage: langs.EN,
  labels: labels,
  labelKeys: keys
})

// Import global components
import App from './App'
import VueToggle from 'vue-toggle'

// Register the components.
Vue.component('vue-toggle', VueToggle)

// Configurations.
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  http: {
    // TODO
  }
})
