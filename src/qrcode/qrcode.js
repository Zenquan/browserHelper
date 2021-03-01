import Vue from "vue";
import App from "./App";

import {
  Field,
  Button
} from 'vant'

Vue.use(Field);
Vue.use(Button);

/* eslint-disable no-new */
new Vue({
  el: "#app",

  render: h => h(App)
});