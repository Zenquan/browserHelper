import Vue from "vue";
import App from "./App";

import {
  Field,
  Button
} from 'vant'

import 'highlight.js/styles/atom-one-dark.css'

Vue.use(Field);
Vue.use(Button);

/* eslint-disable no-new */
new Vue({
  el: "#app",

  render: h => h(App)
});