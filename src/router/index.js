import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/F02001",
    name: "About",
    component: () => import("../views/F02001.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/F03001",
    name: "ApiMenu",
    component: () => import("../views/F03001.vue"),
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/F01001",
    name: "Signin",
    component: () => import("../views/F01001.vue"),
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/F01002",
    name: "Signup",
    component: () => import("../views/F01002.vue"),
    meta: {
      requireAuth: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  let requireAuth = to.matched.some((value) => value.meta.requireAuth);
  let currentUser = localStorage.getItem("currentUser");
  if (requireAuth && (!currentUser || currentUser === {})) {
    next("/F01001");
    return;
  }
  next();
});

export default router;
