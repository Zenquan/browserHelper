import Vue from 'vue'
import App from './App.vue'

import {
  Field,
  Button
} from 'vant'

Vue.use(Field);
Vue.use(Button)

const app = new Vue({
  el: '#app',

  render: h => h(App)
})