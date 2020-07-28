// src/store.js
import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const getDefaultState = () => {
  return {
    token: "",
    user: null,
    isSuperuser: false,
    articles: [],
    latestUpdate: 1,
  };
};

export default new Vuex.Store({
  strict: true,
  plugins: [createPersistedState()],
  state: getDefaultState(),
  getters: {
    isLoggedIn: (state) => {
      return state.token;
    },
    getUser: (state) => {
      return state.user;
    },
    getArticles: (state) => {
      return state.articles;
    },
    getLatestUpdate: (state) => state.latestUpdate,
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
    SET_ARTICLES: (state, articles) => {
      state.articles = articles;
    },
    SET_UPDATE: (state, date) => (state.latestUpdate = date),
    RESET: (state) => {
      console.log("Resetting");
      Object.assign(state, getDefaultState());
      console.log("Resetted");
    },
  },
  actions: {
    login: ({ commit }, { token, user }) => {
      commit("SET_TOKEN", token);
      commit("SET_USER", user);

      // set auth header
      Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    },
    logout: ({ commit }) => {
      commit("RESET", "");
    },
    articles: ({ commit }, { articles }) => {
      commit("SET_ARTICLES", articles);
    },
    updates: ({ commit }, { date }) => {
      commit("SET_UPDATE", date);
    },
  },
});
