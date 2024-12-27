import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
import HomeView from "@/views/HomeView.vue";
import ServicesView from "@/views/ServicesView.vue";
import UserView from "@/views/UserView.vue";
import AdminView from "@/views/AdminView.vue";
import ProductsView from "@/views/ProductsView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/products",
    name: "products",
    component: ProductsView,
  },
  {
    path: "/services",
    name: "services",
    component: ServicesView,
  },
  {
    path: "/users",
    name: "users",
    component: UserView,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminView,
    meta: { requiresAuth: true, requiresRole: "admin" },
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiresRole = to.matched.some((record) => record.meta.requiresRole);
  const user = store.getters["authentication/getUser"];

  if (requiresAuth && !user) {
    next("/");
  } else if (requiresRole && user?.role !== to.meta.requiresRole) {
    next("/");
  } else {
    next();
  }
});

export default router;
