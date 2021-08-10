import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import axios from "./conf/axiosConfig";
import VueAxios from "vue-axios";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import i18n from "./i18n";

momentDurationFormatSetup(moment);

createApp(App)
  .use(i18n)
  .use(router)
  .use(store)
  .use(ElementPlus, axios, VueAxios, moment)
  .mount("#app");
