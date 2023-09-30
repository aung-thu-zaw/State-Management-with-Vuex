<script setup>
import ErrorMessageCard from "@/components/Cards/ErrorMessageCard.vue";
import InputField from "@/components/Forms/InputField.vue";
import InputLabel from "@/components/Forms/InputLabel.vue";
import InputError from "@/components/Forms/InputError.vue";
import FormButton from "@/components/Forms/FormButton.vue";
import { computed, reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const userCredential = reactive({
  email: null,
  password: null,
});

const loginErrorMessage = computed(
  () => store.state.authentication.authErrorMessage
);

const handleLogin = async () => {
  const response = await store.dispatch("signInUser", {
    email: userCredential.email,
    password: userCredential.password,
  });

  if (response) return router.push({ name: "events" });
  else return false;
};
</script>

<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Sign in to your account
          </h1>

          <ErrorMessageCard :message="loginErrorMessage" />

          <form @submit.prevent="handleLogin" class="space-y-4 md:space-y-6">
            <div>
              <InputLabel name="Your email" :required="true" />

              <InputField
                type="email"
                name="email"
                placeholder="example@gmail.com"
                v-model="userCredential.email"
              />

              <InputError message="error" />
            </div>

            <div>
              <InputLabel name="Password" :required="true" />

              <InputField
                type="password"
                name="password"
                placeholder="••••••••"
                v-model="userCredential.password"
              />

              <InputError message="error" />
            </div>

            <div class="flex items-center">
              <router-link
                :to="{ name: 'reset-password' }"
                class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Forgot password?
              </router-link>
            </div>

            <FormButton name="Sign In" />

            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?
              <router-link
                :to="{ name: 'register' }"
                class="text-blue-600 hover:underline dark:text-blue-500 font-bold"
              >
                Register here
              </router-link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
  
<style>
</style>