// Import the basic Vue module.
import Vue from 'vue'

// Import plugins.
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VDragged from 'v-dragged'
import VueAnalytics from 'vue-analytics'
import DeviceDetector from 'vue-device-detector'
import MultilangStore from 'vue-multilang-store'
import EdiableView from './plugins/EditableView'
import StaffFilter from './plugins/StaffFilter'

// Import the router configuration
import router from './Router.js'

// Import the language stuff.
import * as langs from './enums/Languages'
import * as keys from './enums/LabelKeys'
import labels from './data/Labels'

// Register the plugins.
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VDragged)
Vue.use(VueYoutube)
Vue.use(VeeValidate)
Vue.use(DeviceDetector)
Vue.use(EdiableView)
Vue.use(StaffFilter)

Vue.use(VueAnalytics, {
  id: 'UA-122713884-1',
  checkDuplicatedScript: true,
  debug: {
    sendHitTask: process.env.NODE_ENV === 'production' // Disable for development.
  }
})

Vue.use(MultilangStore, {
  languageList: langs,
  defaultLanguage: langs.DE,
  labels: labels,
  labelKeys: keys
})

// Import global components
import App from './App'
import VueToggle from 'vue-toggle'
import VueYoutube from 'vue-youtube-embed'
import VeeValidate from 'vee-validate'

VeeValidate.Validator.extend('passphrase', {
  getMessage: field => 'Sorry dude, wrong pass phrase.',
  validate: value => value.toUpperCase() === 'Demogorgon'.toUpperCase()
})

// Register the components.
Vue.component('vue-toggle', VueToggle)

// Configurations.
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  template: '<App/>',
  components: { App },
  http: {
    emulateJSON: true,
    emulateHTTP: true
  }
})
