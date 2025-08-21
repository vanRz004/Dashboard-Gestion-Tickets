<template>
  <div>
    <!-- Filtros -->
    <div class="bg-white p-4 rounded-lg shadow mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          :value="searchTerm"
          @input="$emit('update:search-term', $event.target.value)"
          type="text"
          placeholder="Buscar tickets..."
          class="px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 w-full"
        />
        <select
          :value="statusFilter"
          @change="$emit('update:status-filter', $event.target.value)"
          class="px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 w-full"
        >
          <option value="">Todos los estados</option>
          <option value="Abierto">Abierto</option>
          <option value="En Progreso">En Progreso</option>
          <option value="Resuelto">Resuelto</option>
        </select>
        <select
          :value="priorityFilter"
          @change="$emit('update:priority-filter', $event.target.value)"
          class="px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 w-full"
        >
          <option value="">Todas las prioridades</option>
          <option value="Baja">Baja</option>
          <option value="Media">Media</option>
          <option value="Alta">Alta</option>
          <option value="Critica">Crítica</option>
        </select>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow overflow-x-auto">
      <table class="min-w-[600px] w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Título</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prioridad</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="ticket in tickets" :key="ticket.id" class="hover:bg-gray-50">
            <td class="px-4 py-3 text-sm font-medium">#{{ ticket.id }}</td>
            <td class="px-4 py-3 text-sm">{{ ticket.titulo }}</td>
            <td class="px-4 py-3">
              <span :class="getStatusClass(ticket.estado)" class="px-2 py-1 text-xs rounded-full">
                {{ ticket.estado }}
              </span>
            </td>
            <td class="px-4 py-3">
              <span :class="getPriorityClass(ticket.prioridad)" class="px-2 py-1 text-xs rounded-full">
                {{ ticket.prioridad }}
              </span>
            </td>
            <td class="px-4 py-3 text-sm">
              <button @click="$emit('view', ticket)" class="text-blue-600 hover:text-blue-800 mr-2">Ver</button>
              <button @click="$emit('edit', ticket)" class="text-green-600 hover:text-green-800">Editar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps({
  tickets: { type: Array, required: true },
  searchTerm: String,
  statusFilter: String,
  priorityFilter: String
})

const getStatusClass = (status) => {
  const classes = {
    'Abierto': 'bg-red-100 text-red-800',
    'En Progreso': 'bg-yellow-100 text-yellow-800',
    'Resuelto': 'bg-green-100 text-green-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const getPriorityClass = (priority) => {
  const classes = {
    'Baja': 'bg-blue-100 text-blue-800',
    'Media': 'bg-yellow-100 text-yellow-800',
    'Alta': 'bg-orange-100 text-orange-800',
    'Critica': 'bg-red-100 text-red-800'
  }
  return classes[priority] || 'bg-gray-100 text-gray-800'
}
</script>
