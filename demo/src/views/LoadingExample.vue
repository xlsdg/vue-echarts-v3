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
        class="chart-container"
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
