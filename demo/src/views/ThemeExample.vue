<script setup lang="ts">
import { ref } from 'vue'
import type { EChartsOption } from 'echarts'

const theme = ref<string | undefined>(undefined)

const option = ref<EChartsOption>({
  title: {
    text: 'Theme Example'
  },
  tooltip: {},
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
})

const setTheme = (newTheme: string | undefined) => {
  theme.value = newTheme
  // Note: Changing theme requires recreating the chart instance
  // which happens automatically when the theme prop changes
}
</script>

<template>
  <div>
    <h2>Theme Example</h2>
    <p>Switch between different themes. Note: Theme change requires chart recreation.</p>

    <div class="controls">
      <button @click="setTheme(undefined)">Default</button>
      <button @click="setTheme('dark')">Dark</button>
      <button @click="setTheme('light')">Light (if registered)</button>
      <span style="opacity: 0.7">Current: {{ theme || 'default' }}</span>
    </div>

    <div class="chart-wrapper">
      <v-chart
        :key="theme"
        :option="option"
        :theme="theme"
        :style="{ height: '400px' }"
        autoresize
      />
    </div>

    <details>
      <summary style="cursor: pointer; margin-bottom: 1rem">View Code</summary>
      <pre><code>{{ `<script setup lang="ts">
import { ref } from 'vue'

const theme = ref<string | undefined>('dark')
const option = ref({ /* ... */ })
<\/script>

<template>
  <v-chart
    :key="theme"
    :option="option"
    :theme="theme"
  />
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
