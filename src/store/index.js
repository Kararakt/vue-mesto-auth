import { createStore } from 'vuex';

import user from './modules/user';
import cards from './modules/cards';

export default createStore({
  modules: {
    user,
    cards,
  },
});
