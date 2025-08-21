<template>
  <div class="bg-white rounded-lg p-6 w-full max-w-md">
    <h3 class="text-lg font-semibold mb-4">Detalle del Ticket</h3>
    <p><strong>ID:</strong> #{{ info.id }}</p>
    <p><strong>Título:</strong> {{ info.titulo }}</p>
    <p><strong>Descripción:</strong> {{ info.descripcion }}</p>
    <p><strong>Estado:</strong> {{ info.estado }}</p>
    <p><strong>Prioridad:</strong> {{ info.prioridad }}</p>

    <div class="mt-4 text-right">
      <button 
        @click="$emit('close')" 
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        Cerrar
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  info: { type: Object, required: true }
})
defineEmits(['close'])
</script>
