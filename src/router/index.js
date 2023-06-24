import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("../views/Contacts.vue"),
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
      path: "/stats",
      name: "stats",
      component: () => import("../views/Statistics.vue"),
    },
  ],
});

export default router;
