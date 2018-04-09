// Import the basic Vue module.
import Vue from 'vue'

// Import plugins.
import Resource from 'vue-resource'
import VDragged from 'v-dragged'
import DeviceDetector from 'vue-device-detector'
import MultilangStore from 'vue-multilang-store'
import EdiableView from './plugins/EditableView'

// Other stuff
import * as langs from './enums/Languages'
import * as keys from './enums/LabelKeys'
import labels from './data/Labels'

// Register the plugins.
Vue.use(Resource)
Vue.use(VDragged)
Vue.use(DeviceDetector)
Vue.use(EdiableView)
Vue.use(MultilangStore, {
  languageList: langs,
  defaultLanguage: langs.DE,
  labels: labels,
  labelKeys: keys
})

// Import global components
import App from './App'
import VueToggle from 'vue-toggle'
import VueYoutube from 'vue-youtube'
import VeeValidate from 'vee-validate'

Vue.use(VueYoutube)
Vue.use(VeeValidate)

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
  el: '#app',
  template: '<App/>',
  components: { App },
  http: {
    // TODO
  }
})
