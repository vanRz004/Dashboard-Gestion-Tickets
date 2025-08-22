<template>
  <div class="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md border border-gray-200">
    <h3 class="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
      <i class="fa-solid fa-ticket text-blue-600"></i>
      Detalle del Ticket
    </h3>

    <div class="space-y-3">
      <div class="flex justify-between">
        <span class="text-gray-500 font-medium">ID:</span>
        <span class="text-gray-800">#{{ info.id }}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-gray-500 font-medium">Título:</span>
        <span class="text-gray-800">{{ info.titulo }}</span>
      </div>
      <div>
        <span class="text-gray-500 font-medium block">Descripción:</span>
        <p class="text-gray-700 mt-1 bg-gray-50 p-2 rounded-md border border-gray-100">
          {{ info.descripcion }}
        </p>
      </div>
      <div class="flex justify-between">
        <span class="text-gray-500 font-medium">Creado el:</span>
        <span class="text-gray-800">{{ formatDate(info?.fechaCreacion) }}</span>
      </div>
      <div class="flex justify-between" v-if="info.fechaActualizacion">
        <span class="text-gray-500 font-medium">Última actualización:</span>
        <span class="text-gray-800">{{ formatDate(info?.fechaActualizacion) }}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-gray-500 font-medium">Estado:</span>
        <span class="px-2 py-1 rounded-full text-xs font-semibold" :class="{
          'bg-green-100 text-green-700': info.estado === 'Abierto',
          'bg-yellow-100 text-yellow-700': info.estado === 'Pendiente',
          'bg-red-100 text-red-700': info.estado === 'Cerrado'
        }">
          {{ info.estado }}
        </span>
      </div>
      <div class="flex justify-between">
        <span class="text-gray-500 font-medium">Prioridad:</span>
        <span class="px-2 py-1 rounded-full text-xs font-semibold" :class="{
          'bg-red-100 text-red-700': info.prioridad === 'Alta',
          'bg-yellow-100 text-yellow-700': info.prioridad === 'Media',
          'bg-blue-100 text-blue-700': info.prioridad === 'Baja'
        }">
          {{ info.prioridad }}
        </span>
      </div>
      <p><strong>Asignado a:</strong> {{ info.asignadoA }}</p>

    </div>

    <div class="mt-6 flex justify-end">
      <button @click="$emit('close')"
        class="px-5 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition">
        Cerrar
      </button>
    </div>
  </div>

</template>

<script setup>

const formatDate = (date) => {
  return new Date(date).toLocaleString()
}
defineProps({
  info: { type: Object, required: true }
})
defineEmits(['close'])
</script>
