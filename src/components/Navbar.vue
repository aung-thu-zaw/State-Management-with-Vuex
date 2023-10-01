<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

const handleLogout = async () => {
  const response = await store.dispatch("signOutOfFirebase");

  if (response) return router.push({ name: "home" });
  else return false;
};
</script>

<template>
  <nav class="flex items-center justify-center space-x-5 mb-8">
    <router-link :to="{ name: 'events' }" class="font-semibold text-md">
      Events
    </router-link>
    <span>|</span>
    <router-link :to="{ name: 'my-account' }" class="font-semibold text-md">
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
</template>

<style scoped>
a.router-link-active {
  color: rgb(13, 143, 13);
  text-decoration: underline;
}
</style>