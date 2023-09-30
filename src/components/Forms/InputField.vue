<script setup>
defineProps({
  type: {
    type: String,
    default: "text",
  },
  name: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: String,
    default: "",
  },
});

defineEmits(["update:modelValue"]);
</script>

<template>
  <input
    :type="type"
    :name="name"
    :id="name"
    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
    @input="$emit('update:modelValue', $event.target.value)"
    :placeholder="placeholder"
    :disabled="disabled"
  />
</template>