# Getting Started

## Introduction

Vue ECharts v3 is a Vue.js 3 component wrapper for [Apache ECharts](https://echarts.apache.org/). It provides a seamless integration between Vue 3's reactivity system and ECharts' powerful charting capabilities.

### Features

- 🚀 **Vue 3 Native** - Built with Composition API for Vue 3
- 📦 **Tree Shakeable** - Lite version with selective imports
- 🔷 **TypeScript** - Full type definitions with strict mode
- 📱 **Responsive** - Auto-resize with ResizeObserver
- ⚡️ **Performant** - Optimized rendering with shallowRef
- 🎯 **Composable** - Both component and composable APIs

## Installation

::: code-group

```bash [npm]
npm install echarts vue-echarts-v3
```

```bash [pnpm]
pnpm add echarts vue-echarts-v3
```

```bash [yarn]
yarn add echarts vue-echarts-v3
```

:::

## Quick Start

### 1. Import Required Modules

First, import and register the ECharts components you need:

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'

// Import ECharts modules
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, BarChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent
} from 'echarts/components'

// Register the required components
use([
  CanvasRenderer,
  LineChart,
  BarChart,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent
])

createApp(App).mount('#app')
```

### 2. Use the Component

Then use the `VChart` component in your Vue templates:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { VChart } from 'vue-echarts-v3'
import type { EChartsOption } from 'echarts'

const option = ref<EChartsOption>({
  title: {
    text: 'My First Chart'
  },
  tooltip: {},
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    name: 'Sales',
    type: 'bar',
    data: [5, 20, 36, 10, 10, 20, 30]
  }]
})
</script>

<template>
  <v-chart
    :option="option"
    autoresize
    style="width: 100%; height: 400px"
  />
</template>
```

## Global Registration

If you want to use the component globally:

```ts
// main.ts
import { createApp } from 'vue'
import { VChart } from 'vue-echarts-v3'
import App from './App.vue'

const app = createApp(App)
app.component('VChart', VChart)
app.mount('#app')
```

## CDN Usage

For prototyping or simple projects, you can use vue-echarts-v3 via CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/vue@3"></script>
<script src="https://cdn.jsdelivr.net/npm/echarts@5"></script>
<script src="https://cdn.jsdelivr.net/npm/vue-echarts-v3@3"></script>

<div id="app">
  <v-chart :option="option" style="width: 600px; height: 400px"></v-chart>
</div>

<script>
const { createApp, ref } = Vue
const { VChart } = VueECharts

createApp({
  components: { VChart },
  setup() {
    const option = ref({
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [120, 200, 150, 80, 70],
        type: 'bar'
      }]
    })
    return { option }
  }
}).mount('#app')
</script>
```

## Next Steps

- Learn about [Props & Events](/guide/props-events)
- Explore the [Composable API](/guide/composable)
- Check out [TypeScript Usage](/guide/typescript)
- See the [API Reference](/api/component)
