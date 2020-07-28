import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      adminOnly: false,
    },
  },
  {
    path: "/login",
    name: "LogIn",
    component: () => import("../views/Login"),
    meta: {
      adminOnly: false,
    },
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../views/Admin"),
    meta: {
      adminOnly: true,
    },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.adminOnly)) {
    let user = store.getters.getUser;
    if (user) next();
    else next({ name: "Home" });
  } else {
    next();
  }
});

export default router;
