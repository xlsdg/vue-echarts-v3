# Migration from v2

This guide will help you migrate from vue-echarts-v3 v2.x to v3.x.

## Overview

Vue ECharts v3 is a complete rewrite designed for Vue 3, featuring a modern architecture with the Composition API, TypeScript strict mode, and improved performance. While the core concept remains the same, there are several breaking changes you should be aware of.

::: warning BREAKING CHANGES
v3 is **not backward compatible** with v2. This is a major version upgrade that requires code changes.
:::

## Key Differences

### Vue Version Support

- **v2**: Supports Vue 2.x
- **v3**: Supports Vue 3.x **only**

::: info
If you're still using Vue 2, you must first upgrade your application to Vue 3 before migrating to vue-echarts-v3 v3.x.
:::

### Component Implementation

- **v2**: Built with Options API
- **v3**: Built with Composition API (`<script setup>`)

### TypeScript

- **v2**: TypeScript support with basic type definitions
- **v3**: Full TypeScript rewrite with **strict mode** enabled, comprehensive type exports

### Resize Behavior

- **v2**: Uses `element-resize-detector` library
- **v3**: Uses native browser **ResizeObserver** API (no external dependency)

### Throttling

- **v2**: Uses `lodash.throttle` for resize throttling
- **v3**: Native throttling implementation (no lodash dependency)

## Breaking Changes

### 1. Component Name

The component has been renamed:

```vue
<!-- v2 -->
<IEcharts :option="option" />

<!-- v3 -->
<VChart :option="option" />
```

### 2. Props Changes

#### Renamed Props

| v2 Prop | v3 Prop | Notes |
|---------|---------|-------|
| `resizable` | `autoresize` | Enables auto-resize on container size change |
| `notMerge` | `updateOptions.notMerge` | Now part of `updateOptions` object |

#### New Props

| Prop | Type | Description |
|------|------|-------------|
| `updateOptions` | `SetOptionOpts` | Options for `setOption()` including `notMerge` and `lazyUpdate` |

#### Removed Props

Some props from v2 may not be available in v3. Check the [Component API](/api/component) for the complete list of supported props.

### 3. Import Paths

The import paths have changed:

```typescript
// v2
import IEcharts from 'vue-echarts-v3'

// v3 - Full version
import { VChart } from 'vue-echarts-v3'

// v3 - Lite version (recommended)
import { VChart } from 'vue-echarts-v3/lite'
```

### 4. Component Registration

```typescript
// v2
import Vue from 'vue'
import IEcharts from 'vue-echarts-v3'

Vue.component('IEcharts', IEcharts)

// v3
import { createApp } from 'vue'
import { VChart } from 'vue-echarts-v3'

const app = createApp(App)
app.component('VChart', VChart)
```

### 5. Event Handling

Event names remain the same, but the component now uses Vue 3's event system:

```vue
<!-- v2 -->
<IEcharts :option="option" @click="handleClick" />

<!-- v3 -->
<VChart :option="option" @click="handleClick" />
```

### 6. Template Refs

Accessing component methods has changed due to Vue 3's new refs system:

```vue
<!-- v2 -->
<template>
  <IEcharts ref="chart" :option="option" />
</template>

<script>
export default {
  mounted() {
    this.$refs.chart.resize()
  }
}
</script>

<!-- v3 -->
<template>
  <VChart ref="chartRef" :option="option" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { VChartExposed } from 'vue-echarts-v3'

const chartRef = ref<VChartExposed>()

onMounted(() => {
  chartRef.value?.resize()
})
</script>
```

### 7. Resize Options

The resize behavior configuration has changed:

```vue
<!-- v2 -->
<IEcharts :option="option" :resizable="true" />

<!-- v3 -->
<VChart
  :option="option"
  :autoresize="true"
/>

<!-- v3 with throttle configuration -->
<VChart
  :option="option"
  :autoresize="{ throttle: 200 }"
/>
```

## Migration Steps

### Step 1: Upgrade to Vue 3

If you haven't already, upgrade your application to Vue 3. Follow the [Vue 3 Migration Guide](https://v3-migration.vuejs.org/).

### Step 2: Update Dependencies

```bash
# Remove old version
npm uninstall vue-echarts-v3

# Install v3
npm install echarts vue-echarts-v3@3
```

### Step 3: Update Imports

