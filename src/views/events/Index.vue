<script setup>
import EventCard from "@/components/EventCard.vue";
import { computed } from "vue";
import { useStore } from "vuex";
import { useCurrentUser } from "vuefire";

// const store = useStore();

// const user = computed(() => store.state.authentication.user);

const user = useCurrentUser();
</script>

<template>
  <div class="container mx-auto min-h-screen p-10">
    <nav class="flex items-center justify-center space-x-5">
      <router-link :to="{ name: 'events' }" class="font-semibold text-md">
        Events
      </router-link>
      <span>|</span>
      <router-link :to="{ name: 'add-event' }" class="font-semibold text-md">
        Create
      </router-link>
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