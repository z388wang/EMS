import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/list",
    name: "List",
    meta: {
      requiresAuth: true
    },
    component: () => import("../views/List.vue")
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      removeAfterLogin: true
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue")
  },
  {
    path: "/map",
    name: "Map",
    meta: {
      requiresAuth: true
    },
    component: () => import("../views/Map.vue")
  },
  {
    path: "*",
    redirect: "/list"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.isLoggedIn) {
      next("login");
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.removeAfterLogin)) {
    if (store.getters.isLoggedIn) {
      next("list");
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
