import Vue from 'vue';
import App from "./App";

import { 
  Image as VanImage,
  Button,
  Lazyload,
  Loading,
  Uploader
} from 'vant';

Vue.use(VanImage);
Vue.use(Button);
Vue.use(Lazyload);
Vue.use(Loading);
Vue.use(Uploader);

import VueClipboard from "vue-clipboard2";
Vue.use(VueClipboard);

new Vue({
  el: "#app",

  render: h => h(App)
});