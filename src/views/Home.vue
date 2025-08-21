<template>
  <header class="bg-white shadow-sm border-b">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col sm:flex-row justify-between items-center py-4 gap-3">
        <div class="flex items-center space-x-3">
          <i class="fa-solid fa-ticket text-blue-600 text-xl"></i>
          <h1 class="text-2xl font-bold text-gray-900">Ticket Fast SAS</h1>
        </div>
        <button @click="showCreateTicketForm"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors w-full sm:w-auto text-center">
          + Nuevo Ticket
        </button>
      </div>
    </div>
  </header>
<div v-if="loading" class="text-center py-4 text-gray-500 loader">Cargando tickets...</div>
<div v-if="error" class="text-center py-4 text-red-500">{{ error }}</div>
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
    <!-- tarjetas -->
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      <TicketsStats :icon="'fa-solid fa-ticket text-blue-300'" :title="'Total de Tickets'" :value="ticketsStats.total" />
      <TicketsStats :icon="'fa-solid fa-ticket'" :title="'Tickets Abiertos'" :value="ticketsStats.abiertos" />
      <TicketsStats :icon="'fa-solid fa-ticket'" :title="'Tickets En Progreso'" :value="ticketsStats.enProgreso" />
      <TicketsStats :icon="'fa-solid fa-ticket'" :title="'Tickets Cerrados'" :value="ticketsStats.cerrados" />
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
import { ref, computed, onMounted, watch } from 'vue'
import { fetchRetry } from "@/utils/fetchExample";
import { API } from "@/services/api";

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
const loading = ref(false)
const error = ref(null)

async function loadTickets() {
  loading.value = true;
  error.value = null;

  try {
    tickets.value = await fetchRetry(() => API.getTickets());
  } catch (err) {
    console.error(err);
    error.value = err.message || "Error desconocido";
  } finally {
    loading.value = false;
  }
}

const ticketsStats = computed(() => {
  const total = tickets.value.length
  const abiertos = tickets.value.filter(t => t.estado === 'Abierto').length
  const enProgreso = tickets.value.filter(t => t.estado === 'En Progreso').length
  const cerrados = tickets.value.filter(t => t.estado === 'Resuelto').length
  return { total, abiertos, enProgreso, cerrados }
})

const filteredTickets = computed(() => {
  return tickets.value.filter(ticket => {
    const titulo = ticket.titulo || ''      // fallback si undefined
    const estado = ticket.estado || ''      // fallback
    const prioridad = ticket.prioridad || ''// fallback

    const matchesSearch = titulo.toLowerCase().includes((searchTerm.value || '').toLowerCase())
    const matchesStatus = !statusFilter.value || estado === statusFilter.value
    const matchesPriority = !priorityFilter.value || prioridad === priorityFilter.value

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

const createTicket = async (newTicket) => {
  const ticketToSave = {
    ...newTicket,
    estado: 'Abierto'
  }

  loading.value = true
  error.value = null

  try {
    const savedTicket = await fetchRetry(() => API.createTicket(ticketToSave))
    tickets.value.push(savedTicket)
    closeModal()
  } catch (err) {
    console.error(err)
    error.value = err.message || "No se  ha podido crear el ticket"
  } finally {
    loading.value = false
  }
}

const updateTicket = async (updatedData) => {
  loading.value = true
  error.value = null

  try {
    const updatedTicket = await fetchRetry(() =>
      API.updateTicket(updatedData.id, updatedData)
    )

    const index = tickets.value.findIndex(t => t.id === updatedTicket.id)
    if (index !== -1) {
      tickets.value[index] = updatedTicket   
    }

    closeModal()
  } catch (err) {
    console.error(err)
    error.value = err.message || "No se pudo actualizar el ticket"
  } finally {
    loading.value = false
  }
}


const closeModal = () => {
  // resetear datos al cerrar el modal
  showCreateForm.value = false
  showEditForm.value = false
  currentTicket.value = { titulo: '', descripcion: '', prioridad: 'Baja', asignadoA: '' }
}
const showCreateTicketForm = () => {
  currentTicket.value = { titulo: '', descripcion: '', prioridad: 'Baja', asignadoA: '' }
  showCreateForm.value = true
}

onMounted(() => {
  const ticketsGuardados = localStorage.getItem('tickets')
  if (ticketsGuardados) {
    tickets.value = JSON.parse(ticketsGuardados)
  } else {
    loadTickets() 
  }
})

watch(tickets, (nuevosTickets) => {
  localStorage.setItem('tickets', JSON.stringify(nuevosTickets))
}, { deep: true })

</script>
<style scoped>
.loader {
  width: 80px;
  aspect-ratio: 1;
  position:relative;
}
.loader:before,
.loader:after {
  content: "";
  position: absolute;
  inset: 0;
  background: #ffb940;    
  box-shadow: 0 0 0 50px;
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
}
.loader:after {
  animation: l5 1s infinite;
  transform: perspective(300px) translateZ(0px)
}
@keyframes l5 {
  to {transform:perspective(300px) translateZ(150px);opacity:0}
}
</style>
