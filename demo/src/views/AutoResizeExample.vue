<script setup lang="ts">
import { ref } from 'vue'
import type { EChartsOption } from 'echarts'

const containerHeight = ref(400)

const option = ref<EChartsOption>({
  title: {
    text: 'Auto Resize Demo'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 20,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ]
    }
  ]
})

const increaseHeight = () => {
  containerHeight.value = Math.min(containerHeight.value + 50, 600)
}

const decreaseHeight = () => {
  containerHeight.value = Math.max(containerHeight.value - 50, 200)
}

const handleResize = (width: number, height: number) => {
  console.log('Chart resized:', { width, height })
}
</script>

<template>
  <div>
    <h2>Auto Resize Example</h2>
    <p>The chart automatically resizes when its container size changes.</p>

    <div class="controls">
      <button @click="increaseHeight">Increase Height (+50px)</button>
      <button @click="decreaseHeight">Decrease Height (-50px)</button>
      <span style="opacity: 0.7">Current Height: {{ containerHeight }}px</span>
    </div>

    <div class="chart-wrapper">
      <v-chart
        :option="option"
        :style="{ width: '100%', height: containerHeight + 'px' }"
        autoresize
        @resize="handleResize"
      />
    </div>

    <details>
      <summary style="cursor: pointer; margin-bottom: 1rem">View Code</summary>
      <pre><code>{{ `<script setup lang="ts">
import { ref } from 'vue'

const containerHeight = ref(400)
const option = ref({ /* ... */ })
<\/script>

<template>
  <v-chart
    :option="option"
    :style="{ height: containerHeight + 'px' }"
    autoresize
    @resize="(width, height) => console.log({ width, height })"
  />
</template>` }}</code></pre>
    </details>
  </div>
</template>
