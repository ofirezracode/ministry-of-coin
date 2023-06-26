import { createRouter, createWebHashHistory } from "vue-router";
import Login from "../views/Login.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/home",
      name: "home",
      component: () => import("../views/Home.vue"),
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("../views/Contacts.vue"),
    },
    {
      path: "/contact/:id",
      name: "contact details",
      component: () => import("../views/ContactDetails.vue"),
    },
    {
      path: "/contact/edit/:id",
      name: "contact edit",
      component: () => import("../views/ContactEdit.vue"),
    },
    {
      path: "/stats",
      name: "stats",
      component: () => import("../views/Statistics.vue"),
    },
  ],
});

export default router;
