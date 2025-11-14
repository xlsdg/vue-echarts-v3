<script setup lang="ts">
import { ref } from 'vue'
import { useECharts } from 'vue-echarts-v3'
import type { EChartsOption } from 'echarts'

const chartRef = ref<HTMLElement>()
const option = ref<EChartsOption>({
  title: {
    text: 'Composable API Example'
  },
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    data: ['A', 'B', 'C', 'D', 'E', 'F', 'G']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'bar'
    }
  ]
})

const { setOption, clear, getDataURL } = useECharts(
  chartRef,
  option,
  {
    autoresize: true
  },
  {
    click: (event) => {
      // eslint-disable-next-line no-console
      console.log('Composable - Chart clicked:', event)
    }
  }
)

const randomizeData = () => {
  const newOption: EChartsOption = {
    ...option.value,
    series: [
      {
        data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 2000)),
        type: 'bar'
      }
    ]
  }
  setOption(newOption)
}

const clearChart = () => {
  clear()
}

const exportImage = () => {
  const url = getDataURL({ type: 'png', pixelRatio: 2 })
  // eslint-disable-next-line no-console
  console.log('Data URL:', url.substring(0, 100) + '...')
  alert('Check console for data URL')
}
</script>

<template>
  <div>
    <h2>Composable API Example</h2>
    <p>Using the <code>useECharts</code> composable for more control.</p>

    <div class="controls">
      <button @click="randomizeData">Randomize Data</button>
      <button @click="clearChart">Clear Chart</button>
      <button @click="exportImage">Export Image</button>
    </div>

    <div class="chart-wrapper">
      <div ref="chartRef" style="width: 100%; height: 400px" />
    </div>

    <details>
      <summary style="cursor: pointer; margin-bottom: 1rem">View Code</summary>
      <pre><code>{{ `<script setup lang="ts">
import { ref } from 'vue'
import { useECharts } from 'vue-echarts-v3'

const chartRef = ref<HTMLElement>()
const option = ref({ /* ... */ })

const { chart, setOption, clear, getDataURL } = useECharts(
  chartRef,
  option,
  { autoresize: true },
  {
    click: (event) => {
      console.log('Chart clicked:', event)
    }
  }
)

const randomizeData = () => {
  setOption({ /* new option */ })
}
<\/script>

<template>
  <div ref="chartRef" style="width: 600px; height: 400px" />
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
