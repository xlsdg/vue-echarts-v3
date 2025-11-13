# Types

Complete TypeScript type definitions reference for vue-echarts-v3.

## Component Types

### VChartProps

Props type for the `VChart` component.

```typescript
import type { VChartProps } from 'vue-echarts-v3'
```

**Definition:**

```typescript
interface VChartProps {
  option: EChartsOption
  theme?: string | object
  initOptions?: EChartsInitOpts
  updateOptions?: SetOptionOpts
  loading?: boolean
  loadingOptions?: object
  autoresize?: boolean | { throttle?: number }
  group?: string
}
```

**Usage:**

```vue
<script setup lang="ts">
import type { VChartProps } from 'vue-echarts-v3'

const props: VChartProps = {
  option: {
    // ... your option
  },
  theme: 'dark',
  autoresize: true
}
</script>
```

---

### VChartEmits

Emits type for component events.

```typescript
import type { VChartEmits } from 'vue-echarts-v3'
```

**Definition:**

```typescript
interface VChartEmits {
  (e: 'ready', instance: EChartsType): void
  (e: 'resize', width: number, height: number): void

  // Mouse events
  (e: 'click', event: ECElementEvent): void
  (e: 'dblclick', event: ECElementEvent): void
  (e: 'mousedown', event: ECElementEvent): void
  (e: 'mousemove', event: ECElementEvent): void
  (e: 'mouseup', event: ECElementEvent): void
  (e: 'mouseover', event: ECElementEvent): void
  (e: 'mouseout', event: ECElementEvent): void
  (e: 'globalout', event: ECElementEvent): void
  (e: 'contextmenu', event: ECElementEvent): void

  // Component events
  (e: 'legendselectchanged', event: SelectChangedPayload): void
  (e: 'legendselected', event: EChartsEventPayload): void
  (e: 'legendunselected', event: EChartsEventPayload): void
  (e: 'datazoom', event: EChartsEventPayload): void
  (e: 'datarangeselected', event: EChartsEventPayload): void
  (e: 'timelinechanged', event: EChartsEventPayload): void
  (e: 'timelineplaychanged', event: EChartsEventPayload): void
  (e: 'restore', event: EChartsEventPayload): void
  (e: 'dataviewchanged', event: EChartsEventPayload): void
  (e: 'magictypechanged', event: EChartsEventPayload): void
  (e: 'geoselectchanged', event: SelectChangedPayload): void
  (e: 'geoselected', event: EChartsEventPayload): void
  (e: 'geounselected', event: EChartsEventPayload): void
  (e: 'pieselectchanged', event: SelectChangedPayload): void
  (e: 'pieselected', event: EChartsEventPayload): void
  (e: 'pieunselected', event: EChartsEventPayload): void
  (e: 'mapselectchanged', event: SelectChangedPayload): void
  (e: 'mapselected', event: EChartsEventPayload): void
  (e: 'mapunselected', event: EChartsEventPayload): void
  (e: 'axisareaselected', event: EChartsEventPayload): void
  (e: 'brush', event: EChartsEventPayload): void
  (e: 'brushselected', event: EChartsEventPayload): void
  (e: 'brushEnd', event: EChartsEventPayload): void
  (e: 'rendered', event: EChartsEventPayload): void
  (e: 'finished', event: EChartsEventPayload): void
}
```

---

### VChartExposed

Type for methods exposed by the component via template ref.

```typescript
import type { VChartExposed } from 'vue-echarts-v3'
```

**Definition:**

