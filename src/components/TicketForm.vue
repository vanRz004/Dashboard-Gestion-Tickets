<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg p-6 w-full max-w-md">
      <h3 class="text-lg font-semibold mb-4">
        {{ isEdit ? 'Editar Ticket' : 'Crear Ticket' }}
      </h3>

      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Título</label>
          <input
            v-model="localTicket.titulo"
            type="text"
            required
            class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Descripción</label>
          <textarea
            v-model="localTicket.descripcion"
            rows="3"
            required
            class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Prioridad</label>
          <select
            v-model="localTicket.prioridad"
            required
            class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="baja">Baja</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
            <option value="critica">Crítica</option>
          </select>
        </div>

        <div class="flex justify-end space-x-3">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            {{ isEdit ? 'Actualizar' : 'Crear' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  ticket: { type: Object, required: true },
  isEdit: { type: Boolean, default: false }
})
const emit = defineEmits(['close', 'create', 'update'])

const localTicket = reactive({ ...props.ticket })

watch(() => props.ticket, (newVal) => {
  Object.assign(localTicket, newVal)
})

const handleSubmit = () => {
  if (props.isEdit) {
    emit('update', { ...localTicket })
  } else {
    emit('create', { ...localTicket })
  }
}
</script>
