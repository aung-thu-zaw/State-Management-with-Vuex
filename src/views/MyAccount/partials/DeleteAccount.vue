<script setup>
import InputField from "@/components/Forms/InputField.vue";
import InputLabel from "@/components/Forms/InputLabel.vue";
import InputError from "@/components/Forms/InputError.vue";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";

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

const submit = handleSubmit(() => console.log("submit"));
</script>

<template>
  <div>
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