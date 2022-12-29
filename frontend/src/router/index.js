import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import Lobby from "../views/Lobby.vue";

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
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;