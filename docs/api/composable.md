# Composable API

Complete API reference for the `useECharts` composable and related utilities.

## useECharts

A headless composable for using ECharts in Vue 3 with full lifecycle management.

### Import

```typescript
import { useECharts } from 'vue-echarts-v3'
```

### Signature

```typescript
function useECharts(
  target: Ref<HTMLElement | undefined>,
  option: Ref<EChartsOption>,
  opts?: UseEChartsOptions,
  eventHandlers?: EventHandlers
): {
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

### Parameters

#### `target` <Badge type="danger" text="required" />

- **Type:** `Ref<HTMLElement | undefined>`
- **Details:**

  A Vue ref pointing to the DOM element that will contain the chart.

  ```vue
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useECharts } from 'vue-echarts-v3'

  const chartRef = ref<HTMLElement>()
  const option = ref({ /* ... */ })

  useECharts(chartRef, option)
  </script>

  <template>
    <div ref="chartRef" style="width: 600px; height: 400px" />
  </template>
  ```

---

#### `option` <Badge type="danger" text="required" />

- **Type:** `Ref<EChartsOption>`
- **Details:**

  A reactive ref containing the chart configuration.

  ```typescript
  const option = ref<EChartsOption>({
    xAxis: { type: 'category', data: ['A', 'B', 'C'] },
    yAxis: { type: 'value' },
    series: [{ data: [120, 200, 150], type: 'bar' }]
  })
  ```

  The chart automatically updates when the option changes (unless `manual: true`).

---

#### `opts`

- **Type:** `UseEChartsOptions`
- **Default:** `{}`
- **Details:**

  Configuration options for the composable.

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

  **Properties:**

  | Property | Type | Default | Description |
  |----------|------|---------|-------------|
  | `theme` | `string \| object \| Ref` | `undefined` | Theme name or object |
  | `initOptions` | `EChartsInitOpts \| Ref` | `undefined` | Initialization options |
  | `updateOptions` | `SetOptionOpts \| Ref` | `{ notMerge: false, lazyUpdate: false }` | Update options |
  | `loading` | `Ref<boolean>` | `undefined` | Loading state |
  | `loadingOptions` | `object \| Ref` | `undefined` | Loading animation config |
  | `autoresize` | `boolean \| { throttle?: number }` | `false` | Enable auto-resize |
  | `group` | `string \| Ref` | `undefined` | Chart group name |
  | `manual` | `boolean` | `false` | Disable automatic updates |

  **Examples:**

  ```typescript
  // Basic options
  const { chart } = useECharts(chartRef, option, {
    theme: 'dark',
    autoresize: true
  })

  // With reactive refs
  const loading = ref(true)
  const theme = ref('light')

  const { chart } = useECharts(chartRef, option, {
    theme,
    loading,
    autoresize: { throttle: 200 }
  })

  // Manual mode
  const { chart, setOption } = useECharts(chartRef, option, {
    manual: true
  })

  // Update manually
  setOption(newOption)
  ```

---

#### `eventHandlers`

- **Type:** `EventHandlers`
- **Default:** `{}`
- **Details:**

  Event handlers for ECharts events.

  ```typescript
  type EventHandlers = Partial<Record<EChartsEventName, (event: unknown) => void>>
  ```

  ```typescript
  import type { ECElementEvent } from 'echarts'

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
        console.log('Hovering:', e.seriesName)
      },
      legendselectchanged: (event: unknown) => {
        console.log('Legend changed:', event)
      }
    }
  )
  ```

---

### Return Value

The composable returns an object with the following properties and methods:

#### `chart`

- **Type:** `Ref<EChartsType | undefined>`
- **Details:**

  A reactive ref containing the ECharts instance.

  ```typescript
  const { chart } = useECharts(chartRef, option)

  // Access instance
  watchEffect(() => {
    if (chart.value) {
      console.log('Chart ready')
    }
  })
  ```

---

#### `setOption()`

- **Type:** `(option: EChartsOption, opts?: SetOptionOpts) => void`
- **Details:**

  Set chart option manually.

  ```typescript
  const { setOption } = useECharts(chartRef, option)

  setOption(newOption, {
    notMerge: true,
    lazyUpdate: false
  })
  ```

---

#### `resize()`

- **Type:** `(opts?: { width?: number; height?: number; silent?: boolean }) => void`
- **Details:**

  Resize the chart.

  ```typescript
  const { resize } = useECharts(chartRef, option)

  // Auto-detect size
  resize()

  // Specific size
  resize({ width: 800, height: 600 })
  ```

---

#### `dispatchAction()`

- **Type:** `(payload: { type: string; [key: string]: unknown }) => void`
- **Details:**

  Dispatch ECharts actions.

  ```typescript
  const { dispatchAction } = useECharts(chartRef, option)

  dispatchAction({
    type: 'highlight',
    seriesIndex: 0,
    dataIndex: 1
  })
  ```

---

#### `convertToPixel()`

- **Type:** `(finder: ConvertFinder, value: ScaleDataValue) => number`
- **Details:**

  Convert logical value to pixel coordinate.

  ```typescript
  const { convertToPixel } = useECharts(chartRef, option)

  const pixel = convertToPixel({ seriesIndex: 0 }, [100, 200])
  ```

---

#### `convertFromPixel()`

- **Type:** `(finder: ConvertFinder, value: number | number[]) => number | number[]`
- **Details:**

  Convert pixel coordinate to logical value.

  ```typescript
  const { convertFromPixel } = useECharts(chartRef, option)

  const value = convertFromPixel({ seriesIndex: 0 }, [300, 400])
  ```

---

#### `containPixel()`

- **Type:** `(finder: ConvertFinder, value: number[]) => boolean`
- **Details:**

  Check if a pixel is in the coordinate system.

  ```typescript
  const { containPixel } = useECharts(chartRef, option)

  const isInside = containPixel('grid', [300, 400])
  ```

---

#### `showLoading()`

- **Type:** `(type?: string, opts?: object) => void`
- **Details:**

  Show loading animation.

  ```typescript
  const { showLoading } = useECharts(chartRef, option)

  showLoading('default', {
    text: 'Loading...',
    color: '#4ea397'
  })
  ```

---

#### `hideLoading()`

- **Type:** `() => void`
- **Details:**

  Hide loading animation.

  ```typescript
  const { hideLoading } = useECharts(chartRef, option)

  hideLoading()
  ```

---

#### `getDataURL()`

- **Type:** `(opts?: ExportImageOptions) => string`
- **Details:**

  Export chart as base64 image.

  ```typescript
  const { getDataURL } = useECharts(chartRef, option)

  const url = getDataURL({
    type: 'png',
    pixelRatio: 2,
    backgroundColor: '#fff'
  })
  ```

---

#### `clear()`

- **Type:** `() => void`
- **Details:**

  Clear chart content.

  ```typescript
  const { clear } = useECharts(chartRef, option)

  clear()
  ```

---

#### `dispose()`

- **Type:** `() => void`
- **Details:**

  Dispose the chart instance.

  ```typescript
  const { dispose } = useECharts(chartRef, option)

  // Cleanup when component unmounts
  onBeforeUnmount(() => {
    dispose()
  })
  ```

  ::: info
  The composable automatically calls `dispose()` on `onBeforeUnmount`, so you usually don't need to call it manually.
  :::

---

## Static Utilities

These are utility functions exported from the composable module.

### connect

Connect multiple charts for synchronized interactions.

```typescript
import { connect } from 'vue-echarts-v3'