```typescript
interface VChartExposed {
  getInstance: () => EChartsType | undefined
  setOption: (option: EChartsOption, opts?: SetOptionOpts) => void
  resize: (opts?: { width?: number; height?: number; silent?: boolean }) => void
  dispatchAction: (payload: { type: string; [key: string]: unknown }) => void
  convertToPixel: (finder: ConvertFinder, value: ScaleDataValue) => number
  convertFromPixel: {
    (finder: ConvertFinder, value: number): number
    (finder: ConvertFinder, value: number[]): number[]
  }
  containPixel: (finder: ConvertFinder, value: number[]) => boolean
  showLoading: (type?: string, opts?: object) => void
  hideLoading: () => void
  getDataURL: (opts?: {
    type?: 'png' | 'jpeg' | 'svg'
    pixelRatio?: number
    backgroundColor?: string
    excludeComponents?: string[]
  }) => string
  clear: () => void
  dispose: () => void
}
```

**Usage:**

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { VChartExposed } from 'vue-echarts-v3'

const chartRef = ref<VChartExposed>()

const resize = () => {
  chartRef.value?.resize()
}
</script>

<template>
  <v-chart ref="chartRef" :option="option" />
</template>
```

---

## Composable Types

### UseEChartsOptions

Options for the `useECharts` composable.

```typescript
import type { UseEChartsOptions } from 'vue-echarts-v3'
```

**Definition:**

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

**Usage:**

```typescript
const options: UseEChartsOptions = {
  theme: 'dark',
  autoresize: true,
  manual: false
}

const { chart } = useECharts(chartRef, option, options)
```

---

### EventHandlers

Type for event handler map.

```typescript
import type { EventHandlers } from 'vue-echarts-v3'
```

**Definition:**

```typescript
type EventHandlers = Partial<Record<EChartsEventName, (event: unknown) => void>>
```

**Usage:**

```typescript
import type { ECElementEvent } from 'echarts'

const handlers: EventHandlers = {
  click: (event: unknown) => {
    const e = event as ECElementEvent
    console.log(e.name, e.value)
  },
  mouseover: (event: unknown) => {
    console.log('hover')
  }
}

useECharts(chartRef, option, {}, handlers)
```

---

## Utility Types

### SetOptionOpts

Extended ECharts SetOptionOpts with manual flag.

```typescript
import type { SetOptionOpts } from 'vue-echarts-v3'
```

**Definition:**

```typescript
interface SetOptionOpts extends EChartsSetOptionOpts {
  notMerge?: boolean
  lazyUpdate?: boolean
  silent?: boolean
  manual?: boolean
}
```

---

### ConvertFinder

Type for coordinate system finder.

```typescript
import type { ConvertFinder } from 'vue-echarts-v3'
```

**Definition:**

```typescript
type ConvertFinder =
  | string
  | {
      seriesIndex?: number
      seriesId?: string
      seriesName?: string
      geoIndex?: number
      geoId?: string
      geoName?: string
      xAxisIndex?: number
      xAxisId?: string
      xAxisName?: string
      yAxisIndex?: number
      yAxisId?: string
      yAxisName?: string
      gridIndex?: number
      gridId?: string
      gridName?: string
    }
```

**Usage:**

```typescript
// String finder
const finder1: ConvertFinder = 'grid'

// Object finder
const finder2: ConvertFinder = {
  seriesIndex: 0
}

const finder3: ConvertFinder = {
  xAxisIndex: 0,
  yAxisIndex: 0
}
```

---

### ScaleDataValue

Type for scale data values.

```typescript
import type { ScaleDataValue } from 'vue-echarts-v3'
```

**Definition:**

```typescript
type ScaleDataValue = string | number | Date
```

---

### EChartsEventName

Union type of all supported event names.

```typescript
import type { EChartsEventName } from 'vue-echarts-v3'
```

**Definition:**

```typescript
type EChartsEventName =
  | 'click'
  | 'dblclick'
  | 'mousedown'
  | 'mousemove'
  | 'mouseup'
  | 'mouseover'
  | 'mouseout'
  | 'globalout'
  | 'contextmenu'
  | 'legendselectchanged'
  | 'legendselected'
  | 'legendunselected'
  | 'datazoom'
  | 'datarangeselected'
  | 'timelinechanged'
  | 'timelineplaychanged'
  | 'restore'
  | 'dataviewchanged'
  | 'magictypechanged'
  | 'geoselectchanged'
  | 'geoselected'
  | 'geounselected'
  | 'pieselectchanged'
  | 'pieselected'
  | 'pieunselected'
  | 'mapselectchanged'
  | 'mapselected'
  | 'mapunselected'
  | 'axisareaselected'
  | 'brush'
  | 'brushselected'
  | 'brushEnd'
  | 'rendered'
  | 'finished'
