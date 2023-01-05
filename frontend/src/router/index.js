import { createWebHistory, createRouter, routerKey } from "vue-router";
import Home from "../views/Home.vue";
import Lobby from "../views/Lobby.vue";
import store from "../vuex/store";

const requireAuth = () => (to, from, next) =>{
  if(store.getters["Users/getUser_oid"]){
    return next();
  }
	else{
    alert('잘못된 접근입니다. 로그인 해주세요');
    next('/');
  }
}
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/lobby",
    name: "Lobby",
    component: Lobby,
    beforeEnter : requireAuth(),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;