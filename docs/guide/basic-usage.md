# Basic Usage

This guide covers the fundamental usage patterns of Vue ECharts v3.

## Simple Chart

The most basic usage requires three things:

1. Import and register ECharts modules
2. Define your chart option
3. Use the `VChart` component

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { VChart } from 'vue-echarts-v3'
import type { EChartsOption } from 'echarts'

// Register ECharts modules
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'

use([CanvasRenderer, BarChart, GridComponent, TooltipComponent])

const option = ref<EChartsOption>({
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    name: 'Sales',
    type: 'bar',
    data: [120, 200, 150, 80, 70]
  }]
})
</script>

<template>
  <v-chart :option="option" style="width: 600px; height: 400px" />
</template>
```

## Reactive Updates

The chart automatically updates when the option changes:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { VChart } from 'vue-echarts-v3'
import type { EChartsOption } from 'echarts'

const option = ref<EChartsOption>({
  // ... your option
  series: [{
    data: [120, 200, 150, 80, 70]
  }]
})

// Update data - chart will automatically re-render
const updateData = () => {
  option.value = {
    ...option.value,
    series: [{
      data: [150, 230, 180, 100, 90]
    }]
  }
}
</script>

<template>
  <div>
    <button @click="updateData">Update Data</button>
    <v-chart :option="option" style="width: 600px; height: 400px" />
  </div>
</template>
```

## Component Sizing

The chart component requires explicit dimensions. You can set them using:

### Inline Styles

```vue
<template>
  <v-chart
    :option="option"
    style="width: 800px; height: 500px"
  />
</template>
```

### CSS Classes

```vue
<template>
  <v-chart :option="option" class="my-chart" />
</template>

<style scoped>
.my-chart {
  width: 100%;
  height: 400px;
}
</style>
```

### Parent Container

```vue
<template>
  <div class="chart-container">
    <v-chart :option="option" />
  </div>
</template>

<style scoped>
.chart-container {
  width: 100%;
  height: 500px;
}
</style>
```

::: tip
The component's default minimum height is 200px if no height is specified.
:::

## Auto-Resize

Enable automatic resizing when the container size changes:

```vue
<template>
  <v-chart
    :option="option"
    :autoresize="true"
    style="width: 100%; height: 400px"
  />
</template>
```

With custom throttle (default is 100ms):

```vue
<template>
  <v-chart
    :option="option"
    :autoresize="{ throttle: 200 }"
    style="width: 100%; height: 400px"
  />
</template>
```

::: info
Auto-resize uses the native `ResizeObserver` API, which is supported in all modern browsers.
:::

## Themes

Apply ECharts themes to your charts:

### Built-in Themes

```vue
<template>
  <v-chart
    :option="option"
    theme="dark"
    style="width: 600px; height: 400px"
  />
</template>
```

### Custom Theme Object

```vue
<script setup lang="ts">
const customTheme = {
  color: ['#fc8452', '#ea7ccc', '#91cc75'],
  backgroundColor: '#f4f4f4'
}
</script>

<template>
  <v-chart
    :option="option"
    :theme="customTheme"
    style="width: 600px; height: 400px"
  />
</template>
```

### Registered Theme

```typescript
import { registerTheme } from 'vue-echarts-v3'

registerTheme('my-theme', {
  color: ['#fc8452', '#ea7ccc', '#91cc75'],
  backgroundColor: '#ffffff'
})
```

```vue
<template>
  <v-chart
    :option="option"
    theme="my-theme"
    style="width: 600px; height: 400px"
  />
</template>
```

## Loading State

Show a loading animation while data is being fetched:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { VChart } from 'vue-echarts-v3'
import type { EChartsOption } from 'echarts'

const loading = ref(true)
const option = ref<EChartsOption>({})

// Simulate data fetching
setTimeout(() => {
  option.value = {
    // ... your option
  }
  loading.value = false
}, 2000)
</script>

<template>
  <v-chart
    :option="option"
    :loading="loading"
    style="width: 600px; height: 400px"
  />
</template>
```

Custom loading options:

```vue
<template>
  <v-chart
    :option="option"
    :loading="loading"
    :loading-options="{
      text: 'Loading...',
      color: '#4ea397',
      textColor: '#000',
      maskColor: 'rgba(255, 255, 255, 0.8)',
      zlevel: 0
    }"
    style="width: 600px; height: 400px"
  />
</template>
```

## Event Handling

Listen to ECharts events:

```vue
<script setup lang="ts">
import type { ECElementEvent } from 'echarts'

const handleClick = (event: ECElementEvent) => {
  console.log('Clicked:', event.data)
}

const handleMouseover = (event: ECElementEvent) => {
  console.log('Mouse over:', event.seriesName)
}
</script>

<template>
  <v-chart
    :option="option"
    @click="handleClick"
    @mouseover="handleMouseover"
    style="width: 600px; height: 400px"
  />
</template>
```

## Instance Methods

Access the chart instance for advanced operations:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { VChartExposed } from 'vue-echarts-v3'

const chartRef = ref<VChartExposed>()

const exportChart = () => {
  const url = chartRef.value?.getDataURL({
    type: 'png',
    pixelRatio: 2,
    backgroundColor: '#fff'
  })
  if (url) {
    const link = document.createElement('a')
    link.href = url
    link.download = 'chart.png'
    link.click()
  }
}

const resizeChart = () => {
  chartRef.value?.resize()
}

const clearChart = () => {
  chartRef.value?.clear()
}
</script>

<template>
  <div>
    <button @click="exportChart">Export</button>
    <button @click="resizeChart">Resize</button>
    <button @click="clearChart">Clear</button>

    <v-chart
      ref="chartRef"
      :option="option"
      style="width: 600px; height: 400px"
    />
  </div>
</template>
```

## Global Registration

Register the component globally for use throughout your application:

```typescript
// main.ts
import { createApp } from 'vue'
import { VChart } from 'vue-echarts-v3'
import App from './App.vue'

const app = createApp(App)
app.component('VChart', VChart)
app.mount('#app')
```

Then use it without importing:

```vue
<template>
  <v-chart :option="option" style="width: 600px; height: 400px" />
</template>
```

## Multiple Charts

You can use multiple chart instances in the same component:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { VChart } from 'vue-echarts-v3'
import type { EChartsOption } from 'echarts'

const barOption = ref<EChartsOption>({ /* ... */ })
const lineOption = ref<EChartsOption>({ /* ... */ })
</script>

<template>
  <div class="charts-container">
    <v-chart :option="barOption" style="width: 50%; height: 400px" />
    <v-chart :option="lineOption" style="width: 50%; height: 400px" />
  </div>
</template>

<style scoped>
.charts-container {
  display: flex;
  gap: 16px;
}
</style>
```

## Next Steps

- Learn about all available [Props & Events](/guide/props-events)
- Explore the [Composable API](/guide/composable) for advanced use cases
- Check out [TypeScript](/guide/typescript) integration
