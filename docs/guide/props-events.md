# Props & Events

Complete reference for all component props and events.

## Props

### `option` <Badge type="danger" text="required" />

- **Type:** `EChartsOption`
- **Details:** The ECharts option configuration object. This is the main prop that defines your chart.
- **Reactive:** Yes - changes will automatically update the chart

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { EChartsOption } from 'echarts'

const option = ref<EChartsOption>({
  xAxis: { type: 'category', data: ['A', 'B', 'C'] },
  yAxis: { type: 'value' },
  series: [{ data: [120, 200, 150], type: 'bar' }]
})
</script>

<template>
  <v-chart :option="option" />
</template>
```

### `theme`

- **Type:** `string | object`
- **Default:** `undefined`
- **Details:** Theme name (built-in or registered) or custom theme object

```vue
<!-- Built-in theme -->
<v-chart :option="option" theme="dark" />

<!-- Custom theme object -->
<v-chart
  :option="option"
  :theme="{ color: ['#fc8452', '#ea7ccc'] }"
/>
```

### `initOptions`

- **Type:** `EChartsInitOpts`
- **Default:** `undefined`
- **Details:** Options for ECharts initialization

```vue
<v-chart
  :option="option"
  :init-options="{
    renderer: 'svg',
    width: 600,
    height: 400,
    locale: 'EN'
  }"
/>
```

Available options:
- `renderer`: `'canvas'` | `'svg'` - Rendering mode (default: `'canvas'`)
- `width`: `number | string` - Chart width
- `height`: `number | string` - Chart height
- `locale`: `string` - Locale for i18n
- `devicePixelRatio`: `number` - Device pixel ratio
- `useDirtyRect`: `boolean` - Enable dirty rectangle rendering (canvas only)
- `useCoarsePointer`: `boolean` - Optimize for coarse pointers
- `pointerSize`: `number` - Pointer hit detection size

### `updateOptions`

- **Type:** `SetOptionOpts`
- **Default:** `{ notMerge: false, lazyUpdate: false }`
- **Details:** Options passed to `setOption()` method when updating

```vue
<v-chart
  :option="option"
  :update-options="{
    notMerge: true,
    lazyUpdate: false,
    silent: false
  }"
/>
```

Available options:
- `notMerge`: `boolean` - Whether to merge with previous option (default: `false`)
- `lazyUpdate`: `boolean` - Whether to update lazily (default: `false`)
- `silent`: `boolean` - Whether to prevent triggering events (default: `false`)
- `manual`: `boolean` - Disable automatic option watching (default: `false`)

::: tip Manual Mode
When `manual: true`, you must call `setOption()` manually via the component ref. Useful for performance optimization.
:::

### `loading`

- **Type:** `boolean`
- **Default:** `false`
- **Details:** Whether to show loading animation

```vue
<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)

// Simulate data fetching
setTimeout(() => {
  loading.value = false
}, 2000)
</script>

<template>
  <v-chart :option="option" :loading="loading" />
</template>
```

### `loadingOptions`

- **Type:** `object`
- **Default:** `undefined`
- **Details:** Configuration for loading animation

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
    lineWidth: 5
  }"
/>
```

### `autoresize`

- **Type:** `boolean | { throttle?: number }`
- **Default:** `false`
- **Details:** Enable automatic resizing when container size changes

```vue
<!-- Basic auto-resize -->
<v-chart :option="option" :autoresize="true" />

<!-- With custom throttle (ms) -->
<v-chart :option="option" :autoresize="{ throttle: 200 }" />
```

::: info
Uses native `ResizeObserver` API. Default throttle is 100ms.
:::

### `group`

- **Type:** `string`
- **Default:** `undefined`
- **Details:** Group name for connecting multiple charts

```vue
<script setup lang="ts">
import { connect } from 'vue-echarts-v3'

// Charts with the same group will be connected
const groupName = 'my-chart-group'

// Connect charts manually if needed
connect(groupName)
</script>

<template>
  <v-chart :option="option1" :group="groupName" />
  <v-chart :option="option2" :group="groupName" />
</template>
```

## Events

### Component Events

#### `ready`

- **Type:** `(instance: EChartsType) => void`
- **Details:** Emitted when the chart instance is created and ready
- **Usage:** Access the chart instance for advanced operations

```vue
<script setup lang="ts">
import type { EChartsType } from 'echarts'

const onReady = (instance: EChartsType) => {
  console.log('Chart ready:', instance)
  // Perform operations with the instance
}
</script>

<template>
  <v-chart :option="option" @ready="onReady" />
</template>
```

