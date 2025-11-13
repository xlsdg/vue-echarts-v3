# Installation

## Package Manager

Install vue-echarts-v3 along with ECharts using your preferred package manager:

::: code-group

```bash [npm]
npm install echarts vue-echarts-v3
```

```bash [pnpm]
pnpm add echarts vue-echarts-v3
```

```bash [yarn]
yarn add echarts vue-echarts-v3
```

:::

## Peer Dependencies

Vue ECharts v3 requires the following peer dependencies:

- **Vue.js** `^3.0.0`
- **ECharts** `^5.0.0`

Make sure your project has these dependencies installed:

```json
{
  "dependencies": {
    "vue": "^3.4.0",
    "echarts": "^5.5.0",
    "vue-echarts-v3": "^3.0.0"
  }
}
```

## Entry Points

Vue ECharts v3 provides two entry points depending on your needs:

### Full Version (Default)

The full version includes all ECharts modules automatically:

```typescript
import { VChart } from 'vue-echarts-v3'
```

**Pros:**
- Easier to use - no need to register modules
- All ECharts features available immediately

**Cons:**
- Larger bundle size (~900KB minified)
- Includes unused chart types and components

**Best for:**
- Prototyping and quick demos
- Applications using many different chart types
- When bundle size is not a primary concern

### Lite Version (Recommended)

The lite version requires manual registration of ECharts modules:

```typescript
import { VChart } from 'vue-echarts-v3/lite'
```

**Pros:**
- Smaller bundle size (tree-shakeable)
- Only includes what you explicitly import
- Better for production builds

**Cons:**
- Requires manual module registration
- More setup code

**Best for:**
- Production applications
- When bundle size optimization is important
- Projects using only specific chart types

## CDN Usage

For prototyping or simple projects without a build step:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Vue ECharts v3 CDN Example</title>
  <script src="https://cdn.jsdelivr.net/npm/vue@3"></script>
  <script src="https://cdn.jsdelivr.net/npm/echarts@5"></script>
  <script src="https://cdn.jsdelivr.net/npm/vue-echarts-v3@3"></script>
</head>
<body>
  <div id="app">
    <v-chart :option="option" style="width: 600px; height: 400px"></v-chart>
  </div>

  <script>
  const { createApp, ref } = Vue
  const { VChart } = VueECharts

  createApp({
    components: { VChart },
    setup() {
      const option = ref({
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [120, 200, 150, 80, 70],
          type: 'bar'
        }]
      })
      return { option }
    }
  }).mount('#app')
  </script>
</body>
</html>
```

## TypeScript Support

Vue ECharts v3 is written in TypeScript with full type definitions included. No need to install separate `@types` packages.

If you're using TypeScript, the types will be automatically available:

```typescript
import { VChart } from 'vue-echarts-v3'
import type { VChartProps, VChartExposed } from 'vue-echarts-v3'
import type { EChartsOption } from 'echarts'
```

## Verification

After installation, verify everything works by creating a simple chart:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { VChart } from 'vue-echarts-v3'
import type { EChartsOption } from 'echarts'

// Register required ECharts modules
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import { GridComponent } from 'echarts/components'

use([CanvasRenderer, LineChart, GridComponent])

const option = ref<EChartsOption>({
  xAxis: { type: 'category', data: ['A', 'B', 'C'] },
  yAxis: { type: 'value' },
  series: [{ data: [120, 200, 150], type: 'line' }]
})
</script>

<template>
  <v-chart :option="option" style="width: 100%; height: 400px" />
</template>
```

If the chart renders successfully, you're ready to go!

## Next Steps

- Learn about [Basic Usage](/guide/basic-usage)
- Explore [Props & Events](/guide/props-events)
- Understand [Tree Shaking](/guide/tree-shaking)
