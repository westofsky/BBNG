import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import Users from './modules/user';
const store = createStore ({
  modules : {
    Users,
  },
  plugins: [
    createPersistedState({
      paths: ['Users'],
    })
  ]
});

export default store;