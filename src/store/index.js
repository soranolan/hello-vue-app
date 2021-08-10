import { createStore } from "vuex";
import { ref } from "vue";

export default createStore({
  state: {
    activeUri: ref("/"),
    token: "",
    countdown: 900,
    countdowntimer: null,
  },
  mutations: {
    setActiveUri(state, uri) {
      state.activeUri = ref(uri);
    },
    setToken(state, token) {
      state.token = token;
    },
    resetCountdown(state) {
      state.countdown = 900;
    },
    startCountdown(state) {
      state.countdowntimer = setInterval(() => {
        state.countdown -= 1;
        if (!state.countdown) {
          clearInterval(state.countdowntimer);
        }
      }, 1000);
    },
    stopCountdown(state) {
      clearInterval(state.countdowntimer);
    },
  },
  actions: {},
  modules: {},
});
