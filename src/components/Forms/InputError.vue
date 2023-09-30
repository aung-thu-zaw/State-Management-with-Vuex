<script setup>
defineProps({
  message: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <span v-if="message" class="text-red-700 text-xs font-semibold">
    {{ message }}
  </span>
</template>