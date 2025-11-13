# TypeScript

Vue ECharts v3 is written in TypeScript with **strict mode** enabled, providing comprehensive type safety and excellent IDE support.

## Type Imports

All types are exported from the main package:

```typescript
import type {
  // Component types
  VChartProps,
  VChartEmits,
  VChartExposed,

  // Composable types
  UseEChartsOptions,
  EventHandlers,

  // Utility types
  ConvertFinder,
  ScaleDataValue,
  SetOptionOpts,
  EChartsEventName,
  EChartsEventPayload
} from 'vue-echarts-v3'
```

ECharts types are imported from the `echarts` package:

```typescript
import type {
  EChartsOption,
  EChartsType,
  EChartsInitOpts,
  SetOptionOpts as EChartsSetOptionOpts,
  ECElementEvent,
  SelectChangedPayload
} from 'echarts'
```

## Component Usage

### Basic Component

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { VChart } from 'vue-echarts-v3'
import type { EChartsOption } from 'echarts'

// Type-safe option
const option = ref<EChartsOption>({
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed']
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    type: 'bar',
    data: [120, 200, 150]
  }]
})
</script>

<template>
  <v-chart :option="option" style="width: 600px; height: 400px" />
</template>
```

### Component Ref

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { VChart } from 'vue-echarts-v3'
import type { VChartExposed } from 'vue-echarts-v3'
import type { EChartsOption } from 'echarts'

// Type the ref
const chartRef = ref<VChartExposed>()
const option = ref<EChartsOption>({ /* ... */ })

onMounted(() => {
  // All methods are typed
  chartRef.value?.resize()
  const instance = chartRef.value?.getInstance()

  // Export with type-safe options
  const url = chartRef.value?.getDataURL({
    type: 'png',
    pixelRatio: 2,
    backgroundColor: '#fff'
  })
})
</script>

<template>
  <v-chart ref="chartRef" :option="option" />
</template>
```

### Event Handlers

```vue
<script setup lang="ts">
import type { ECElementEvent, SelectChangedPayload } from 'echarts'

// Type-safe event handlers
const handleClick = (event: ECElementEvent) => {
  console.log('Clicked:', event.name, event.value)
  console.log('Series:', event.seriesName)
}

const handleLegendChange = (payload: SelectChangedPayload) => {
  console.log('Legend selection:', payload.selected)
}
</script>

<template>
  <v-chart
    :option="option"
    @click="handleClick"
    @legendselectchanged="handleLegendChange"
  />
</template>
```

### Props Typing

```vue
<script setup lang="ts">
import type { VChartProps } from 'vue-echarts-v3'
import type { EChartsOption } from 'echarts'

// Define props with types
interface Props {
  chartOption: EChartsOption
  loading?: boolean
  theme?: string | object
}

const props = defineProps<Props>()
</script>

<template>
  <v-chart
    :option="props.chartOption"
    :loading="props.loading"
    :theme="props.theme"
  />
</template>
```

## Composable Usage

### Basic Composable

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useECharts } from 'vue-echarts-v3'
import type { UseEChartsOptions } from 'vue-echarts-v3'
import type { EChartsOption } from 'echarts'

const chartRef = ref<HTMLElement>()
const option = ref<EChartsOption>({ /* ... */ })

// Type-safe options
const opts: UseEChartsOptions = {
  theme: 'dark',
  autoresize: true,
  initOptions: {
    renderer: 'svg'
  }
}

// All returned methods are typed
const {
  chart,
  setOption,
  resize,
  getDataURL,
  clear,
  dispose
} = useECharts(chartRef, option, opts)
</script>

<template>
  <div ref="chartRef" style="width: 600px; height: 400px" />
</template>
```

### With Event Handlers

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useECharts } from 'vue-echarts-v3'
import type { EventHandlers } from 'vue-echarts-v3'
import type { ECElementEvent } from 'echarts'

const chartRef = ref<HTMLElement>()
const option = ref({ /* ... */ })

// Type-safe event handlers
const eventHandlers: EventHandlers = {
  click: (event: unknown) => {
    const e = event as ECElementEvent
    console.log('Clicked:', e.name, e.value)
  },
  mouseover: (event: unknown) => {
    const e = event as ECElementEvent
    console.log('Hovering:', e.seriesName)
  }
}

const { chart } = useECharts(chartRef, option, {}, eventHandlers)
</script>
```

## Advanced Types

### Custom Option Types

Create typed option builders:

```typescript
import type { EChartsOption, BarSeriesOption } from 'echarts'

// Type-safe option builder
function createBarChart(
  data: number[],
  labels: string[]
): EChartsOption {
  return {
    xAxis: {
      type: 'category',
      data: labels
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      type: 'bar',
      data
    } as BarSeriesOption]
  }
}

// Usage
const option = ref(createBarChart([120, 200, 150], ['A', 'B', 'C']))
```

### Generic Chart Component

Create a typed generic chart wrapper:

