<script setup>
import ErrorMessageCard from "@/components/Cards/ErrorMessageCard.vue";
import SuccessMessageCard from "@/components/Cards/SuccessMessageCard.vue";
import InputField from "@/components/Forms/InputField.vue";
import InputLabel from "@/components/Forms/InputLabel.vue";
import InputError from "@/components/Forms/InputError.vue";
import FormButton from "@/components/Forms/FormButton.vue";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";

const store = useStore();
const router = useRouter();

const errorMessage = computed(
  () => store.state.authentication.authErrorMessage
);

const successMessage = computed(
  () => store.state.authentication.authSuccessMessage
);

const validationSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
});

const { handleSubmit, setFieldValue, errors } = useForm({
  validationSchema,
});

const { value: email } = useField("email");
const { value: password } = useField("password");

const handleChangeEmail = (event) => {
  setFieldValue("email", event.target.value);
};

const handleChangePassword = (event) => {
  setFieldValue("password", event.target.value);
};

const handleLogin = async () => {
  const response = await store.dispatch("signInUser", {
    email: email.value,
    password: password.value,
  });

  if (response) return router.push({ name: "events" });
  else return false;
};

const submit = handleSubmit(() => handleLogin());
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
          <SuccessMessageCard :message="successMessage" />
          <ErrorMessageCard :message="errorMessage" />

          <form @submit.prevent="submit" class="space-y-4 md:space-y-6">
            <div>
              <InputLabel name="Your email" :required="true" />

              <InputField
                type="email"
                name="email"
                placeholder="example@gmail.com"
                :modelValue="email"
                @change="handleChangeEmail"
              />

              <InputError :message="errors?.email" />
            </div>

            <div>
              <InputLabel name="Password" :required="true" />

              <InputField
                type="password"
                name="password"
                placeholder="••••••••"
                :modelValue="password"
                @change="handleChangePassword"
              />

              <InputError :message="errors?.password" />
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