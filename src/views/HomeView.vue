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
        class="px-5 py-3 font-semibold text-sm border-[2px] border-blue-600 text-blue-600 rounded-md shadow-sm hover:bg-blue-600 hover:text-white transition-all"
      >
        Register
      </router-link>
      <router-link
        :to="{ name: 'register' }"
        class="px-5 py-3 font-semibold text-sm border-[2px] border-slate-600 text-slate-600 rounded-md shadow-sm hover:bg-slate-600 hover:text-white transition-all"
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