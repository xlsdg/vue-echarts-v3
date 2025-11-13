import type { DefineComponent } from 'vue'
import type { VChartProps, VChartEmits, VChartExposed } from './types'

declare module 'vue' {
  export interface GlobalComponents {
    VChart: DefineComponent<VChartProps, {}, {}, {}, {}, {}, {}, VChartEmits, string, VChartExposed>
  }
}

export {}
