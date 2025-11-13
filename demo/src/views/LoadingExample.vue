<script setup lang="ts">
import { ref } from 'vue'
import type { EChartsOption } from 'echarts'

const loading = ref(false)
const option = ref<EChartsOption>({
  title: {
    text: 'Loading State Demo'
  },
  tooltip: {},
  xAxis: {
    type: 'category',
    data: ['A', 'B', 'C', 'D', 'E']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      type: 'bar',
      data: [10, 52, 200, 334, 390]
    }
  ]
})

const toggleLoading = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>

<template>
  <div>
    <h2>Loading State Example</h2>
    <p>Demonstrates the loading animation feature.</p>

    <div class="controls">
      <button @click="toggleLoading">Show Loading (2s)</button>
      <span v-if="loading" style="color: #646cff">Loading...</span>
    </div>

    <div class="chart-wrapper">
      <v-chart
        :option="option"
        :loading="loading"
        :style="{ height: '400px' }"
        autoresize
      />
    </div>

    <details>
      <summary style="cursor: pointer; margin-bottom: 1rem">View Code</summary>
      <pre><code>{{ `<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const option = ref({ /* ... */ })

const toggleLoading = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
<\/script>

<template>
  <v-chart :option="option" :loading="loading" />
</template>` }}</code></pre>
    </details>
  </div>
</template>

<style scoped>
.chart-wrapper {
  margin-top: 1.5rem;
  background: #ffffff;
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
</style>
