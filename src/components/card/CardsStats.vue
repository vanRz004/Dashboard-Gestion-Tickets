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

// Decidí crear este componente como reutilizable porque permite mantener
// consistencia en el diseño de las cards en toda la aplicación
// Al recibir props para el icono, título y valor, el mismo componente puede adaptarse 
// a distintos datos sin necesidad de duplicar código... 
// esto facilita el mantenimiento, escalabilidad y la futura incorporación de nuevas 
// estadísticas en el dashboard sin romper la consistencia visual

defineProps({
  icon: { type: [Array, String], required: true },
  title: { type: String, required: true },
  value: { type: [String, Number], required: true }
})
</script>

<style scoped></style>
