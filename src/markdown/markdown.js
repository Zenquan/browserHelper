import Vue from "vue";
import App from "./App";

import {
  Field,
  Button,
  IndexBar, 
  IndexAnchor
} from 'vant'

import 'highlight.js/styles/atom-one-dark.css'

import '@vant/touch-emulator';

import '../styles/index.scss';

Vue.use(Field);
Vue.use(Button);
Vue.use(IndexBar);
Vue.use(IndexAnchor);

/* eslint-disable no-new */
new Vue({
  el: "#app",

  render: h => h(App)
});