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
      <div ref="chartRef" class="chart-container" />
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
