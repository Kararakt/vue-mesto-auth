import { Commit } from 'vuex/types/index.js';

import { Owner } from '../../models/models';
import { getUserInfo, editUserAvatar, editUserProfile } from '../../utils/api';
import { getContent } from '../../utils/auth';

interface State {
  loggedIn: boolean;
  user: Partial<Owner>;
}

interface UserContent {
  _id: string;
  email: string;
}

interface Data {
  data: UserContent;
}

const state: State = {
  loggedIn: false,
  user: {},
};

const getters = {};

const actions = {
  login({ commit }: { commit: Commit }) {
    commit('setLoggedIn', true);
  },

  logout({ commit }: { commit: Commit }) {
    commit('setLoggedIn', false);
    localStorage.removeItem('jwt');
  },

  async getUser({ commit }: { commit: Commit }) {
    getUserInfo()
      .then((user) => {
        commit('setUser', user);
      })
      .catch((err) => {
        console.error('Ошибка получения данных пользователя', err);
      });
  },

  async getUserContent({ commit }: { commit: Commit }) {
    getContent()
      .then((data: Data) => {
        const { email } = data.data;

        commit('setUser', { email });
      })
      .catch((err) => {
        console.error('Ошибка получения данных пользователя', err);
      });
  },

  async updateAvatar(
    { commit }: { commit: Commit },
    { user, callback }: { user: Owner; callback: () => void }
  ) {
    editUserAvatar(user.avatar)
      .then((res) => {
        commit('setUser', res);
        callback();
      })
      .catch((err) => {
        console.error('Ошибка обновления аватара', err);
      });
  },

  async updateUser(
    { commit }: { commit: Commit },
    { user, callback }: { user: Owner; callback: () => void }
  ) {
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
  setLoggedIn(state: State, status: boolean) {
    state.loggedIn = status;
  },

  setUser(state: State, user: Owner) {
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
