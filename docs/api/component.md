# Component API

Complete API reference for the `VChart` component.

## Import

```typescript
// Full version
import { VChart } from 'vue-echarts-v3'

// Lite version (recommended)
import { VChart } from 'vue-echarts-v3/lite'
```

## Props

### `option` <Badge type="danger" text="required" />

- **Type:** `EChartsOption`
- **Required:** Yes
- **Reactive:** Yes
- **Details:**

  The ECharts configuration object that defines the chart. This is the primary prop for configuring your chart's appearance and behavior.

  ```vue
  <script setup lang="ts">
  import type { EChartsOption } from 'echarts'

  const option: EChartsOption = {
    title: { text: 'My Chart' },
    xAxis: { type: 'category', data: ['A', 'B', 'C'] },
    yAxis: { type: 'value' },
    series: [{ type: 'bar', data: [120, 200, 150] }]
  }
  </script>

  <template>
    <v-chart :option="option" />
  </template>
  ```

  The chart automatically updates when the option changes.

---

### `theme`

- **Type:** `string | object`
- **Default:** `undefined`
- **Reactive:** No (set at initialization)
- **Details:**

  Theme to apply to the chart. Can be a theme name (string) or theme configuration object.

  **Built-in themes:**
  - `'light'` - Light theme (default)
  - `'dark'` - Dark theme

  ```vue
  <!-- Using built-in theme -->
  <v-chart :option="option" theme="dark" />

  <!-- Using custom theme object -->
  <v-chart
    :option="option"
    :theme="{
      color: ['#fc8452', '#ea7ccc', '#91cc75'],
      backgroundColor: '#f4f4f4'
    }"
  />
  ```

  To use a registered theme:

  ```typescript
  import { registerTheme } from 'vue-echarts-v3'

  registerTheme('my-theme', {
    color: ['#fc8452', '#ea7ccc'],
    backgroundColor: '#fff'
  })
  ```

  ```vue
  <v-chart :option="option" theme="my-theme" />
  ```

---

### `initOptions`

- **Type:** `EChartsInitOpts`
- **Default:** `undefined`
- **Reactive:** No (set at initialization)
- **Details:**

  Options for ECharts instance initialization.

  ```vue
  <v-chart
    :option="option"
    :init-options="{
      renderer: 'svg',
      width: 600,
      height: 400,
      locale: 'EN',
      devicePixelRatio: 2
    }"
  />
  ```

  **Available options:**

  | Property | Type | Default | Description |
  |----------|------|---------|-------------|
  | `renderer` | `'canvas' \| 'svg'` | `'canvas'` | Rendering mode |
  | `width` | `number \| string` | `auto` | Chart width |
  | `height` | `number \| string` | `auto` | Chart height |
  | `locale` | `string` | `'ZH'` | Locale for i18n |
  | `devicePixelRatio` | `number` | `window.devicePixelRatio` | Device pixel ratio |
  | `useDirtyRect` | `boolean` | `false` | Dirty rectangle rendering optimization |
  | `useCoarsePointer` | `boolean` | `'auto'` | Optimize for coarse pointers |
  | `pointerSize` | `number` | `'auto'` | Hit detection area size |

---

### `updateOptions`

- **Type:** `SetOptionOpts`
- **Default:** `{ notMerge: false, lazyUpdate: false }`
- **Reactive:** Yes
- **Details:**

  Options passed to the `setOption()` method when updating the chart.

  ```vue
  <v-chart
    :option="option"
    :update-options="{
      notMerge: true,
      lazyUpdate: false,
      silent: false,
      manual: false
    }"
  />
  ```

  **Available options:**

  | Property | Type | Default | Description |
  |----------|------|---------|-------------|
  | `notMerge` | `boolean` | `false` | Don't merge with previous option |
  | `lazyUpdate` | `boolean` | `false` | Update chart lazily |
  | `silent` | `boolean` | `false` | Don't trigger events during update |
  | `manual` | `boolean` | `false` | Disable automatic option watching |

  **Manual mode:**

  When `manual: true`, the chart won't automatically update when the `option` prop changes. You must call `setOption()` manually via the component ref.

  ```vue
  <script setup lang="ts">
  import { ref } from 'vue'
  import type { VChartExposed } from 'vue-echarts-v3'

  const chartRef = ref<VChartExposed>()
  const option = ref({ /* ... */ })

  const update = () => {
    chartRef.value?.setOption(option.value)
  }
  </script>

  <template>
    <v-chart
      ref="chartRef"
      :option="option"
      :update-options="{ manual: true }"
    />
  </template>
  ```

---

### `loading`

- **Type:** `boolean`
- **Default:** `false`
- **Reactive:** Yes
- **Details:**

  Whether to show the loading animation.

  ```vue
  <script setup lang="ts">
  import { ref } from 'vue'

  const loading = ref(true)

  fetch('/api/data')
    .then(res => res.json())
    .then(data => {
      option.value = processData(data)
      loading.value = false
    })
  </script>

  <template>
    <v-chart :option="option" :loading="loading" />
  </template>
  ```

---

