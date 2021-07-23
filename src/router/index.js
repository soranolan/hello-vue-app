import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/F02001",
    name: "About",
    component: () => import("../views/F02001.vue"),
  },
  {
    path: "/F03001",
    name: "ApiMenu",
    component: () => import("../views/F03001.vue"),
  },
  {
    path: "/F01001",
    name: "Signin",
    component: () => import("../views/F01001.vue"),
  },
  {
    path: "/F01002",
    name: "Signup",
    component: () => import("../views/F01002.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
