<script setup>
const props = defineProps({
  message: String,
});
</script>

<template>
  <div v-if="message" class="border p-4 rounded-md bg-red-300">
    <span class="text-red-600 font-semibold text-xs block w-full text-center">
      {{ message }}
    </span>
  </div>
</template>

