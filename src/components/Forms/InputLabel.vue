<script setup>
defineProps({
  name: {
    type: String,
    default: "Label Name",
  },
  required: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <label
    :for="name"
    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  >
    {{ name }}
    <span v-if="required" class="text-red-600">*</span>
  </label>
</template>