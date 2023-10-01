<script setup>
import ErrorMessageCard from "@/components/Cards/ErrorMessageCard.vue";
import SuccessMessageCard from "@/components/Cards/SuccessMessageCard.vue";
import InputField from "@/components/Forms/InputField.vue";
import InputLabel from "@/components/Forms/InputLabel.vue";
import InputError from "@/components/Forms/InputError.vue";
import { useStore } from "vuex";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { computed } from "vue";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const errorMessage = computed(
  () => store.state.authentication.authErrorMessage
);

const successMessage = computed(
  () => store.state.authentication.authSuccessMessage
);

const validationSchema = yup.object({
  password: yup.string().required().min(6),
});

const { handleSubmit, setFieldValue, errors } = useForm({
  validationSchema,
});

const { value: password } = useField("password");

const handleChangePassword = (event) => {
  setFieldValue("password", event.target.value);
};

const handleDeleteAccount = async () => {
  const response = await store.dispatch("deleteUserAccount", password.value);

  if (response) return router.push({ name: "login" });
  else false;
};

const submit = handleSubmit(() => handleDeleteAccount());
</script>

<template>
  <div class="mt-3">
    <SuccessMessageCard :message="successMessage" />
    <ErrorMessageCard :message="errorMessage" />
    <h3 class="text-md font-bold text-slate-600 my-5">
      <i class="fa-solid fa-trash-can"></i>
      Delete Account
    </h3>
    <form @submit.prevent="submit">
      <div>
        <InputLabel name="Account Password" :required="true" />

        <InputField
          type="password"
          name="password"
          placeholder="••••••••"
          :modelValue="password"
          @change="handleChangePassword"
        />

        <InputError :message="errors?.password" />
      </div>

      <div class="w-1/6 my-5 ml-auto">
        <button
          type="submit"
          class="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Delete
        </button>
      </div>
    </form>
  </div>
</template>