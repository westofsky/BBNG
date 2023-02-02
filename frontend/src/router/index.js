import { createWebHistory, createRouter, routerKey } from "vue-router";
import Home from "../views/Home.vue";
import Lobby from "../views/Lobby.vue";
import Game from "../views/Game.vue";
import test from "../views/test.vue";
import store from "../vuex/store";
import * as sock_const from "../../../common/constant/socket-constants.js";

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
  {
    path: "/Game",
    name: "Game",
    component: Game,
    beforeEnter : requireAuth(),
  },
  {
    path: "/test",
    name: "test",
    component: test,
    beforeEnter : requireAuth(),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

sock_const.initSocketConstants();

export default router;