import type { App, Plugin } from 'vue'
import VChart from './components/VChart.vue'
import * as echarts from 'echarts/core'

// Export component
export { VChart }
export default VChart

// Export composable
export { useECharts } from './composables/useECharts'

// Export static methods
export {
  connect,
  disconnect,
  getInstanceByDom,
  registerMap,
  getMap,
  registerTheme
} from './composables/useECharts'

// Export types
export type {
  VChartProps,
  VChartEmits,
  VChartExposed,
  EChartsEventName,
  ConvertFinder,
  ScaleDataValue,
  EChartsEventPayload
} from './types'

export type {
  UseEChartsOptions,
  EventHandlers,
  GeoJSON
} from './composables/useECharts'

// Re-export ECharts types for convenience
export type {
  EChartsType,
  EChartsOption,
  SetOptionOpts,
  EChartsInitOpts
} from 'echarts'

// Attach echarts core to component for compatibility
// Using type assertion with unknown is safer than direct any cast
;(VChart as unknown as { __echarts__: typeof echarts }).__echarts__ = echarts

// Vue plugin install function
export const install: Plugin = (app: App) => {
  app.component('VChart', VChart)
}

// Auto-install when used in browser via CDN
declare global {
  interface Window {
    Vue?: App
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
