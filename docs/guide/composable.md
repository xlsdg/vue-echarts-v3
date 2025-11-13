# Composable API

The `useECharts` composable provides a headless, flexible API for advanced use cases where you need more control over the chart lifecycle and behavior.

## Why Use the Composable?

The composable API is useful when you:

- Need fine-grained control over chart initialization
- Want to integrate charts into custom components
- Prefer a more programmatic approach
- Need to share chart logic across components
- Want to avoid the overhead of an extra wrapper component

## Basic Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useECharts } from 'vue-echarts-v3'
import type { EChartsOption } from 'echarts'

// Register ECharts modules
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'

use([CanvasRenderer, LineChart, GridComponent, TooltipComponent])

// Create a ref for the DOM element
const chartRef = ref<HTMLElement>()

// Define your chart option
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

// Use the composable
const { chart, setOption, resize } = useECharts(chartRef, option)
</script>

<template>
  <div ref="chartRef" style="width: 600px; height: 400px" />
</template>
```

## Parameters

### `target`

- **Type:** `Ref<HTMLElement | undefined>`
- **Required:** Yes
- **Details:** A ref to the DOM element that will contain the chart

### `option`

- **Type:** `Ref<EChartsOption>`
- **Required:** Yes
- **Details:** A reactive ref containing the chart option

### `opts`

- **Type:** `UseEChartsOptions`
- **Required:** No
- **Details:** Configuration options for the composable

```typescript
interface UseEChartsOptions {
  theme?: string | object | Ref<string | object | undefined>
  initOptions?: EChartsInitOpts | Ref<EChartsInitOpts | undefined>
  updateOptions?: SetOptionOpts | Ref<SetOptionOpts | undefined>
  loading?: Ref<boolean>
  loadingOptions?: object | Ref<object | undefined>
  autoresize?: boolean | { throttle?: number }
  group?: string | Ref<string | undefined>
  manual?: boolean
}
```

### `eventHandlers`

- **Type:** `EventHandlers`
- **Required:** No
- **Details:** Event handlers for ECharts events

```typescript
type EventHandlers = Partial<Record<EChartsEventName, (event: unknown) => void>>
```

## Return Value

The composable returns an object with the following properties:

```typescript
{
  chart: Ref<EChartsType | undefined>
  setOption: (option: EChartsOption, opts?: SetOptionOpts) => void
  resize: (opts?: { width?: number; height?: number; silent?: boolean }) => void
  dispatchAction: (payload: { type: string; [key: string]: unknown }) => void
  convertToPixel: (finder: ConvertFinder, value: ScaleDataValue) => number
  convertFromPixel: (finder: ConvertFinder, value: number | number[]) => number | number[]
  containPixel: (finder: ConvertFinder, value: number[]) => boolean
  showLoading: (type?: string, opts?: object) => void
  hideLoading: () => void
  getDataURL: (opts?: ExportImageOptions) => string
  clear: () => void
  dispose: () => void
}
```

## Advanced Examples

### With Auto-Resize

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useECharts } from 'vue-echarts-v3'
import type { EChartsOption } from 'echarts'

const chartRef = ref<HTMLElement>()
const option = ref<EChartsOption>({ /* ... */ })

const { chart, resize } = useECharts(
  chartRef,
  option,
  {
    autoresize: true // Enable auto-resize
  }
)
</script>

<template>
  <div ref="chartRef" style="width: 100%; height: 400px" />
</template>
```

### With Custom Throttle

```vue
<script setup lang="ts">
const { chart } = useECharts(
  chartRef,
  option,
  {
    autoresize: { throttle: 200 } // Custom throttle in ms
  }
)
</script>
```

### With Event Handlers

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useECharts } from 'vue-echarts-v3'
import type { ECElementEvent } from 'echarts'

const chartRef = ref<HTMLElement>()
const option = ref<EChartsOption>({ /* ... */ })

const { chart } = useECharts(
  chartRef,
  option,
  {},
  {
    click: (event: unknown) => {
      const e = event as ECElementEvent
      console.log('Clicked:', e.name, e.value)
    },
    mouseover: (event: unknown) => {
      const e = event as ECElementEvent
      console.log('Mouse over:', e.seriesName)
    }
  }
)
</script>

<template>
  <div ref="chartRef" style="width: 600px; height: 400px" />
