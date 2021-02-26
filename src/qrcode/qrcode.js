import Vue from "vue";
import App from "./App";

import {
  Field,
  Button
} from 'vant'

import 'vant/lib/index.css';
import 'vant/lib/button/style';

Vue.use(Field);
Vue.use(Button)

/* eslint-disable no-new */
new Vue({
  el: "#app",

  render: h => h(App)
});