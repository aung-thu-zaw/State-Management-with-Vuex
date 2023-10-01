<script setup>
import SuccessMessageCard from "@/components/Cards/SuccessMessageCard.vue";
import ErrorMessageCard from "@/components/Cards/ErrorMessageCard.vue";
import FormButton from "@/components/Forms/FormButton.vue";
import InputField from "@/components/Forms/InputField.vue";
import InputLabel from "@/components/Forms/InputLabel.vue";
import InputError from "@/components/Forms/InputError.vue";
import { computed } from "vue";
import { useStore } from "vuex";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";

const store = useStore();

const successMessage = computed(
  () => store.state.authentication.authSuccessMessage
);

const errorMessage = computed(
  () => store.state.authentication.authErrorMessage
);

const validationSchema = yup.object({
  email: yup.string().required().email(),
});

const { handleSubmit, setFieldValue, errors } = useForm({
  validationSchema,
});

const { value: email } = useField("email");

const handleChangeEmail = (event) => {
  setFieldValue("email", event.target.value);
};

const handleUserResetPassword = async () => {
  await store.dispatch("sendPasswordResetEmailToUser", email.value);
};

const submit = handleSubmit(() => handleUserResetPassword());
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

        <SuccessMessageCard :message="successMessage" />
        <ErrorMessageCard :message="errorMessage" />

        <form
          @submit.prevent="submit"
          class="mt-4 space-y-4 lg:mt-5 md:space-y-5"
        >
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

          <div class="flex items-center space-x-5 w-full">
            <div class="w-1/2">
              <FormButton name="Send" />
            </div>
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