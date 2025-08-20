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
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <CardsStats :icon="'fa-solid fa-ticket text-blue-300'" :title="'Total de Tickets'" :value="124" />
      <CardsStats :icon="'fa-solid fa-ticket'" :title="'Tickets Abiertos'" :value="124" />
      <CardsStats :icon="'fa-solid fa-ticket'" :title="'Tickets En Progreso'" :value="124" />
      <CardsStats :icon="'fa-solid fa-ticket'" :title="'Tickets Cerrados'" :value="98" />
    </section>

    <section>
      
    </section>
  </main>
</template>

<script setup>
import CardsStats from '@/components/card/CardsStats.vue';
import { ref } from 'vue';

const showCreateForm = ref(false);

</script>

<style scoped></style>
