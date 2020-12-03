import Vue from 'vue';
import Vuex from 'vuex';
import * as Action from './types/actions-types';

Vue.use(Vuex);

const APP_NAME = 'SmartCinema';

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    token: null,
    role: '',
    username: null,
    userId: null
  },
  mutations: {
    [Action.STORE_TOKEN](state, token) {
      state.token = token;

      if (token) {
        window.localStorage.setItem(`${APP_NAME}_token`, token);
      } else {
        window.localStorage.removeItem(`${APP_NAME}_token`);
      }
    },
    [Action.SET_AUTH_STATE](state, authState) {
      state.isAuthenticated = authState;
    },
    [Action.SET_ROLE](state, role) {
      state.role = role;

      if (role) {
        window.localStorage.setItem(`${APP_NAME}_role`, role);
      } else {
        window.localStorage.removeItem(`${APP_NAME}_role`);
      }
    },
    [Action.SET_USERNAME](state, username) {
      state.username = username;

      if (username) {
        window.localStorage.setItem(`${APP_NAME}_username`, username);
      } else {
        window.localStorage.removeItem(`${APP_NAME}_username`);
      }
    },
    [Action.SET_USERID](state, userId) {
      state.userId = userId;

      if (userId) {
        window.localStorage.setItem(`${APP_NAME}_userId`, userId);
      } else {
        window.localStorage.removeItem(`${APP_NAME}_userId`);
      }
    }
  },
  actions: {
    [Action.READ_TOKEN]({ commit }) {
      const token = window.localStorage.getItem(`${APP_NAME}_token`);
      if (token) {
        commit(Action.STORE_TOKEN, token);
        commit(Action.SET_AUTH_STATE, true);
      }
    },

    [Action.READ_USER]({ commit }) {
      const username = window.localStorage.getItem(`${APP_NAME}_username`);
      const role = window.localStorage.getItem(`${APP_NAME}_role`);
      const userId = window.localStorage.getItem(`${APP_NAME}_userId`);
      if (username) {
        commit(Action.SET_USERNAME, username);
      }
      if (role) {
        commit(Action.SET_ROLE, role);
      }
      if (userId) {
        commit(Action.SET_USERID, userId);
      }
    },

    [Action.LOGIN]({ commit }, { token, authState }) {
      commit(Action.STORE_TOKEN, token);
      commit(Action.SET_AUTH_STATE, authState);
    },

    [Action.LOGOUT]({ commit }) {
      commit(Action.STORE_TOKEN, null);
      commit(Action.SET_AUTH_STATE, false);
      commit(Action.SET_USERNAME, null);
      commit(Action.SET_USERID, null);
      commit(Action.SET_ROLE, null);
    },

    [Action.SET_USER]({ commit }, { username, role, userId }) {
      commit(Action.SET_USERID, userId);
      commit(Action.SET_USERNAME, username);
      commit(Action.SET_ROLE, role);
    }
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated
  },
  modules: {}
});
