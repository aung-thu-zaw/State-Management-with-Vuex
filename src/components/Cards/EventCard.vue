<template>
  <div
    class="bg-white border border-slate-300 p-5 rounded-sm cursor-pointer hover:shadow-md hover:bg-gray-50 transition-all"
  >
    <p class="text-xs font-medium text-center text-gray-500">
      @12:00 Pm on January 28, 2023
    </p>
    <h1 class="my-5 font-bold text-lg text-center text-gray-700">
      Community Gardening
    </h1>
    <div class="text-xs space-x-3 flex items-center justify-end">
      <router-link
        :to="{ name: 'edit-event', params: { id: 1 } }"
        class="text-gray-500 hover:text-blue-600"
      >
        <i class="fa-solid fa-edit"></i>
      </router-link>

      <span class="text-gray-500 hover:text-red-600">
        <i class="fa-solid fa-trash-can"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>