</template>
```

### With Loading State

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useECharts } from 'vue-echarts-v3'
import type { EChartsOption } from 'echarts'

const chartRef = ref<HTMLElement>()
const loading = ref(true)
const option = ref<EChartsOption>({})

// Use loading ref
const { chart } = useECharts(
  chartRef,
  option,
  {
    loading,
    loadingOptions: {
      text: 'Loading...',
      color: '#4ea397'
    }
  }
)

// Simulate data fetch
fetch('/api/data')
  .then(res => res.json())
  .then(data => {
    option.value = { /* ... process data */ }
    loading.value = false
  })
</script>

<template>
  <div ref="chartRef" style="width: 600px; height: 400px" />
</template>
```

### Manual Mode

When you want full control and disable automatic option watching:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useECharts } from 'vue-echarts-v3'
import type { EChartsOption } from 'echarts'

const chartRef = ref<HTMLElement>()
const option = ref<EChartsOption>({ /* ... */ })

const { chart, setOption } = useECharts(
  chartRef,
  option,
  {
    manual: true // Disable automatic option watching
  }
)

// Manually update the chart
const updateChart = (newData: number[]) => {
  const newOption: EChartsOption = {
    ...option.value,
    series: [{ data: newData }]
  }
  setOption(newOption)
}
</script>

<template>
  <div>
    <button @click="updateChart([100, 200, 300])">Update</button>
    <div ref="chartRef" style="width: 600px; height: 400px" />
  </div>
</template>
```

### Export Chart Image

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useECharts } from 'vue-echarts-v3'

const chartRef = ref<HTMLElement>()
const option = ref({ /* ... */ })

const { getDataURL } = useECharts(chartRef, option)

const exportImage = () => {
  const url = getDataURL({
    type: 'png',
    pixelRatio: 2,
    backgroundColor: '#fff'
  })

  // Download the image
  const link = document.createElement('a')
  link.href = url
  link.download = 'chart.png'
  link.click()
}
</script>

<template>
  <div>
    <button @click="exportImage">Export PNG</button>
    <div ref="chartRef" style="width: 600px; height: 400px" />
  </div>
</template>
```

### Custom Reusable Composable

Create your own composable that wraps `useECharts`:

```typescript
// composables/useBarChart.ts
import { ref, computed } from 'vue'
import { useECharts } from 'vue-echarts-v3'
import type { Ref } from 'vue'
import type { EChartsOption } from 'echarts'

export function useBarChart(
  target: Ref<HTMLElement | undefined>,
  data: Ref<number[]>,
  labels: Ref<string[]>
) {
  const option = computed<EChartsOption>(() => ({
    xAxis: {
      type: 'category',
      data: labels.value
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      type: 'bar',
      data: data.value
    }]
  }))

  return useECharts(target, option, {
    autoresize: true
  })
}
```

Usage:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useBarChart } from '@/composables/useBarChart'

const chartRef = ref<HTMLElement>()
const data = ref([120, 200, 150, 80, 70])
const labels = ref(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'])

const { chart } = useBarChart(chartRef, data, labels)
</script>

<template>
  <div ref="chartRef" style="width: 600px; height: 400px" />
</template>
```

## Static Utilities

The composable module also exports static ECharts utilities:

```typescript
import {
  connect,
  disconnect,
  getInstanceByDom,
  registerMap,
  getMap,
  registerTheme
} from 'vue-echarts-v3'
```

### `connect`

Connect multiple charts for synchronized interactions:

```typescript
connect('my-group')
// or
connect(['chart1', 'chart2'])
```

### `disconnect`

Disconnect chart group:

```typescript
disconnect('my-group')
```

### `registerTheme`

Register a custom theme:

```typescript
registerTheme('my-theme', {
  color: ['#fc8452', '#ea7ccc', '#91cc75'],
  backgroundColor: '#f4f4f4'
})
```

### `registerMap`

Register GeoJSON for map visualization:

```typescript
import chinaJson from './china.json'

registerMap('china', chinaJson)
```

### `getInstanceByDom`

Get ECharts instance from a DOM element:

```typescript
const instance = getInstanceByDom(document.getElementById('chart'))
```

## Comparison with Component

| Feature | Component `<VChart>` | Composable `useECharts` |
|---------|---------------------|------------------------|
| Template Integration | ✅ Easy | Requires manual div |
| Auto-resize | ✅ Via prop | ✅ Via option |
| Event Handling | ✅ Via events | Via handler object |
| Lifecycle Management | ✅ Automatic | ✅ Automatic |
| Customization | Limited to props | Full control |
| Reusability | Via component | Via custom composable |
| Bundle Size | Slightly larger | Slightly smaller |
| Use Case | Standard charts | Advanced/custom charts |

## Next Steps

- Check the [Composable API Reference](/api/composable)
- Learn about [TypeScript](/guide/typescript) usage
- Explore [Component Props](/guide/props-events)