// Connect by group name
connect('my-group')

// Connect multiple instances
connect([chart1, chart2, chart3])
```

**Signature:**

```typescript
function connect(group: string | EChartsType[]): void
```

---

### disconnect

Disconnect a chart group.

```typescript
import { disconnect } from 'vue-echarts-v3'

disconnect('my-group')
```

**Signature:**

```typescript
function disconnect(group: string): void
```

---

### getInstanceByDom

Get ECharts instance from a DOM element.

```typescript
import { getInstanceByDom } from 'vue-echarts-v3'

const element = document.getElementById('chart')
const instance = getInstanceByDom(element)
```

**Signature:**

```typescript
function getInstanceByDom(target: HTMLElement): EChartsType | undefined
```

---

### registerMap

Register GeoJSON for map visualizations.

```typescript
import { registerMap } from 'vue-echarts-v3'
import chinaJson from './china.json'

registerMap('china', chinaJson)
```

**Signature:**

```typescript
function registerMap(
  mapName: string,
  geoJson: GeoJSON,
  specialAreas?: Record<string, unknown>
): void
```

**Example with special areas:**

```typescript
registerMap('USA', usaJson, {
  Alaska: {
    left: -131,
    top: 25,
    width: 15
  },
  Hawaii: {
    left: -110,
    top: 28,
    width: 5
  }
})
```

---

### getMap

Get registered map data.

```typescript
import { getMap } from 'vue-echarts-v3'

