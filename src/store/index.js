import { createStore } from "vuex";
import { ref } from "vue";

export default createStore({
  state: {
    activeUri: ref("/"),
  },
  mutations: {
    setActiveUri(state, uri) {
      state.activeUri = ref(uri);
    },
  },
  actions: {},
  modules: {},
});