```

---

### EChartsEventPayload

Generic payload type for events without specific definitions.

```typescript
import type { EChartsEventPayload } from 'vue-echarts-v3'
```

**Definition:**

```typescript
type EChartsEventPayload = Record<string, unknown>
```

---

### ResizeConfig

Configuration for resize behavior.

```typescript
import type { ResizeConfig } from 'vue-echarts-v3'
```

**Definition:**

```typescript
interface ResizeConfig {
  throttle?: number
}
```

---

### GeoJSON

Type for GeoJSON data used in maps.

```typescript
import type { GeoJSON } from 'vue-echarts-v3'
```

**Definition:**

```typescript
type GeoJSON = Record<string, unknown>
```

**Usage:**

```typescript
import chinaJson from './china.json'
import { registerMap } from 'vue-echarts-v3'
import type { GeoJSON } from 'vue-echarts-v3'

registerMap('china', chinaJson as GeoJSON)
```

---

## ECharts Types

These types are re-exported from the `echarts` package for convenience:

### EChartsOption

The main chart configuration type.

```typescript
import type { EChartsOption } from 'echarts'
```

**Usage:**

```typescript
const option: EChartsOption = {
  title: { text: 'My Chart' },
  xAxis: { type: 'category', data: ['A', 'B', 'C'] },
  yAxis: { type: 'value' },
  series: [{
    type: 'bar',
    data: [120, 200, 150]
  }]
}
```

---

### EChartsType

Type of the ECharts instance.

```typescript
import type { EChartsType } from 'echarts'
```

---

### EChartsInitOpts

Options for initializing ECharts.

```typescript
import type { EChartsInitOpts } from 'echarts'
```

---

### ECElementEvent

Event object for mouse/interaction events.

```typescript
import type { ECElementEvent } from 'echarts'
```

**Properties:**

```typescript
interface ECElementEvent {
  type: string
  event: Event
  target: object
  topTarget: object
  componentType: string
  componentIndex: number
  seriesType?: string
  seriesIndex?: number
  seriesId?: string
  seriesName?: string
  name?: string
  dataIndex?: number
  data?: unknown
  dataType?: string
  value?: number | number[] | string
  color?: string
  // ... and more
}
```

---

### SelectChangedPayload

Payload for selection change events (legend, pie, etc.).

```typescript
import type { SelectChangedPayload } from 'echarts'
```

**Properties:**

```typescript
interface SelectChangedPayload {
  type: string
  fromAction: string
  fromActionPayload: object
  selected: Record<string, boolean>
}
```

---

## Type Guards

### Example: Type-safe Event Handlers

```typescript
import type { ECElementEvent, SelectChangedPayload } from 'echarts'

function isElementEvent(event: unknown): event is ECElementEvent {
  return typeof event === 'object' && event !== null && 'componentType' in event
}

function isSelectChangedPayload(event: unknown): event is SelectChangedPayload {
  return typeof event === 'object' && event !== null && 'selected' in event
}

// Usage
const handleEvent = (event: unknown) => {
  if (isElementEvent(event)) {
    console.log('Element event:', event.name)
  } else if (isSelectChangedPayload(event)) {
    console.log('Selection changed:', event.selected)
  }
}
```

---

## Generic Helpers

### Type-safe Option Builder

```typescript
import type { EChartsOption, BarSeriesOption, LineSeriesOption } from 'echarts'