const mapData = getMap('china')
```

**Signature:**

```typescript
function getMap(mapName: string): GeoJSON | undefined
```

---

### registerTheme

Register a custom theme.

```typescript
import { registerTheme } from 'vue-echarts-v3'

registerTheme('my-theme', {
  color: [
    '#fc8452',
    '#ea7ccc',
    '#91cc75',
    '#fac858',
    '#ee6666',
    '#73c0de',
    '#3ba272',
    '#5470c6'
  ],
  backgroundColor: '#f4f4f4',
  textStyle: {
    color: '#333'
  },
  title: {
    textStyle: {
      color: '#333'
    }
  }
})
```

**Signature:**

```typescript
function registerTheme(themeName: string, theme: object): void
```

**Usage:**

```vue
<script setup lang="ts">
const { chart } = useECharts(chartRef, option, {
  theme: 'my-theme'
})
</script>
```

---

## Complete Example

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useECharts, registerTheme } from 'vue-echarts-v3'
import type { EChartsOption, ECElementEvent } from 'echarts'

// Register custom theme
registerTheme('custom', {
  color: ['#fc8452', '#ea7ccc', '#91cc75']
})

// Refs
const chartRef = ref<HTMLElement>()
const loading = ref(true)

// Chart option
const option = ref<EChartsOption>({
  title: { text: 'Sales Data' },
  tooltip: {},
  legend: {},
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

// Event handlers
const eventHandlers = {
  click: (event: unknown) => {
    const e = event as ECElementEvent
    console.log('Clicked:', e.name, e.value)
  }
}

// Use composable
const {
  chart,
  setOption,
  resize,
  getDataURL,
  clear
} = useECharts(
  chartRef,
  option,
  {
    theme: 'custom',
    loading,
    autoresize: { throttle: 200 }
  },
  eventHandlers
)

// Fetch data
onMounted(async () => {
  const data = await fetch('/api/sales').then(r => r.json())
  option.value = {
    ...option.value,
    series: [{ ...option.value.series[0], data }]
  }
  loading.value = false
})

// Export chart
const exportChart = () => {
  const url = getDataURL({
    type: 'png',
    pixelRatio: 2,
    backgroundColor: '#fff'
  })
  const link = document.createElement('a')
  link.href = url
  link.download = 'chart.png'
  link.click()
}

// Update data
const updateData = () => {
  setOption({
    ...option.value,
    series: [{
      ...option.value.series[0],
      data: [150, 230, 180, 100, 90]
    }]
  })
}
</script>

<template>
  <div>
    <div class="controls">
      <button @click="updateData">Update Data</button>
      <button @click="exportChart">Export PNG</button>
      <button @click="clear">Clear</button>
      <button @click="resize">Resize</button>
    </div>
    <div ref="chartRef" class="chart" />
  </div>
</template>

<style scoped>
.controls {
  margin-bottom: 16px;
}

.chart {
  width: 100%;
  height: 500px;
}
</style>
```

## Type Definitions

```typescript
import type {
  UseEChartsOptions,  // Composable options type
  EventHandlers,      // Event handlers type
  GeoJSON            // GeoJSON type for maps
} from 'vue-echarts-v3'
```

See the [Types API Reference](/api/types) for detailed type definitions.

## See Also

- [Composable Guide](/guide/composable)
- [Component API](/api/component)
- [Types Reference](/api/types)
