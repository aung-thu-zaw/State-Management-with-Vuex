<template>
  <div class="container mx-auto min-h-screen p-10">
    <nav class="flex items-center justify-center space-x-5 mb-20">
      <router-link :to="{ name: 'events' }" class="font-semibold text-md">
        Events
      </router-link>
      <span>|</span>
      <router-link :to="{ name: 'add-event' }" class="font-semibold text-md">
        Create
      </router-link>
    </nav>

    <!-- Event Card Section-->
    <section class="grid grid-cols-4 gap-3">
      <EventCard />
    </section>
  </div>
</template>

<script>
import EventCard from "@/components/EventCard.vue";
export default {
  components: {
    EventCard,
  },
};
</script>

<style scoped>
a.router-link-active {
  color: rgb(13, 143, 13);
  text-decoration: underline;
}
</style>