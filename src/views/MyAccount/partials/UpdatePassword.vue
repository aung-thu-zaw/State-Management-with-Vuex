<script setup>
import ErrorMessageCard from "@/components/Cards/ErrorMessageCard.vue";
import SuccessMessageCard from "@/components/Cards/SuccessMessageCard.vue";
import InputField from "@/components/Forms/InputField.vue";
import InputLabel from "@/components/Forms/InputLabel.vue";
import InputError from "@/components/Forms/InputError.vue";
import FormButton from "@/components/Forms/FormButton.vue";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();

const errorMessage = computed(
  () => store.state.authentication.authErrorMessage
);

const successMessage = computed(
  () => store.state.authentication.authSuccessMessage
);

const validationSchema = yup.object({
  currentPassword: yup.string().required().min(6),
  newPassword: yup.string().required().min(6),
  confirmPassword: yup
    .string()
    .required()
    .min(6)
    .oneOf([yup.ref("newPassword"), null], "Passwords do not match"),
});

const { handleSubmit, setFieldValue, errors } = useForm({
  validationSchema,
});

const { value: newPassword } = useField("newPassword");
const { value: currentPassword } = useField("currentPassword");
const { value: confirmPassword } = useField("confirmPassword");

const handleChangeCurrentPassword = (event) => {
  setFieldValue("currentPassword", event.target.value);
};

const handleChangeNewPassword = (event) => {
  setFieldValue("newPassword", event.target.value);
};

const handleChangeConfirmPassword = (event) => {
  setFieldValue("confirmPassword", event.target.value);
};

const handleUpdatePassword = async () => {
  await store.dispatch("updateAccountPassword", {
    currentPassword: currentPassword.value,
    newPassword: newPassword.value,
    confirmPassword: confirmPassword.value,
  });
};

const submit = handleSubmit(() => handleUpdatePassword());
</script>

<template>
  <SuccessMessageCard :message="successMessage" />
  <ErrorMessageCard :message="errorMessage" />
  <div>
    <h3 class="text-md font-bold text-slate-600 my-5">
      <i class="fa-solid fa-lock"></i>
      Update Password
    </h3>
    <form @submit.prevent="submit">
      <div class="mb-5">
        <InputLabel name="Current Password" :required="true" />

        <InputField
          type="password"
          name="currentPassword"
          placeholder="••••••••"
          :modelValue="currentPassword"
          @change="handleChangeCurrentPassword"
        />

        <InputError :message="errors?.currentPassword" />
      </div>
      <div class="grid grid-cols-2 gap-5">
        <div>
          <InputLabel name="newPassword" :required="true" />

          <InputField
            type="password"
            name="newPassword"
            placeholder="••••••••"
            :modelValue="newPassword"
            @change="handleChangeNewPassword"
          />

          <InputError :message="errors?.newPassword" />
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
      </div>

      <div class="w-1/6 my-5 ml-auto">
        <FormButton name="submit" />
      </div>
    </form>
  </div>
</template>