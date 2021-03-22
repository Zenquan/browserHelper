import Vue from 'vue'
import mavonEditor from 'mavon-editor'
import App from './App.vue'
import 'mavon-editor/dist/css/index.css'

Vue.use(mavonEditor)
new Vue({
  'el': '#main',
  data() {
    return {
      value: ''
    }
  },
  render: h => h(App)
})