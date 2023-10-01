<script setup>
import Navbar from "@/components/Navbar.vue";
import UpdateProfile from "./partials/UpdateProfile.vue";
import UpdatePassword from "./partials/UpdatePassword.vue";
import DeleteAccount from "./partials/DeleteAccount.vue";
import { useCurrentUser } from "vuefire";

const user = useCurrentUser();
</script>

<template>
  <div class="container mx-auto min-h-screen p-10">
    <Navbar />

    <div class="w-2/3 mx-auto border shadow p-8 rounded-md">
      <div class="w-full flex flex-col items-center justify-between space-y-5">
        <img
          :src="user.photoURL"
          alt="avatar"
          class="w-24 h-24 object-cover ring-2 ring-blue-200 rounded-full"
        />

        <h1 class="text-lg font-bold text-gray-700">{{ user.displayName }}</h1>
      </div>

      <UpdateProfile />

      <hr />

      <UpdatePassword />

      <hr />

      <DeleteAccount />
    </div>
  </div>
</template>