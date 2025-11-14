<script setup lang="ts">
import { ref } from 'vue'
import type { EChartsOption, EChartsType, ECElementEvent } from 'echarts'

const option = ref<EChartsOption>({
  title: {
    text: 'Basic Line Chart'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Sales', 'Revenue']
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'Sales',
      type: 'line',
      data: [120, 200, 150, 80, 70, 110, 130]
    },
    {
      name: 'Revenue',
      type: 'line',
      data: [100, 180, 120, 90, 60, 100, 110]
    }
  ]
})

const randomizeData = () => {
  option.value = {
    ...option.value,
    series: [
      {
        name: 'Sales',
        type: 'line',
        data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 200))
      },
      {
        name: 'Revenue',
        type: 'line',
        data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 200))
      }
    ]
  }
}

const handleReady = (instance: EChartsType) => {
  // eslint-disable-next-line no-console
  console.log('Chart ready:', instance)
}

const handleClick = (event: ECElementEvent) => {
  // eslint-disable-next-line no-console
  console.log('Chart clicked:', event)
}
</script>

<template>
  <div>
    <h2>Basic Chart Example</h2>
    <p>A simple line chart with reactive data updates.</p>

    <div class="controls">
      <button @click="randomizeData">Randomize Data</button>
    </div>

    <div class="chart-wrapper">
      <v-chart
        :option="option"
        :style="{ height: '400px' }"
        autoresize
        @ready="handleReady"
        @click="handleClick"
      />
    </div>

    <details>
      <summary style="cursor: pointer; margin-bottom: 1rem">View Code</summary>
      <pre><code>{{ `<script setup lang="ts">
import { ref } from 'vue'
import type { EChartsOption } from 'echarts'

const option = ref<EChartsOption>({
  title: { text: 'Basic Line Chart' },
  tooltip: { trigger: 'axis' },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: { type: 'value' },
  series: [{
    name: 'Sales',
    type: 'line',
    data: [120, 200, 150, 80, 70, 110, 130]
  }]
})
<\/script>

<template>
  <v-chart :option="option" autoresize />
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