Replace all imports of the old component:

```typescript
// Before
import IEcharts from 'vue-echarts-v3'

// After - Full version
import { VChart } from 'vue-echarts-v3'

// Or - Lite version (recommended for smaller bundle)
import { VChart } from 'vue-echarts-v3/lite'
```

### Step 4: Update Component Names

Find and replace all component references:

```vue
<!-- Before -->
<IEcharts :option="option" />

<!-- After -->
<VChart :option="option" />
```

### Step 5: Update Props

Update prop names according to the breaking changes:

```vue
<!-- Before -->
<IEcharts
  :option="option"
  :resizable="true"
  :notMerge="true"
/>

<!-- After -->
<VChart
  :option="option"
  :autoresize="true"
  :update-options="{ notMerge: true }"
/>
```

### Step 6: Update Template Refs

Convert Options API refs to Composition API:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { VChartExposed } from 'vue-echarts-v3'

const chartRef = ref<VChartExposed>()

const resizeChart = () => {
  chartRef.value?.resize()
}

const exportImage = () => {
  const url = chartRef.value?.getDataURL({
    type: 'png',
    pixelRatio: 2
  })
  // ... use url
}
</script>

<template>
  <VChart ref="chartRef" :option="option" />
</template>
```

### Step 7: Import Type Definitions

Take advantage of TypeScript support:

```typescript
import type {
  VChartProps,
  VChartEmits,
  VChartExposed,
  UseEChartsOptions
} from 'vue-echarts-v3'
```

## New Features in v3

### Composable API

v3 introduces a new composable API for advanced use cases:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useECharts } from 'vue-echarts-v3'
import type { EChartsOption } from 'echarts'

const chartRef = ref<HTMLElement>()
const option = ref<EChartsOption>({
  // ... your option
})

const { chart, setOption, resize, clear } = useECharts(
  chartRef,
  option,
  {
    autoresize: true,
    theme: 'dark'
  },
  {
    click: (event) => console.log('Clicked:', event)
  }
)
</script>

<template>
  <div ref="chartRef" style="width: 600px; height: 400px" />
</template>
```

### Better Tree Shaking

Use the lite version for optimal bundle size:

```typescript
import { VChart } from 'vue-echarts-v3/lite'

// Manually register only what you need
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'

use([
  CanvasRenderer,
  LineChart,
  BarChart,
  GridComponent,
  TooltipComponent
])
```

### Native ResizeObserver

No external dependencies for resize detection:

```vue
<VChart
  :option="option"
  :autoresize="{ throttle: 100 }"
/>
```

## Troubleshooting

### Component Not Rendering

**Problem**: Chart doesn't appear after migration.

**Solution**: Ensure you've registered the required ECharts modules:

```typescript
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
// Import your chart types and components
use([CanvasRenderer, /* ... */])
```

### TypeScript Errors

**Problem**: Type errors when using the component.

**Solution**: Import the correct types:

```typescript
import type { VChartExposed } from 'vue-echarts-v3'
import type { EChartsOption } from 'echarts'
```

### Resize Not Working

**Problem**: Chart doesn't resize automatically.

**Solution**: Enable the `autoresize` prop:

```vue
<VChart :option="option" :autoresize="true" />
```

### Bundle Size Too Large

**Problem**: Bundle size increased after migration.

**Solution**: Use the lite version and tree-shakeable imports:

```typescript
import { VChart } from 'vue-echarts-v3/lite'
```

## Getting Help

If you encounter issues during migration:

- Check the [API Reference](/api/component)
- Review the [examples](https://github.com/xlsdg/vue-echarts-v3/tree/master/demo)
- Open an issue on [GitHub](https://github.com/xlsdg/vue-echarts-v3/issues)

## Comparison Table

| Feature | v2 | v3 |
|---------|----|----|
| Vue Version | Vue 2.x | Vue 3.x |
| Component Name | `IEcharts` | `VChart` |
| API Style | Options API | Composition API |
| TypeScript | Basic types | Strict mode |
| Resize Detection | element-resize-detector | ResizeObserver |
| Throttling | lodash.throttle | Native |
| Bundle Size | Larger | Smaller (tree-shakeable) |
| Composable API | ❌ | ✅ |
| Auto-resize Prop | `resizable` | `autoresize` |
| Dependencies | More | Fewer |