### `loadingOptions`

- **Type:** `object`
- **Default:** `undefined`
- **Reactive:** No
- **Details:**

  Configuration for the loading animation.

  ```vue
  <v-chart
    :option="option"
    :loading="true"
    :loading-options="{
      text: 'Loading...',
      color: '#4ea397',
      textColor: '#000',
      maskColor: 'rgba(255, 255, 255, 0.8)',
      zlevel: 0,
      fontSize: 12,
      showSpinner: true,
      spinnerRadius: 10,
      lineWidth: 5,
      fontWeight: 'normal',
      fontStyle: 'normal',
      fontFamily: 'sans-serif'
    }"
  />
  ```

  **Available options:**

  | Property | Type | Default | Description |
  |----------|------|---------|-------------|
  | `text` | `string` | `'loading'` | Loading text |
  | `color` | `string` | `'#c23531'` | Spinner color |
  | `textColor` | `string` | `'#000'` | Text color |
  | `maskColor` | `string` | `'rgba(255, 255, 255, 0.8)'` | Mask background color |
  | `zlevel` | `number` | `0` | z-level |
  | `fontSize` | `number` | `12` | Font size |
  | `showSpinner` | `boolean` | `true` | Show spinner |
  | `spinnerRadius` | `number` | `10` | Spinner radius |
  | `lineWidth` | `number` | `5` | Spinner line width |

---

### `autoresize`

- **Type:** `boolean | { throttle?: number }`
- **Default:** `false`
- **Reactive:** No (set at initialization)
- **Details:**

  Enable automatic chart resizing when the container size changes. Uses the native `ResizeObserver` API.

  ```vue
  <!-- Enable auto-resize -->
  <v-chart :option="option" :autoresize="true" />

  <!-- Custom throttle (ms) -->
  <v-chart
    :option="option"
    :autoresize="{ throttle: 200 }"
  />
  ```

  **Throttle:**
  - Default throttle is 100ms
  - Prevents excessive resize operations
  - Set higher values for better performance with slower devices

  ::: tip Browser Support
  `ResizeObserver` is supported in all modern browsers. No polyfill needed.
  :::

---

### `group`

- **Type:** `string`
- **Default:** `undefined`
- **Reactive:** Yes
- **Details:**

  Group name for connecting multiple charts. Charts in the same group will be linked for actions like `connect`.

  ```vue
  <script setup lang="ts">
  import { connect } from 'vue-echarts-v3'

  const groupName = 'my-group'

  // Charts will be connected automatically when using the same group
  // Or connect manually:
  connect(groupName)
  </script>

  <template>
    <v-chart :option="option1" :group="groupName" />
    <v-chart :option="option2" :group="groupName" />
  </template>
  ```

  Connected charts will synchronize:
  - Brush selections
  - Data zoom
  - Other interactions

---

## Events

### Component Events

#### `ready`

- **Type:** `(instance: EChartsType) => void`
- **Details:**

  Emitted when the chart instance is created and ready.

  ```vue
  <script setup lang="ts">
  import type { EChartsType } from 'echarts'

  const onReady = (instance: EChartsType) => {
    console.log('Chart instance:', instance)
  }
  </script>

  <template>
    <v-chart :option="option" @ready="onReady" />
  </template>
  ```

#### `resize`

- **Type:** `(width: number, height: number) => void`
- **Details:**

  Emitted when the chart is resized.

  ```vue
  <script setup lang="ts">
  const onResize = (width: number, height: number) => {
    console.log(`Resized to: ${width}x${height}`)
  }
  </script>

  <template>
    <v-chart :option="option" :autoresize="true" @resize="onResize" />
  </template>
  ```

---

### Mouse/Touch Events

All mouse and touch events from ECharts are supported:

#### `click`, `dblclick`, `mousedown`, `mousemove`, `mouseup`, `mouseover`, `mouseout`, `globalout`, `contextmenu`

- **Type:** `(event: ECElementEvent) => void`
- **Details:**

  ```vue
  <script setup lang="ts">
  import type { ECElementEvent } from 'echarts'

  const onClick = (event: ECElementEvent) => {
    console.log('Clicked:', {
      componentType: event.componentType,
      seriesType: event.seriesType,
      seriesName: event.seriesName,
      name: event.name,
      value: event.value,
      dataIndex: event.dataIndex
    })
  }
  </script>

  <template>
    <v-chart
      :option="option"
      @click="onClick"
      @dblclick="onDblClick"
      @mouseover="onMouseOver"
      @mouseout="onMouseOut"
    />
  </template>
  ```

---

### Component Events

#### Legend Events

- `legendselectchanged` - `(payload: SelectChangedPayload) => void`
- `legendselected` - `(event: EChartsEventPayload) => void`
- `legendunselected` - `(event: EChartsEventPayload) => void`

#### DataZoom Events

- `datazoom` - `(event: EChartsEventPayload) => void`
- `datarangeselected` - `(event: EChartsEventPayload) => void`

#### Other Events

