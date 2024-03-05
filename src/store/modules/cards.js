import {
  getInitialCards,
  deleteCard,
  changeLikeCardStatus,
  addCard,
} from '../../utils/api';

const state = {
  cards: [],
};

const getters = {};

const actions = {
  async getCards({ commit }) {
    getInitialCards()
      .then((cards) => {
        commit('setCards', cards);
      })
      .catch((err) => {
        console.error('Ошибка получения данных карточек', err);
      });
  },

  async deleteCard({ commit, state }, { cardId, callback }) {
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

  async likeCard({ state, rootState, commit }, card) {
    const isLiked = card.likes.some((i) => i._id === rootState.user.user._id);

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

  async addCard({ state, commit }, { card, callback }) {
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
  setCards(state, cards) {
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
