import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import Register from "@/views/auth/Register.vue";
import Login from "@/views/auth/Login.vue";
import Index from "@/views/events/Index.vue";
import Create from "@/views/events/Create.vue";
import Edit from "@/views/events/Edit.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/events",
      name: "events",
      component: Index,
    },
    {
      path: "/events/create",
      name: "add-event",
      component: Create,
    },
    {
      path: "/events/:id/edit",
      name: "edit-event",
      component: Edit,
      props: true,
    },
  ],
});

export default router;
