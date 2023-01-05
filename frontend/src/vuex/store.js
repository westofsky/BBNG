import { createStore } from 'vuex';
import Users from './modules/user';
const store = createStore ({
  modules : {
    Users,
  }
  
});

export default store;