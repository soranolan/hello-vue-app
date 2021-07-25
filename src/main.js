import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import axios from "axios";
import VueAxios from "vue-axios";
import moment from "moment";
import i18n from "./i18n";

axios.defaults.baseURL = "http://localhost:8080/api/v1.0.0/todolist";

createApp(App)
  .use(i18n)
  .use(router)
  .use(store)
  .use(ElementPlus, axios, VueAxios, moment)
  .mount("#app");