#### `resize`

- **Type:** `(width: number, height: number) => void`
- **Details:** Emitted when the chart is resized
- **Usage:** Track chart dimensions

```vue
<script setup lang="ts">
const onResize = (width: number, height: number) => {
  console.log(`Chart resized to ${width}x${height}`)
}
</script>

<template>
  <v-chart :option="option" :autoresize="true" @resize="onResize" />
</template>
```

### Mouse Events

All ECharts mouse events are supported:

#### `click`

```vue
<script setup lang="ts">
import type { ECElementEvent } from 'echarts'

const onClick = (event: ECElementEvent) => {
  console.log('Clicked:', event.name, event.value)
}
</script>

<template>
  <v-chart :option="option" @click="onClick" />
</template>
```

#### Other Mouse Events

- `dblclick` - Double click
- `mousedown` - Mouse button pressed
- `mousemove` - Mouse moved
- `mouseup` - Mouse button released
- `mouseover` - Mouse entered
- `mouseout` - Mouse left
- `globalout` - Mouse left canvas
- `contextmenu` - Right click

```vue
<template>
  <v-chart
    :option="option"
    @dblclick="onDblClick"
    @mouseover="onMouseOver"
    @mouseout="onMouseOut"
    @contextmenu="onContextMenu"
  />
</template>
```

### Component Events

Events triggered by ECharts components (legend, datazoom, etc.):

#### Legend Events

- `legendselectchanged` - Legend selection changed
- `legendselected` - Legend item selected
- `legendunselected` - Legend item unselected

```vue
<script setup lang="ts">
import type { SelectChangedPayload } from 'echarts'

const onLegendChange = (payload: SelectChangedPayload) => {
  console.log('Legend changed:', payload.selected)
}
</script>

<template>
  <v-chart :option="option" @legendselectchanged="onLegendChange" />
</template>
```

#### DataZoom Events

- `datazoom` - DataZoom area changed
- `datarangeselected` - Data range selected

```vue
<template>
  <v-chart :option="option" @datazoom="onDataZoom" />
</template>
```

#### Timeline Events

- `timelinechanged` - Timeline index changed
- `timelineplaychanged` - Timeline play state changed

#### Toolbox Events

- `restore` - Restore button clicked
- `dataviewchanged` - Data view changed
- `magictypechanged` - Magic type switched

#### Map/Geo Events

- `geoselectchanged` - Geo selection changed
- `geoselected` - Geo area selected
- `geounselected` - Geo area unselected
- `mapselectchanged` - Map selection changed
- `mapselected` - Map area selected
- `mapunselected` - Map area unselected

#### Pie Events

- `pieselectchanged` - Pie selection changed
- `pieselected` - Pie sector selected
- `pieunselected` - Pie sector unselected

#### Other Events

- `axisareaselected` - Axis area selected (parallel)
- `brush` - Brush in progress
- `brushselected` - Brush selection complete
- `brushEnd` - Brush action ended
- `rendered` - Chart rendered
- `finished` - Chart animation finished

```vue
<template>
  <v-chart
    :option="option"
    @brush="onBrush"
    @brushselected="onBrushSelected"
    @rendered="onRendered"
    @finished="onFinished"
  />
</template>
```

## Example: Complete Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { VChart } from 'vue-echarts-v3'
import type { EChartsOption, ECElementEvent, EChartsType } from 'echarts'

const loading = ref(true)
const option = ref<EChartsOption>({
  tooltip: {},
  legend: {},
  xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed'] },
  yAxis: { type: 'value' },
  series: [{
    name: 'Sales',
    type: 'bar',
    data: [120, 200, 150]
  }]
})

setTimeout(() => {
  loading.value = false
}, 1000)

const onReady = (instance: EChartsType) => {
  console.log('Chart ready:', instance)
}

const onClick = (event: ECElementEvent) => {
  console.log('Clicked:', event.name, event.value)
}

const onLegendChange = (payload: any) => {
  console.log('Legend changed:', payload)
}
</script>

<template>
  <v-chart
    :option="option"
    :loading="loading"
    :loading-options="{ text: 'Loading data...' }"
    :autoresize="{ throttle: 200 }"
    :update-options="{ notMerge: false }"
    theme="light"
    @ready="onReady"
    @click="onClick"
    @legendselectchanged="onLegendChange"
    style="width: 100%; height: 500px"
  />
</template>
```

## Next Steps

- Learn about the [Composable API](/guide/composable)
- Explore [TypeScript](/guide/typescript) usage
- Check the [Component API Reference](/api/component)
