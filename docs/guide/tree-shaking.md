# Tree Shaking

Vue ECharts v3 supports tree-shaking to minimize bundle size by including only the ECharts features you actually use.

## Why Tree Shaking?

ECharts is a powerful library with many features, but you may not need all of them:

- **Full ECharts**: ~900KB minified (~300KB gzipped)
- **Core + Selective imports**: As small as ~200KB minified (~70KB gzipped)

Tree-shaking can reduce your bundle size by **60-80%** depending on which features you use.

## Entry Points

Vue ECharts v3 provides two entry points:

### Full Version (No Tree Shaking)

```typescript
import { VChart } from 'vue-echarts-v3'
```

This imports the entire ECharts library. Use this for:
- Quick prototyping
- Applications using many chart types
- When bundle size isn't a concern

### Lite Version (Tree Shakeable)

```typescript
import { VChart } from 'vue-echarts-v3/lite'
```

This imports only ECharts core. Use this for:
- Production builds
- Optimized bundle sizes
- Applications using specific chart types

## Using the Lite Version

### 1. Import from Lite Entry

```typescript
import { VChart } from 'vue-echarts-v3/lite'
```

### 2. Register Required Modules

Import and register only the ECharts modules you need:

```typescript
// main.ts or where you initialize your app
import { use } from 'echarts/core'

// Import renderer (required - choose one)
import { CanvasRenderer } from 'echarts/renderers'
// or
import { SVGRenderer } from 'echarts/renderers'

// Import chart types you need
import {
  BarChart,
  LineChart,
  PieChart,
  ScatterChart,
  // ... other chart types
} from 'echarts/charts'

// Import components you need
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  // ... other components
} from 'echarts/components'

// Register modules
use([
  CanvasRenderer, // or SVGRenderer
  BarChart,
  LineChart,
  GridComponent,
  TooltipComponent,
  LegendComponent
])
```

### 3. Use the Component

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { VChart } from 'vue-echarts-v3/lite'
import type { EChartsOption } from 'echarts'

const option = ref<EChartsOption>({
  // Your chart configuration
})
</script>

<template>
  <v-chart :option="option" />
</template>
```

## Available Modules

### Renderers (Required - Choose One)

```typescript
import { CanvasRenderer } from 'echarts/renderers'
import { SVGRenderer } from 'echarts/renderers'
```

- **CanvasRenderer**: Better performance for large datasets
- **SVGRenderer**: Better for charts with animations and small datasets

### Chart Types

```typescript
import {
  BarChart,
  LineChart,
  PieChart,
  ScatterChart,
  RadarChart,
  MapChart,
  TreeChart,
  TreemapChart,
  GraphChart,
  GaugeChart,
  FunnelChart,
  ParallelChart,
  SankeyChart,
  BoxplotChart,
  CandlestickChart,
  EffectScatterChart,
  LinesChart,
  HeatmapChart,
  PictorialBarChart,
  ThemeRiverChart,
  SunburstChart,
  CustomChart
} from 'echarts/charts'
```

### Components

```typescript
import {
  // Coordinate Systems
  GridComponent,
  PolarComponent,
  GeoComponent,
  SingleAxisComponent,
  ParallelComponent,
  CalendarComponent,
  GraphicComponent,

  // Interactive Components
  TooltipComponent,
  AxisPointerComponent,
  BrushComponent,

  // Data Components
  TitleComponent,
  TimelineComponent,
  MarkPointComponent,
  MarkLineComponent,
  MarkAreaComponent,
  LegendComponent,

  // Zoom Components
  DataZoomComponent,
  DataZoomInsideComponent,
  DataZoomSliderComponent,

  // Visual Map
  VisualMapComponent,
  VisualMapContinuousComponent,
  VisualMapPiecewiseComponent,

  // Toolbox
  ToolboxComponent,

  // Other
  AriaComponent,
  TransformComponent,
  DatasetComponent
} from 'echarts/components'
```

## Common Configurations

### Basic Bar/Line Charts

```typescript
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent
} from 'echarts/components'

use([
  CanvasRenderer,
  BarChart,
  LineChart,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent
])
```

**Bundle size**: ~250KB minified

### Pie Chart with Legend

```typescript
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components'

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
])
```

**Bundle size**: ~220KB minified

### Advanced with DataZoom and Toolbox

```typescript
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, ScatterChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
  DataZoomComponent,
  ToolboxComponent
} from 'echarts/components'

