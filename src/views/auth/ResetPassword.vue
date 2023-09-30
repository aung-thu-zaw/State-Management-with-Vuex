<script setup>
import SuccessMessageCard from "@/components/SuccessMessageCard.vue";
import ErrorMessageCard from "@/components/ErrorMessageCard.vue";
import { computed, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const email = ref(null);

const resetPasswordSuccessMessage = computed(
  () => store.state.authentication.authSuccessMessage
);

const resetPasswordErrorMessage = computed(
  () => store.state.authentication.authErrorMessage
);

const handleUserResetPassword = async () => {
  await store.dispatch("sendPasswordResetEmailToUser", email.value);
};
</script>

<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div
        class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8"
      >
        <h1
          class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-3"
        >
          Reset Your Password
        </h1>

        <SuccessMessageCard :message="resetPasswordSuccessMessage" />
        <ErrorMessageCard :message="resetPasswordErrorMessage" />

        <form
          @submit.prevent="handleUserResetPassword"
          class="mt-4 space-y-4 lg:mt-5 md:space-y-5"
        >
          <div>
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Your email</label
            >
            <input
              type="email"
              name="email"
              id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="example@gmail.com"
              v-model="email"
            />
          </div>

          <div class="flex items-center space-x-5 w-full">
            <button
              type="submit"
              class="w-1/2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Send
            </button>
            <router-link
              :to="{ name: 'login' }"
              class="text-blue-600 text-sm font-medium w-1/2 border px-5 py-2.5 text-center rounded-lg shadow hover:bg-gray-100"
            >
              Go back to login
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<style>
</style>