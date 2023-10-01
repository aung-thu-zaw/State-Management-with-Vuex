<script setup>
import ErrorMessageCard from "@/components/Cards/ErrorMessageCard.vue";
import SuccessMessageCard from "@/components/Cards/SuccessMessageCard.vue";
import InputField from "@/components/Forms/InputField.vue";
import InputLabel from "@/components/Forms/InputLabel.vue";
import InputError from "@/components/Forms/InputError.vue";
import FormButton from "@/components/Forms/FormButton.vue";
import { useRouter } from "vue-router";
import { computed } from "vue";
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
  username: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required().min(6),
  confirmPassword: yup
    .string()
    .required()
    .min(6)
    .oneOf([yup.ref("password"), null], "Passwords do not match"),
});

const { handleSubmit, setFieldValue, errors } = useForm({
  validationSchema,
});

const { value: username } = useField("username");
const { value: email } = useField("email");
const { value: password } = useField("password");
const { value: confirmPassword } = useField("confirmPassword");

const handleChangeUserName = (event) => {
  setFieldValue("username", event.target.value);
};

const handleChangeEmail = (event) => {
  setFieldValue("email", event.target.value);
};

const handleChangePassword = (event) => {
  setFieldValue("password", event.target.value);
};

const handleChangeConfirmPassword = (event) => {
  setFieldValue("confirmPassword", event.target.value);
};

const handleRegister = async () => {
  const response = await store.dispatch("createUser", {
    username: username.value,
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
  });

  if (response) return router.push({ name: "events" });
  else return false;
};

const submit = handleSubmit(() => handleRegister());
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
          <SuccessMessageCard :message="successMessage" />
          <ErrorMessageCard :message="errorMessage" />

          <form @submit.prevent="submit" class="space-y-4 md:space-y-6">
            <div>
              <InputLabel name="Username" :required="true" />

              <InputField
                type="text"
                name="name"
                placeholder="Enter your full name"
                :modelValue="username"
                @change="handleChangeUserName"
              />

              <InputError :message="errors?.username" />
            </div>

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

            <div>
              <InputLabel name="Confirm password" :required="true" />

              <InputField
                type="password"
                name="confirm-password"
                placeholder="••••••••"
                :modelValue="confirmPassword"
                @change="handleChangeConfirmPassword"
              />

              <InputError :message="errors?.confirmPassword" />
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