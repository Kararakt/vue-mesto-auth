import { Commit } from 'vuex/types/index.js';
import user from './user';

import {
  getInitialCards,
  deleteCard,
  changeLikeCardStatus,
  addCard,
} from '../../utils/api';
import { CardData } from '../../models/models';

interface RootState {
  user: typeof user.state;
}

interface State {
  cards: CardData[];
}

const state: State = {
  cards: [],
};

const getters = {};

const actions = {
  async getCards({ commit }: { commit: Commit }) {
    getInitialCards()
      .then((cards) => {
        commit('setCards', cards);
      })
      .catch((err) => {
        console.error('Ошибка получения данных карточек', err);
      });
  },

  async deleteCard(
    { commit, state }: { commit: Commit; state: State },
    { cardId, callback }: { cardId: string; callback: () => void }
  ) {
    deleteCard(cardId)
      .then(() => {
        const updatedCards = state.cards.filter((card) => card._id !== cardId);
        commit('setCards', updatedCards);
        callback();
      })
      .catch((err) => {
        console.error('Ошибка удаление карточки', err);
      });
  },

  async likeCard(
    {
      state,
      rootState,
      commit,
    }: { state: State; rootState: RootState; commit: Commit },
    card: CardData
  ) {
    const isLiked = card.likes.some((i) => i._id === rootState.user.user?._id);

    changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = state.cards.map((c) =>
          c._id === card._id ? newCard : c
        );
        commit('setCards', newCards);
      })
      .catch((err) => {
        console.error('Ошибка постановки лайка', err);
      });
  },

  async addCard(
    { state, commit }: { state: State; commit: Commit },
    { card, callback }: { card: CardData; callback: () => void }
  ) {
    addCard(card.name, card.link)
      .then((newCard) => {
        commit('setCards', [newCard, ...state.cards]);
        callback();
      })
      .catch((err) => {
        console.error('Ошибка добавления новой карточки', err);
      });
  },
};

const mutations = {
  setCards(state: State, cards: CardData[]) {
    state.cards = cards;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
