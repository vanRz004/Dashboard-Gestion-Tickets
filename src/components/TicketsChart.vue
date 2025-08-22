<template>
  <div class="bg-white rounded-lg shadow p-4">
    <h3 class="text-lg font-semibold mb-3">Tickets por estado</h3>
    <canvas ref="canvasEl" aria-label="Gráfico de tickets por estado" role="img"></canvas>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount, computed } from 'vue'

import Chart from 'chart.js/auto'

const props = defineProps({
  tickets: {
    type: Array,
    required: true
  }
})

const canvasEl = ref(null)
let chartInstance = null

const counts = computed(() => {
  const abierto = props.tickets.filter(t => t.estado === 'Abierto').length
  const enProgreso = props.tickets.filter(t => t.estado === 'En Progreso').length
  const resuelto = props.tickets.filter(t => t.estado === 'Resuelto').length
  return { abierto, enProgreso, resuelto }
})

// se agrega una paleta de colors segun cada estado,
// ya que si lo dejo en un solo orden no tendria en cuenta solo la propiedad 
// para la que queremos darle color en este caso los estados
const palette = {
  abierto: 'rgba(220, 76, 70, 0.75)',
  enProgreso: 'rgba(230, 176, 80, 0.75)', 
  resuelto: 'rgba(88, 171, 115, 0.75)'       
}
const paletteBorder = {
  abierto: 'rgba(220, 76, 70, 1)',
  enProgreso: 'rgba(230, 176, 80, 1)',
  resuelto: 'rgba(88, 171, 115, 1)'
}

const buildData = () => ({
  labels: ['Abierto', 'En Progreso', 'Resuelto'],
  datasets: [
    {
      label: 'Tickets',
      data: [counts.value.abierto, counts.value.enProgreso, counts.value.resuelto],
      backgroundColor: [
        palette.abierto,
        palette.enProgreso,
        palette.resuelto
      ],
      borderColor: [
        paletteBorder.abierto,
        paletteBorder.enProgreso,
        paletteBorder.resuelto
      ],
      borderWidth: 1,
      borderRadius: 6
    }
  ]
})

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    title: { display: false },
    tooltip: { intersect: false, mode: 'index' }
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { font: { size: 12 } }
    },
    y: {
      beginAtZero: true,
      grid: { color: 'rgba(0,0,0,0.05)' },
      ticks: { stepSize: 1, precision: 0 }
    }
  }
}

const renderChart = () => {
  if (!canvasEl.value) return
  const ctx = canvasEl.value.getContext('2d')
  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: buildData(),
    options: {
      ...options,
      
    }
  })
}

const updateChart = () => {
  if (!chartInstance) return
  chartInstance.data = buildData()
  chartInstance.update()
}

onMounted(() => {
  canvasEl.value.parentElement.style.height = '320px'
  renderChart()
})

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy()
    chartInstance = null
  }
})


watch(() => props.tickets, () => {
  updateChart()
}, { deep: true })
</script>