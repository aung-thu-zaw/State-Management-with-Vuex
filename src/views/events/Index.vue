<script setup>
import SuccessMessageCard from "@/components/Cards/SuccessMessageCard.vue";
import ErrorMessageCard from "@/components/Cards/ErrorMessageCard.vue";
import EventCard from "@/components/Cards/EventCard.vue";
import Navbar from "@/components/Navbar.vue";
import { useStore } from "vuex";
import { useCurrentUser } from "vuefire";
import { computed } from "vue";

const store = useStore();

const user = useCurrentUser();

const verifyEmailAlertMessage = computed(() =>
  user.value?.emailVerified === false
    ? "Please verify your email address in your email inbox or spam."
    : null
);

const errorMessage = computed(
  () => store.state.authentication.authErrorMessage
);
</script>

<template>
  <SuccessMessageCard :message="verifyEmailAlertMessage" />
  <ErrorMessageCard :message="errorMessage" />
  <div class="container mx-auto min-h-screen p-10">
    <Navbar />

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
