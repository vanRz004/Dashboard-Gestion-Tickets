<template>
  <header class="bg-white shadow-sm border-b">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col sm:flex-row justify-between items-center py-4 gap-3">
        <div class="flex items-center space-x-3">
          <i class="fa-solid fa-ticket text-blue-600 text-xl"></i>
          <h1 class="text-2xl font-bold text-gray-900">Ticket Fast SAS</h1>
        </div>
        <button @click="showCreateForm = true"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors w-full sm:w-auto text-center">
          + Nuevo Ticket
        </button>
      </div>
    </div>
  </header>

  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
    <!-- tarjetas -->
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <TicketsStats :icon="'fa-solid fa-ticket text-blue-300'" :title="'Total de Tickets'" :value="124" />
      <TicketsStats :icon="'fa-solid fa-ticket'" :title="'Tickets Abiertos'" :value="124" />
      <TicketsStats :icon="'fa-solid fa-ticket'" :title="'Tickets En Progreso'" :value="124" />
      <TicketsStats :icon="'fa-solid fa-ticket'" :title="'Tickets Cerrados'" :value="98" />
    </section>

    <!-- tabla -->
    <section class="mb-4">
      <TicketsTable :tickets="filteredTickets" :search-term="searchTerm" :status-filter="statusFilter"
        :priority-filter="priorityFilter" @view="viewTicket" @edit="editTicket" />
    </section>
    <section>
      <TicketsChart :tickets="tickets"/>
    </section>
    <!-- formulario modal -->
    <TicketForm v-if="showCreateForm || showEditForm" :ticket="currentTicket" :is-edit="showEditForm"
      @close="closeModal" @create="createTicket" @update="updateTicket" />

    <!-- detalle modal -->
    <!--Aquí utilice un click elf ya que en la experiencia de usuario no siempre se le da al boton,
    por lo tanto si dan click en el overlay tambien se cerrará mas NO si interactuan dentro del componente hijo -->
    <div v-if="showViewModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" @click.self="showViewModal = false">
      <TicketDetail :info="viewingTicket" @close="showViewModal = false"/>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import TicketsStats from '@/components/TicketsStats.vue'
import TicketsTable from '@/components/TicketsTable.vue'
import TicketForm from '@/components/TicketForm.vue'
import TicketDetail from '@/components/TicketDetail.vue'
import TicketsChart from '@/components/TicketsChart.vue'

const tickets = ref([])
const searchTerm = ref('')
const statusFilter = ref('')
const priorityFilter = ref('')
const showCreateForm = ref(false)
const showEditForm = ref(false)
const showViewModal = ref(false)
const currentTicket = ref({})
const viewingTicket = ref({})

const sampleTickets = [
  { id: 1, titulo: 'Error en login', descripcion: 'No pueden iniciar sesión', estado: 'abierto', prioridad: 'alta' },
  { id: 2, titulo: 'Mejora UI', descripcion: 'Actualizar diseño', estado: 'en progreso', prioridad: 'media' },
  { id: 3, titulo: 'BD lenta', descripcion: 'Consultas tardan mucho', estado: 'resuelto', prioridad: 'critica' },
  { id: 4, titulo: 'Bug carrito', descripcion: 'Productos no se agregan', estado: 'abierto', prioridad: 'media' }
]

const filteredTickets = computed(() => {
  return tickets.value.filter(ticket => {
    const matchesSearch = ticket.titulo.toLowerCase().includes(searchTerm.value.toLowerCase())
    const matchesStatus = !statusFilter.value || ticket.estado === statusFilter.value
    const matchesPriority = !priorityFilter.value || ticket.prioridad === priorityFilter.value
    return matchesSearch && matchesStatus && matchesPriority
  })
})

const viewTicket = (ticket) => {
  viewingTicket.value = { ...ticket }
  showViewModal.value = true
}

const editTicket = (ticket) => {
  currentTicket.value = { ...ticket }
  showEditForm.value = true
}

const createTicket = () => {
  const newTicket = {
    ...currentTicket.value,
    id: Math.max(...tickets.value.map(t => t.id)) + 1,
    estado: 'abierto'
  }
  tickets.value.push(newTicket)
  closeModal()
}

const updateTicket = () => {
  const index = tickets.value.findIndex(t => t.id === currentTicket.value.id)
  if (index !== -1) {
    tickets.value[index] = { ...currentTicket.value }
  }
  closeModal()
}

const closeModal = () => {
  showCreateForm.value = false
  showEditForm.value = false
  currentTicket.value = { titulo: '', descripcion: '', prioridad: 'media' }
}

onMounted(() => {
  tickets.value = [...sampleTickets]
  currentTicket.value = { titulo: '', descripcion: '', prioridad: 'media' }
})
</script>
