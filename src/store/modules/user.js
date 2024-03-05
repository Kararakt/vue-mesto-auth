import { getUserInfo, editUserAvatar, editUserProfile } from '../../utils/api';
import { getContent } from '../../utils/auth';

const state = {
  loggedIn: false,
  user: {},
};

const getters = {};

const actions = {
  login({ commit }) {
    commit('setLoggedIn', true);
  },

  logout({ commit }) {
    commit('setLoggedIn', false);
    localStorage.removeItem('jwt');
  },

  async getUser({ commit }) {
    getUserInfo()
      .then((user) => {
        commit('setUser', user);
      })
      .catch((err) => {
        console.error('Ошибка получения данных пользователя', err);
      });
  },

  async getUserContent({ commit }) {
    getContent()
      .then((res) => {
        commit('setUser', res.data);
      })
      .catch((err) => {
        console.error('Ошибка получения данных пользователя', err);
      });
  },

  async updateAvatar({ commit }, { user, callback }) {
    editUserAvatar(user.avatar)
      .then((res) => {
        commit('setUser', res);
        callback();
      })
      .catch((err) => {
        console.error('Ошибка обновления аватара', err);
      });
  },

  async updateUser({ commit }, { user, callback }) {
    editUserProfile(user.name, user.about)
      .then((res) => {
        commit('setUser', res);
        callback();
      })
      .catch((err) => {
        console.error('Ошибка изменения данных пользователя', err);
      });
  },
};

const mutations = {
  setLoggedIn(state, status) {
    state.loggedIn = status;
  },

  setUser(state, user) {
    state.user = { ...state.user, ...user };
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
