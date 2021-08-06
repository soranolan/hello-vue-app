import axios from "axios";
import router from "../router";
import store from "../store";
import i18n from "../i18n";
import { ElMessage } from "element-plus";

axios.defaults.baseURL = "http://localhost:8080/api/v1.0.0/todolist";

axios.interceptors.request.use(
  (request) => {
    const token = store.state.token;
    const auth = token ? `Bearer ${token}` : "";
    request.headers.common["Authorization"] = auth;
    return request;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      ElMessage.error(i18n.global.t("message.unauthorized_401"));
      router.push("F01001");
      store.commit("setActiveUri", "/F01001");
      store.commit("setToken", "");
    }
    return error;
  }
);

export default axios;