See the [Props & Events Guide](/guide/props-events#component-events) for the complete list of component events.

---

## Exposed Methods

Access these methods via a template ref:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { VChartExposed } from 'vue-echarts-v3'

const chartRef = ref<VChartExposed>()

// Call methods
chartRef.value?.resize()
</script>

<template>
  <v-chart ref="chartRef" :option="option" />
</template>
```

### `getInstance()`

- **Type:** `() => EChartsType | undefined`
- **Returns:** The ECharts instance
- **Details:**

  Get the underlying ECharts instance for advanced operations.

  ```typescript
  const instance = chartRef.value?.getInstance()
  if (instance) {
    // Use ECharts API directly
    instance.on('click', handler)
  }
  ```

---

### `setOption()`

- **Type:** `(option: EChartsOption, opts?: SetOptionOpts) => void`
- **Details:**

  Manually set the chart option. Useful in manual mode.

  ```typescript
  chartRef.value?.setOption(newOption, {
    notMerge: true,
    lazyUpdate: false
  })
  ```

---

### `resize()`

- **Type:** `(opts?: { width?: number; height?: number; silent?: boolean }) => void`
- **Details:**

  Manually resize the chart.

  ```typescript
  // Auto-detect size
  chartRef.value?.resize()

  // Specify dimensions
  chartRef.value?.resize({ width: 800, height: 600 })

  // Silent mode (no animation)
  chartRef.value?.resize({ silent: true })
  ```

---

### `dispatchAction()`

- **Type:** `(payload: { type: string; [key: string]: unknown }) => void`
- **Details:**

  Trigger chart actions programmatically.

  ```typescript
  // Highlight a data point
  chartRef.value?.dispatchAction({
    type: 'highlight',
    seriesIndex: 0,
    dataIndex: 1
  })

  // Show tooltip
  chartRef.value?.dispatchAction({
    type: 'showTip',
    seriesIndex: 0,
    dataIndex: 2
  })
  ```

  See [ECharts Action Documentation](https://echarts.apache.org/en/api.html#action) for available actions.

---

### `convertToPixel()`

- **Type:** `(finder: ConvertFinder, value: ScaleDataValue) => number`
- **Details:**

  Convert logical value to pixel coordinate.

  ```typescript
  const pixel = chartRef.value?.convertToPixel(
    { seriesIndex: 0 },
    [100, 200]
  )
  ```

---

### `convertFromPixel()`

- **Type:** `(finder: ConvertFinder, value: number | number[]) => number | number[]`
- **Details:**

  Convert pixel coordinate to logical value.

  ```typescript
  const value = chartRef.value?.convertFromPixel(
    { seriesIndex: 0 },
    [300, 400]
  )
  ```

---

### `containPixel()`

- **Type:** `(finder: ConvertFinder, value: number[]) => boolean`
- **Details:**

  Check if a pixel coordinate is within the coordinate system.

  ```typescript
  const isInside = chartRef.value?.containPixel(
    'grid',
    [300, 400]
  )
  ```

---

### `showLoading()`

- **Type:** `(type?: string, opts?: object) => void`
- **Details:**

  Show loading animation manually.

  ```typescript
  chartRef.value?.showLoading('default', {
    text: 'Loading...',
    color: '#4ea397'
  })
  ```

---

### `hideLoading()`

- **Type:** `() => void`
- **Details:**

  Hide loading animation.

  ```typescript
  chartRef.value?.hideLoading()
  ```

---

### `getDataURL()`

- **Type:** `(opts?: ExportImageOptions) => string`
- **Details:**

  Export chart as base64 image URL.

  ```typescript
  const url = chartRef.value?.getDataURL({
    type: 'png',
    pixelRatio: 2,
    backgroundColor: '#fff',
    excludeComponents: ['toolbox']
  })

  // Download image
  const link = document.createElement('a')
  link.href = url
  link.download = 'chart.png'
  link.click()
  ```

  **Options:**

  | Property | Type | Default | Description |
  |----------|------|---------|-------------|
  | `type` | `'png' \| 'jpeg' \| 'svg'` | `'png'` | Image format |
  | `pixelRatio` | `number` | `1` | Pixel ratio for better quality |
  | `backgroundColor` | `string` | `transparent` | Background color |
  | `excludeComponents` | `string[]` | `[]` | Components to exclude |

---

### `clear()`

- **Type:** `() => void`
- **Details:**

  Clear the chart content. The instance is still usable.

  ```typescript
  chartRef.value?.clear()
  ```

---

### `dispose()`

- **Type:** `() => void`
- **Details:**

  Dispose the chart instance and release resources.

  ```typescript
  chartRef.value?.dispose()
  ```

  ::: warning
  After calling `dispose()`, the chart instance cannot be used anymore.
  :::

---

## Type Definitions

```typescript
import type {
  VChartProps,      // Component props type
  VChartEmits,      // Component emits type
  VChartExposed     // Component exposed methods type
} from 'vue-echarts-v3'
```

See the [Types API Reference](/api/types) for detailed type definitions.

## See Also

- [Props & Events Guide](/guide/props-events)
- [Basic Usage](/guide/basic-usage)
- [Composable API](/api/composable)
