<template>
  <div
    class="container mx-auto min-h-screen flex flex-col items-center justify-center space-y-10"
  >
    <div class="flex flex-col items-center justify-center">
      <img
        src="../assets/images/event.png"
        alt="event"
        class="h-80 object-cover mb-5"
      />
      <h1 class="font-bold text-5xl text-slate-600">
        Welcome To Vue Event Application
      </h1>
    </div>

    <div class="flex items-center space-x-5">
      <router-link
        :to="{ name: 'register' }"
        class="px-5 py-3 font-semibold text-sm rounded-md shadow-sm bg-blue-600 hover:bg-blue-700 text-white transition-all"
      >
        Register
      </router-link>
      <span class="font-bold text-gray-700 text-md">Or</span>
      <router-link
        :to="{ name: 'register' }"
        class="px-5 py-3 font-semibold text-sm rounded-md shadow-sm bg-slate-600 hover:bg-slate-700 text-white transition-all"
      >
        Login
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style>
</style>