function createBarOption(data: number[], labels: string[]): EChartsOption {
  return {
    xAxis: { type: 'category', data: labels },
    yAxis: { type: 'value' },
    series: [{
      type: 'bar',
      data
    } as BarSeriesOption]
  }
}

function createLineOption(data: number[], labels: string[]): EChartsOption {
  return {
    xAxis: { type: 'category', data: labels },
    yAxis: { type: 'value' },
    series: [{
      type: 'line',
      data,
      smooth: true
    } as LineSeriesOption]
  }
}
```

---

### Generic Component

```vue
<script setup lang="ts" generic="T extends Record<string, any>">
import type { EChartsOption } from 'echarts'

interface Props {
  data: T[]
  transform: (data: T[]) => EChartsOption
}

const props = defineProps<Props>()

const option = computed(() => props.transform(props.data))
</script>

<template>
  <v-chart :option="option" />
</template>
```

---

## Constants

### ECHARTS_EVENTS

Array of all supported event names.

```typescript
import { ECHARTS_EVENTS } from 'vue-echarts-v3'

console.log(ECHARTS_EVENTS)
// ['click', 'dblclick', 'mousedown', ...]
```

**Type:**

```typescript
const ECHARTS_EVENTS: readonly EChartsEventName[]
```

---

## Type Usage Examples

### Complete Type-safe Component

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { VChart } from 'vue-echarts-v3'
import type {
  VChartProps,
  VChartExposed,
  SetOptionOpts
} from 'vue-echarts-v3'
import type {
  EChartsOption,
  ECElementEvent,
  SelectChangedPayload
} from 'echarts'

// Typed refs
const chartRef = ref<VChartExposed>()
const option = ref<EChartsOption>({
  // ... option
})

// Typed props
const chartProps: Partial<VChartProps> = {
  theme: 'dark',
  autoresize: true,
  loading: false
}

// Typed event handlers
const handleClick = (event: ECElementEvent) => {
  console.log(event.name, event.value)
}

const handleLegendChange = (payload: SelectChangedPayload) => {
  console.log(payload.selected)
}

// Typed method calls
const updateChart = () => {
  const opts: SetOptionOpts = {
    notMerge: true,
    lazyUpdate: false
  }
  chartRef.value?.setOption(option.value, opts)
}
</script>

<template>
  <v-chart
    ref="chartRef"
    :option="option"
    v-bind="chartProps"
    @click="handleClick"
    @legendselectchanged="handleLegendChange"
  />
</template>
```

### Complete Type-safe Composable

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useECharts } from 'vue-echarts-v3'
import type {
  UseEChartsOptions,
  EventHandlers,
  ConvertFinder,
  ScaleDataValue
} from 'vue-echarts-v3'
import type { EChartsOption, ECElementEvent } from 'echarts'

const chartRef = ref<HTMLElement>()
const option = ref<EChartsOption>({ /* ... */ })

// Typed options
const options: UseEChartsOptions = {
  theme: 'dark',
  autoresize: { throttle: 200 },
  manual: false
}

// Typed handlers
const handlers: EventHandlers = {
  click: (event: unknown) => {
    const e = event as ECElementEvent
    console.log(e.name)
  }
}

// Use composable
const {
  chart,
  convertToPixel,
  convertFromPixel
} = useECharts(chartRef, option, options, handlers)

// Typed conversions
const finder: ConvertFinder = { seriesIndex: 0 }
const value: ScaleDataValue = 100

const pixel = convertToPixel(finder, value)
const logical = convertFromPixel(finder, [300, 400])
</script>

<template>
  <div ref="chartRef" style="width: 600px; height: 400px" />
</template>
```

---

## See Also

- [TypeScript Guide](/guide/typescript)
- [Component API](/api/component)
- [Composable API](/api/composable)
- [ECharts Type Definitions](https://github.com/apache/echarts/tree/master/types)
