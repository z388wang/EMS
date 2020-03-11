import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedIn: false,
    selectedLuggage: {
      name: "",
      ID: ""
    }
  },
  getters: {
    selectedLuggage: state => state.selectedLuggage,
    isLoggedIn: state => state.loggedIn
  },
  mutations: {
    setLuggage(state, luggage) {
      state.selectedLuggage = luggage;
    },
    login(state) {
      state.loggedIn = true;
    },
    logout(state) {
      state.loggedIn = false;
    }
  },
  actions: {}
});
