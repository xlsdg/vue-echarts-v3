# vue-echarts-v3

[![npm](https://img.shields.io/npm/v/vue-echarts-v3.svg)](https://www.npmjs.com/package/vue-echarts-v3)
[![vue3](https://img.shields.io/badge/vue-3.x-brightgreen.svg)](https://vuejs.org/)
[![echarts](https://img.shields.io/badge/echarts-5.x-brightgreen.svg)](https://echarts.apache.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue.svg)](https://www.typescriptlang.org/)
[![license](https://img.shields.io/npm/l/vue-echarts-v3.svg)](https://github.com/xlsdg/vue-echarts-v3/blob/master/LICENSE)

> Vue.js 3 component wrapper for [Apache ECharts](https://echarts.apache.org/)

## ✨ Features

- ⚡️ **Vue 3 Native** - Built with Composition API for Vue 3
- 📦 **Tree Shakeable** - Lite version with selective ECharts imports
- 🔷 **TypeScript First** - Written in TypeScript with strict mode
- 📱 **Auto Resize** - Built-in responsive behavior with ResizeObserver
- 🎯 **Composable API** - Both component and composable interfaces
- ⚡️ **Lightweight** - Minimal overhead, efficient event binding
- 🎨 **Full-Featured** - Complete access to all ECharts capabilities

## 📦 Installation

```bash
npm install echarts vue-echarts-v3
```

## 🚀 Quick Start

### 1. Import and Register ECharts Modules

```typescript
// main.ts
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, BarChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  TitleComponent
} from 'echarts/components'

use([
  CanvasRenderer,
  LineChart,
  BarChart,
  GridComponent,
  TooltipComponent,
  TitleComponent
])
```

### 2. Use the Component

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { VChart } from 'vue-echarts-v3'
import type { EChartsOption } from 'echarts'

const option = ref<EChartsOption>({
  title: { text: 'ECharts Example' },
  tooltip: {},
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: { type: 'value' },
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

## 📖 Usage Modes

### Full Version

Import all ECharts modules:

```typescript
import { VChart } from 'vue-echarts-v3'
```

### Lite Version (Recommended)

Import only the core and manually register required components for smaller bundle size:

```typescript
import { VChart } from 'vue-echarts-v3/lite'

// Then import and register only what you need
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
// ... other imports
```

### Composable API

For more control, use the composable directly:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useECharts } from 'vue-echarts-v3'
import type { EChartsOption } from 'echarts'

const chartRef = ref<HTMLElement>()
const option = ref<EChartsOption>({ /* ... */ })

const { chart, setOption, resize } = useECharts(
  chartRef,
  option,
  { autoresize: true }
)
</script>

<template>
  <div ref="chartRef" style="width: 600px; height: 400px" />
</template>
```

## 🔧 Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `option` | `EChartsOption` | **required** | ECharts option configuration |
| `theme` | `string \| object` | - | Theme to apply |
| `initOptions` | `EChartsInitOpts` | - | Initialization options |
| `updateOptions` | `SetOptionOpts` | `{ notMerge: false, lazyUpdate: false }` | Update options for setOption |
| `loading` | `boolean` | `false` | Show loading animation |
| `loadingOptions` | `object` | - | Loading animation options |
| `autoresize` | `boolean \| object` | `false` | Enable auto-resize on container size change |
| `group` | `string` | - | Group name for chart connection |

## 📡 Component Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `ready` | `(instance: EChartsType)` | Emitted when chart is initialized |
| `resize` | `(width: number, height: number)` | Emitted when chart is resized |
| `click` | `(event: ECElementEvent)` | Mouse click event |
| `dblclick` | `(event: ECElementEvent)` | Mouse double-click event |
| ... | ... | All ECharts events are supported |

## 🛠️ Exposed Methods

Access chart instance methods via template ref:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { VChartExposed } from 'vue-echarts-v3'

const chartRef = ref<VChartExposed>()

const exportImage = () => {
  const url = chartRef.value?.getDataURL({
    type: 'png',
    pixelRatio: 2
  })
  // ... download url
}
</script>

<template>
  <v-chart ref="chartRef" :option="option" />
</template>
```

Available methods:

- `getInstance()` - Get ECharts instance
- `setOption(option, opts?)` - Set chart option
- `resize(opts?)` - Resize chart
- `dispatchAction(payload)` - Dispatch action
- `showLoading(type?, opts?)` - Show loading
- `hideLoading()` - Hide loading
- `getDataURL(opts?)` - Get data URL
- `clear()` - Clear chart
- `dispose()` - Dispose instance

## 📚 Documentation

For detailed documentation, visit: [https://xlsdg.github.io/vue-echarts-v3/](https://xlsdg.github.io/vue-echarts-v3/)

## 🎨 Demo

Live demo: [https://xlsdg.github.io/vue-echarts-v3/demo](https://xlsdg.github.io/vue-echarts-v3/demo)

## 🔄 Migration from v2

This is a major version upgrade with breaking changes. See the [Migration Guide](https://xlsdg.github.io/vue-echarts-v3/guide/migration) for details.

Key changes:

- Vue 3 only (no Vue 2 support)
- TypeScript rewrite with strict mode
- Composition API instead of Options API
- ResizeObserver instead of element-resize-detector
- New composable API
- Updated prop names and event signatures

## 💻 Development

```bash
# Install dependencies
npm install

# Run demo
npm run dev

# Build library
npm run build

# Run tests
npm test

# Type check
npm run type-check

# Lint
npm run lint
```

## 📄 License

[MIT](https://github.com/xlsdg/vue-echarts-v3/blob/master/LICENSE)

## 🙏 Credits

- [Apache ECharts](https://echarts.apache.org/) - Powerful charting library
- [Vue.js](https://vuejs.org/) - Progressive JavaScript framework
