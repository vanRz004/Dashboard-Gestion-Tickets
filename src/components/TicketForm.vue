<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg p-6 w-full max-w-md">
      <h3 class="text-lg font-semibold mb-4">
        {{ isEdit ? 'Editar Ticket' : 'Crear Ticket' }}
      </h3>

      <form @submit.prevent="handleSubmit">
        <!-- Título -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Título</label>
          <input v-model="localTicket.titulo" type="text" required
            class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" />
        </div>

        <!-- Descripción -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Descripción</label>
          <textarea v-model="localTicket.descripcion" rows="3" required
            class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"></textarea>
        </div>

        <!-- Prioridad -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Prioridad</label>
          <select v-model="localTicket.prioridad" required
            class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500">
            <option value="Baja">Baja</option>
            <option value="Media">Media</option>
            <option value="Alta">Alta</option>
            <option value="Critica">Crítica</option>
          </select>
        </div>

        <!-- Asignado a -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Asignado a</label>
          <select v-model="localTicket.asignadoA" required
            class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500">
            <option disabled value="">Selecciona un usuario</option>
            <option v-for="user in usuarios" :key="user.id" :value="user.email">
              {{ user.nombre }} ({{ user.rol }})
            </option>
          </select>
        </div>

        <!-- Botones -->
        <div class="flex justify-end space-x-3">
          <button type="button" @click="$emit('close')"
            class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
            Cancelar
          </button>
          <button type="submit" class="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
            {{ isEdit ? 'Actualizar' : 'Crear' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import {  watch, ref, onMounted } from 'vue'
import { API } from '@/services/api'

const props = defineProps({
  ticket: { type: Object, required: true },
  isEdit: { type: Boolean, default: false }
})
const emit = defineEmits(['close', 'create', 'update'])

const localTicket = ref({ ...props.ticket })
const usuarios = ref([])
watch(
  () => props.ticket,
  (newVal) => {
    localTicket.value = { ...newVal }
  },
  { immediate: true, deep: true }
)
// immediate: true casi siempre lo utilizo para asegurarme que al montar el componente 
// el formulario se rellene con los datos iniciales del ticket
// deep: true por si el objeto ticket tiene cambios internos,
// no solo cuando cambia toda la referencia,
// asi tambien es seguro extraer o guardar todos los edits que hagamos en un ticket
onMounted(async () => {
  usuarios.value = await API.getUsuarios()
})

const handleSubmit = () => {
  if (props.isEdit) {
    emit('update', { ...localTicket.value })
  } else {
    emit('create', { ...localTicket.value })
  }
}

</script>