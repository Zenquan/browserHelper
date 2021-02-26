import Vue from "vue";
import App from "./App";
import axios from "axios";

import { Toast } from 'vant';
import 'vant/lib/toast/style';
Vue.use(Toast);

import VueClipboard from "vue-clipboard2";
Vue.use(VueClipboard);

Vue.prototype.$axios = axios;
/* eslint-disable no-new */
new Vue({
  el: "#app",

  render: h => h(App)
});