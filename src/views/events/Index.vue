<script setup>
import EventCard from "@/components/EventCard.vue";
import { useStore } from "vuex";
import { useCurrentUser } from "vuefire";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const user = useCurrentUser();

const handleLogout = async () => {
  const response = await store.dispatch("signOutOfFirebase");

  if (response) return router.push({ name: "home" });
  else return false;
};
</script>

<template>
  <div class="container mx-auto min-h-screen p-10">
    <nav class="flex items-center justify-center space-x-5">
      <router-link :to="{ name: 'events' }" class="font-semibold text-md">
        Events
      </router-link>
      <span>|</span>
      <router-link :to="{ name: 'add-event' }" class="font-semibold text-md">
        My Account
      </router-link>
      <span>|</span>
      <button
        type="button"
        @click="handleLogout"
        class="font-semibold text-md hover:text-blue-700"
      >
        Logout
      </button>
    </nav>
    {{ user }}
    <div class="my-10 space-y-3">
      <h1 class="text-lg font-semibold text-yellow-400 w-full text-center">
        Hello 👋, {{ user?.displayName }}!
      </h1>

      <div class="text-sm font-semibold text-gray-600 w-full text-center">
        <i class="fa-solid fa-arrow-down animate-bounce text-blue-600"></i>
        <span class="mx-2"> Here your's events</span>
        <i class="fa-solid fa-arrow-down animate-bounce text-blue-600"></i>
      </div>
    </div>

    <div class="my-5 flex items-center justify-end">
      <router-link
        :to="{ name: 'add-event' }"
        class="font-semibold text-xs px-3 py-2.5 rounded-sm bg-blue-600 text-white hover:bg-blue-700"
      >
        <i class="fa-solid fa-plus"></i>
        Create New Event
      </router-link>
    </div>

    <!-- Event Card Section-->
    <section class="grid grid-cols-4 gap-3">
      <EventCard />
    </section>
  </div>
</template>


<style scoped>
a.router-link-active {
  color: rgb(13, 143, 13);
  text-decoration: underline;
}
</style>