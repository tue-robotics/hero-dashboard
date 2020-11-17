import Vue from 'vue'

import { BButton, BContainer, BCol, BRow, BProgress, BProgressBar } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faBolt, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import App from './App.vue'

Vue.component('b-button', BButton)
Vue.component('b-container', BContainer)
Vue.component('b-col', BCol)
Vue.component('b-row', BRow)
Vue.component('b-progress', BProgress)
Vue.component('b-progress-bar', BProgressBar)

library.add(faBolt)
library.add(faPowerOff)
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  render: h => h(App)
}).$mount('#app')
