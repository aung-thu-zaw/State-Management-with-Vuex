<script setup>
import Navbar from "@/components/Navbar.vue";
import UpdateProfile from "./partials/UpdateProfile.vue";
import UpdatePassword from "./partials/UpdatePassword.vue";
import DeleteAccount from "./partials/DeleteAccount.vue";
</script>

<template>
  <div class="container mx-auto min-h-screen p-10">
    <Navbar />

    <div class="w-2/3 mx-auto border shadow p-8 rounded-md">
      <div class="w-full flex flex-col items-center justify-between space-y-5">
        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
          alt="avatar"
          class="w-24 h-24 object-cover ring-2 ring-blue-200 rounded-full"
        />

        <h1 class="text-lg font-bold text-gray-700">Aung Kyaw Kyaw</h1>
      </div>

      <UpdateProfile />

      <hr />

      <UpdatePassword />

      <hr />

      <DeleteAccount />
    </div>
  </div>
</template>