```vue
<!-- ChartWrapper.vue -->
<script setup lang="ts" generic="T extends Record<string, unknown>">
import { computed } from 'vue'
import { VChart } from 'vue-echarts-v3'
import type { EChartsOption } from 'echarts'

interface Props {
  data: T[]
  toOption: (data: T[]) => EChartsOption
  loading?: boolean
}

const props = defineProps<Props>()

const option = computed(() => props.toOption(props.data))
</script>

<template>
  <v-chart :option="option" :loading="loading" />
</template>
```

Usage:

```vue
<script setup lang="ts">
import ChartWrapper from './ChartWrapper.vue'
import type { EChartsOption } from 'echarts'

interface SalesData {
  month: string
  revenue: number
}

const salesData: SalesData[] = [
  { month: 'Jan', revenue: 1200 },
  { month: 'Feb', revenue: 1500 }
]

const toOption = (data: SalesData[]): EChartsOption => ({
  xAxis: {
    type: 'category',
    data: data.map(d => d.month)
  },
  yAxis: { type: 'value' },
  series: [{
    type: 'bar',
    data: data.map(d => d.revenue)
  }]
})
</script>

<template>
  <chart-wrapper :data="salesData" :to-option="toOption" />
</template>
```

### Custom Composable with Types

```typescript
// composables/useLineChart.ts
import { ref, computed } from 'vue'
import { useECharts } from 'vue-echarts-v3'
import type { Ref } from 'vue'
import type { EChartsOption } from 'echarts'

export interface LineChartData {
  name: string
  values: number[]
}

export interface LineChartOptions {
  title?: string
  smooth?: boolean
  showSymbol?: boolean
}

export function useLineChart(
  target: Ref<HTMLElement | undefined>,
  data: Ref<LineChartData[]>,
  labels: Ref<string[]>,
  options: LineChartOptions = {}
) {
  const chartOption = computed<EChartsOption>(() => ({
    title: options.title ? { text: options.title } : undefined,
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: data.value.map(d => d.name)
    },
    xAxis: {
      type: 'category',
      data: labels.value
    },
    yAxis: {
      type: 'value'
    },
    series: data.value.map(d => ({
      name: d.name,
      type: 'line',
      data: d.values,
      smooth: options.smooth ?? false,
      showSymbol: options.showSymbol ?? true
    }))
  }))

  return useECharts(target, chartOption, {
    autoresize: true
  })
}
```

Usage:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useLineChart } from '@/composables/useLineChart'
import type { LineChartData } from '@/composables/useLineChart'

const chartRef = ref<HTMLElement>()

const data = ref<LineChartData[]>([
  { name: 'Sales', values: [120, 200, 150, 80, 70] },
  { name: 'Costs', values: [80, 120, 100, 50, 40] }
])

const labels = ref(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'])

const { chart } = useLineChart(chartRef, data, labels, {
  title: 'Sales vs Costs',
  smooth: true
})
</script>

<template>
  <div ref="chartRef" style="width: 100%; height: 400px" />
</template>
```

## Type Utilities

### ConvertFinder

Type for coordinate system conversion:

```typescript
import type { ConvertFinder } from 'vue-echarts-v3'

const finder: ConvertFinder = {
  seriesIndex: 0
}

// or
const finder: ConvertFinder = 'grid'

// Use in conversion
const pixel = chartRef.value?.convertToPixel(finder, [100, 200])
```

### Event Types

All ECharts events are properly typed:

```typescript
import type {
  ECElementEvent,
  SelectChangedPayload
} from 'echarts'

const onClick = (event: ECElementEvent) => {
  // event properties are typed
  console.log(event.componentType) // 'series'
  console.log(event.seriesType) // 'bar' | 'line' | etc
  console.log(event.name) // string
  console.log(event.value) // number | string | etc
}

const onLegendChange = (payload: SelectChangedPayload) => {
  // payload properties are typed
  console.log(payload.type) // 'legendselectchanged'
  console.log(payload.selected) // Record<string, boolean>
}
```

## Type Safety Best Practices

### 1. Always Type Options

```typescript
// ✅ Good
const option = ref<EChartsOption>({
  // ...
})

// ❌ Bad
const option = ref({
  // ... type inference may not work correctly
})
```

### 2. Type Component Refs

```typescript
// ✅ Good
const chartRef = ref<VChartExposed>()

// ❌ Bad
const chartRef = ref()
```

### 3. Use Import Type

```typescript
// ✅ Good - import only types
import type { EChartsOption } from 'echarts'

// ❌ Avoid - imports runtime code
import { EChartsOption } from 'echarts'
```

### 4. Type Event Handlers

```typescript
// ✅ Good
const onClick = (event: ECElementEvent) => {
  console.log(event.name)
}

// ❌ Bad
const onClick = (event: any) => {
  console.log(event.name)
}
```

## IDE Support

Vue ECharts v3 provides excellent IDE support:

- ✅ Autocomplete for all props and methods
- ✅ Type checking for options and events
- ✅ IntelliSense for ECharts configuration
- ✅ Go to definition for types
- ✅ Inline documentation

### VS Code Setup

For the best experience in VS Code:

1. Install [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
2. Install [TypeScript Vue Plugin](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
3. Enable TypeScript takeover mode

## Next Steps

- Explore [Type Definitions Reference](/api/types)
- Check [Component API](/api/component)
- Learn about [Composable API](/api/composable)
