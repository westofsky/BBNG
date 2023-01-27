import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import Users from './modules/user';
import Games from './modules/game';
const store = createStore ({
  modules : {
    Users,
    Games,
  },
  plugins: [
    createPersistedState({
      paths: ['Users','Games'],
    })
  ]
});

export default store;