<script setup>
import ErrorMessageCard from "@/components/Cards/ErrorMessageCard.vue";
import InputField from "@/components/Forms/InputField.vue";
import InputLabel from "@/components/Forms/InputLabel.vue";
import InputError from "@/components/Forms/InputError.vue";
import FormButton from "@/components/Forms/FormButton.vue";
import { useRouter } from "vue-router";
import { computed, reactive } from "vue";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const userCredential = reactive({
  username: null,
  email: null,
  password: null,
  confirmPassword: null,
});

const createUserErrorMessage = computed(
  () => store.state.authentication.authErrorMessage
);

const handleRegister = async () => {
  const response = await store.dispatch("createUser", {
    username: userCredential.username,
    email: userCredential.email,
    password: userCredential.password,
    confirmPassword: userCredential.confirmPassword,
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
            Create an account
          </h1>

          <ErrorMessageCard :message="createUserErrorMessage" />

          <form @submit.prevent="handleRegister" class="space-y-4 md:space-y-6">
            <div>
              <InputLabel name="Username" :required="true" />

              <InputField
                type="text"
                name="name"
                placeholder="Enter your full name"
                v-model="userCredential.username"
              />

              <InputError message="error" />
            </div>

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

            <div>
              <InputLabel name="Confirm password" :required="true" />

              <InputField
                type="password"
                name="confirm-password"
                placeholder="••••••••"
                v-model="userCredential.confirmPassword"
              />

              <InputError message="error" />
            </div>

            <FormButton name="Create an account" />

            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?
              <router-link
                :to="{ name: 'login' }"
                class="text-blue-600 hover:underline dark:text-blue-500 font-bold"
              >
                Login here
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