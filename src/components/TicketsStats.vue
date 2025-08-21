<template>
  <div class="bg-white shadow-md rounded-xl p-4 w-full sm:w-64 hover:shadow-xl transition-shadow">
    <!-- Icono y título -->
    <div class="flex items-center gap-2">
      <i :class="icon" class="w-5 h-5"></i>
      <h3 class="text-gray-700 font-semibold text-lg truncate">{{ title }}</h3>
    </div>

    <!-- Valores -->
    <p class="text-3xl sm:text-4xl font-bold text-blue-600 mt-4">{{ value }}</p>
  </div>
</template>

<script setup>



defineProps({
  icon: { type: [Array, String], required: true },
  title: { type: String, required: true },
  value: { type: [String, Number], required: true }
})
</script>

<style scoped></style>
