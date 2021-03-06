import Vue from "vue";
import App from "./App";
import axios from "axios";

import VueClipboard from "vue-clipboard2";
Vue.use(VueClipboard);

// import '../styles/index.scss';

Vue.prototype.$axios = axios;
/* eslint-disable no-new */
new Vue({
  el: "#app",

  render: h => h(App)
});