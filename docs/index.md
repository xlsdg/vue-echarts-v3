---
layout: home

hero:
  name: "Vue ECharts v3"
  text: "Vue 3 Wrapper for Apache ECharts"
  tagline: Lightweight, efficient, and type-safe charting solution
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/xlsdg/vue-echarts-v3

features:
  - icon: ⚡️
    title: Blazing Fast
    details: Built with Vite and optimized for Vue 3, providing lightning-fast development experience
  - icon: 🎨
    title: Rich Features
    details: Full access to Apache ECharts features with reactive Vue 3 integration
  - icon: 📦
    title: Tree Shakeable
    details: Import only what you need with lite version and selective ECharts module loading
  - icon: 🔷
    title: TypeScript First
    details: Written in TypeScript with full type definitions and strict mode enabled
  - icon: 🎯
    title: Composition API
    details: Modern Vue 3 Composition API with both component and composable interfaces
  - icon: 📱
    title: Auto Resize
    details: Built-in responsive behavior with ResizeObserver integration
---

## Quick Start

### Installation

```bash
npm install echarts vue-echarts-v3
```

### Basic Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { VChart } from 'vue-echarts-v3'
import type { EChartsOption } from 'echarts'

// Import ECharts modules
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'

use([CanvasRenderer, LineChart, GridComponent, TooltipComponent])

const option = ref<EChartsOption>({
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    data: [150, 230, 224, 218, 135, 147, 260],
    type: 'line'
  }]
})
</script>

<template>
  <v-chart :option="option" autoresize style="height: 400px" />
</template>
```

## Why Vue ECharts v3?

Vue ECharts v3 is a complete rewrite of the popular Vue 2 wrapper, designed from the ground up for Vue 3 with modern best practices:

- **Vue 3 Native**: Built specifically for Vue 3 with Composition API
- **TypeScript Strict Mode**: Full type safety with strictest TypeScript configuration
- **Modern Tooling**: Vite for builds, Vitest for testing, VitePress for docs
- **Better DX**: Hot module replacement, instant feedback, excellent IDE support
- **Production Ready**: Comprehensive test coverage, automated CI/CD, and documentation

## Browser Support

Supports all modern browsers that support Vue 3:

- Chrome ≥ 64
- Edge ≥ 79
- Firefox ≥ 78
- Safari ≥ 12

## License

[MIT](https://github.com/xlsdg/vue-echarts-v3/blob/master/LICENSE)