use([
  CanvasRenderer,
  LineChart,
  ScatterChart,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
  DataZoomComponent,
  ToolboxComponent
])
```

**Bundle size**: ~280KB minified

## Best Practices

### 1. Register Modules Globally

Register modules once in your app entry point (`main.ts`):

```typescript
// main.ts
import { createApp } from 'vue'
import App from './App.vue'

// Import and register ECharts modules once
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'

use([CanvasRenderer, BarChart, LineChart, GridComponent, TooltipComponent])

createApp(App).mount('#app')
```

Don't register in every component - this won't reduce bundle size.

### 2. Choose the Right Renderer

**Canvas Renderer** (recommended):
- Better performance for large datasets
- Lower memory usage
- Better for mobile devices

**SVG Renderer**:
- Better for small datasets with many animations
- Better image quality when scaling
- Better for accessibility (DOM elements)

```typescript
// For most cases
import { CanvasRenderer } from 'echarts/renderers'

// For special cases with heavy animations
import { SVGRenderer } from 'echarts/renderers'
```

### 3. Import Only What You Need

```typescript
// ❌ Bad - imports everything
import * as echarts from 'echarts'

// ✅ Good - selective imports
import { use } from 'echarts/core'
import { BarChart } from 'echarts/charts'
```

### 4. Use Code Splitting for Chart Types

If your app has many different chart types on different pages, use dynamic imports:

```typescript
// BarChartPage.vue
<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(async () => {
  // Dynamically import chart type
  const { BarChart } = await import('echarts/charts')
  const { use } = await import('echarts/core')

  use([BarChart])
})
</script>
```

### 5. Analyze Your Bundle

Use tools to analyze your bundle size:

```bash
# For Vite
npm install -D rollup-plugin-visualizer

# For Webpack
npm install -D webpack-bundle-analyzer
```

Add to your build config:

```typescript
// vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer'

export default {
  plugins: [
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true
    })
  ]
}
```

## Bundle Size Comparison

| Configuration | Minified | Gzipped | Use Case |
|--------------|----------|---------|----------|
| Full Version | ~900KB | ~300KB | Prototyping, all features |
| Core + Bar/Line | ~250KB | ~85KB | Most common charts |
| Core + Pie | ~220KB | ~75KB | Simple pie charts |
| Core + Advanced | ~350KB | ~120KB | Complex visualizations |

## Migration from Full to Lite

### Before (Full Version)

```typescript
// main.ts
import { createApp } from 'vue'
import { VChart } from 'vue-echarts-v3'
import App from './App.vue'

const app = createApp(App)
app.component('VChart', VChart)
app.mount('#app')
```

### After (Lite Version)

```typescript
// main.ts
import { createApp } from 'vue'
import { VChart } from 'vue-echarts-v3/lite' // Changed
import App from './App.vue'

// Add module registration
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components'

use([
  CanvasRenderer,
  BarChart,
  LineChart,
  GridComponent,
  TooltipComponent,
  LegendComponent
])

const app = createApp(App)
app.component('VChart', VChart)
app.mount('#app')
```

Component usage remains the same - no changes needed in your `.vue` files!

## Troubleshooting

### "Component not exists" Error

**Problem**: Chart doesn't render and console shows "Component `series.bar` not exists".

**Solution**: Register the missing chart type:

```typescript
import { BarChart } from 'echarts/charts'
import { use } from 'echarts/core'

use([BarChart])
```

### "Component `tooltip` not exists" Error

**Problem**: Missing component registration.

**Solution**: Register the missing component:

```typescript
import { TooltipComponent } from 'echarts/components'
import { use } from 'echarts/core'

use([TooltipComponent])
```

### Large Bundle Size

**Problem**: Bundle is still large after using lite version.

**Solution**:
1. Check you're importing from `'vue-echarts-v3/lite'`
2. Use bundle analyzer to identify what's being included
3. Remove unused chart types and components
4. Use dynamic imports for chart-specific pages

## Next Steps

- Check [Installation](/guide/installation) guide
- Learn about [Basic Usage](/guide/basic-usage)
- Explore available [Chart Types](https://echarts.apache.org/en/option.html#series)
