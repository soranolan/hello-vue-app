import { createStore } from "vuex";
import { ref } from "vue";

export default createStore({
  state: {
    activeUri: ref("/"),
    token: "",
  },
  mutations: {
    setActiveUri(state, uri) {
      state.activeUri = ref(uri);
    },
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {},
  modules: {},
});
