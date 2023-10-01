<script setup>
import InputField from "@/components/Forms/InputField.vue";
import InputLabel from "@/components/Forms/InputLabel.vue";
import InputError from "@/components/Forms/InputError.vue";
import FormButton from "@/components/Forms/FormButton.vue";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { useStore } from "vuex";
import { computed } from "vue";
import { useCurrentUser } from "vuefire";

const store = useStore();
const user = useCurrentUser();

const errorMessage = computed(
  () => store.state.authentication.authErrorMessage
);

const successMessage = computed(
  () => store.state.authentication.authSuccessMessage
);

const validationSchema = yup.object({
  username: yup.string().nullable(),
  email: yup.string().nullable().email(),
  photo: yup.string().nullable(),
});

const { handleSubmit, setFieldValue, errors } = useForm({
  validationSchema,
  initialValues: {
    username: user.value?.displayName,
    email: user.value?.email,
  },
});

const { value: username } = useField("username");
const { value: email } = useField("email");
const { value: photo } = useField("photo");

const handleChangeUserName = (event) => {
  setFieldValue("username", event.target.value);
};

const handleChangeEmail = (event) => {
  setFieldValue("email", event.target.value);
};

const handleChangePhoto = (event) => {
  setFieldValue("photo", event.target.value);
};

const submit = handleSubmit(() => console.log("submit"));
</script>

<template>
  <div class="mt-3">
    <SuccessMessageCard :message="successMessage" />
    <ErrorMessageCard :message="errorMessage" />
    <h3 class="text-md font-bold text-slate-600 my-5">
      <i class="fa-solid fa-user"></i>
      Update Profile Information
    </h3>

    <form @submit.prevent="submit">
      <div class="grid grid-cols-2 gap-5">
        <div>
          <InputLabel name="Username"  />

          <InputField
            type="text"
            name="username"
            placeholder="Enter your full name"
            :modelValue="username"
            @change="handleChangeUserName"
          />

          <InputError :message="errors?.username" />
        </div>

        <div>
          <InputLabel name="Your email"  />

          <InputField
            type="email"
            name="email"
            placeholder="example@gmail.com"
            :modelValue="email"
            @change="handleChangeEmail"
          />

          <InputError :message="errors?.email" />
        </div>
      </div>

      <div class="mt-5">
        <InputLabel name="Avatar" />

        <input
          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
          id="file_input"
          type="file"
          :modelValue="photo"
          @change="handleChangePhoto"
        />

        <InputError :message="errors?.photo" />
      </div>

      <div class="w-1/6 my-5 ml-auto">
        <FormButton name="submit" />
      </div>
    </form>
  </div>
</template>