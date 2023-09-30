import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import Register from "@/views/auth/Register.vue";
import Login from "@/views/auth/Login.vue";
import ResetPassword from "@/views/auth/ResetPassword.vue";
import Index from "@/views/events/Index.vue";
import Create from "@/views/events/Create.vue";
import Edit from "@/views/events/Edit.vue";
import { getCurrentUser } from "vuefire";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      async beforeEnter(to, from, next) {
        const user = await getCurrentUser();

        if (!user) next();
        else next({ name: "events" });
      },
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      async beforeEnter(to, from, next) {
        const user = await getCurrentUser();

        if (!user) next();
        else next({ name: "events" });
      },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      async beforeEnter(to, from, next) {
        const user = await getCurrentUser();

        if (!user) next();
        else next({ name: "events" });
      },
    },
    {
      path: "/reset-password",
      name: "reset-password",
      component: ResetPassword,
      async beforeEnter(to, from, next) {
        const user = await getCurrentUser();

        if (!user) next();
        else next({ name: "events" });
      },
    },
    {
      path: "/events",
      name: "events",
      component: Index,
      async beforeEnter(to, from, next) {
        const user = await getCurrentUser();

        if (!user) next({ name: "login" });
        else next();
      },
    },
    {
      path: "/events/create",
      name: "add-event",
      component: Create,
      async beforeEnter(to, from, next) {
        const user = await getCurrentUser();

        if (!user) next({ name: "login" });
        else next();
      },
    },
    {
      path: "/events/:id/edit",
      name: "edit-event",
      component: Edit,
      props: true,
      async beforeEnter(to, from, next) {
        const user = await getCurrentUser();

        if (!user) next({ name: "login" });
        else next();
      },
    },
  ],
});

export default router;
