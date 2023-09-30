<script setup>
const props = defineProps({
  message: String,
});
</script>

<template>
  <div v-if="message" class="border p-4 rounded-md bg-green-300">
    <span class="text-green-600 font-semibold text-xs block w-full text-center">
      {{ message }}
    </span>
  </div>
</template>

