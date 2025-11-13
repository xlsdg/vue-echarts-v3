import { type Ref, watch, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts/core'
import type { EChartsOption, EChartsInitOpts } from 'echarts'
import { type EChartsEventName, type SetOptionOpts } from '../types'
import { useChartInstance } from './useChartInstance'

/**
 * Options for useECharts composable
 */
export interface UseEChartsOptions {
  /**
   * Theme to be applied
   */
  theme?: string | object | Ref<string | object | undefined>
  /**
   * Options for ECharts initialization
   */
  initOptions?: EChartsInitOpts | Ref<EChartsInitOpts | undefined>
  /**
   * Options for setOption method
   */
  updateOptions?: SetOptionOpts | Ref<SetOptionOpts | undefined>
  /**
   * Whether to show loading animation
   */
  loading?: Ref<boolean>
  /**
   * Loading animation configuration
   */
  loadingOptions?: object | Ref<object | undefined>
  /**
   * Whether to enable auto-resize
   */
  autoresize?: boolean | { throttle?: number }
  /**
   * Group name for chart connection
   */
  group?: string | Ref<string | undefined>
  /**
   * Manual mode - don't watch option changes
   */
  manual?: boolean
}

/**
 * Event handlers map
 */
export type EventHandlers = Partial<Record<EChartsEventName, (event: unknown) => void>>

/**
 * Composable for using ECharts in Vue 3
 *
 * @example
 * ```vue
 * <script setup>
 * import { ref } from 'vue'
 * import { useECharts } from 'vue-echarts-v3'
 *
 * const chartRef = ref()
 * const option = ref({ ... })
 *
 * const { chart, setOption, resize } = useECharts(chartRef, option, {
 *   autoresize: true
 * })
 * </script>
 *
 * <template>
 *   <div ref="chartRef" style="width: 600px; height: 400px" />
 * </template>
 * ```
 */
export function useECharts(
  target: Ref<HTMLElement | undefined>,
  option: Ref<EChartsOption>,
  opts: UseEChartsOptions = {},
  eventHandlers: EventHandlers = {}
) {
  // Use the core chart instance composable
  const chartInstance = useChartInstance(target, option, {
    theme: opts.theme,
    initOptions: opts.initOptions,
    updateOptions: opts.updateOptions,
    loadingOptions: opts.loadingOptions,
    autoresize: opts.autoresize,
    group: opts.group,
    eventHandlers
  })

  // Watch option changes (unless manual mode)
  if (!opts.manual) {
    watch(
      option,
      (newOption) => {
        chartInstance.setOption(newOption)
      },
      { deep: true }
    )
  }

  // Watch loading state
  if (opts.loading) {
    watch(opts.loading, (loading) => {
      if (loading) {
        chartInstance.showLoading()
      } else {
        chartInstance.hideLoading()
      }
    })
  }

  // Watch group
  if (opts.group && typeof opts.group === 'object' && 'value' in opts.group) {
    watch(opts.group, (newGroup) => {
      if (newGroup) {
        chartInstance.updateGroup(newGroup)
      }
    })
  }

  // Lifecycle
  onMounted(() => {
    chartInstance.initChart()
    chartInstance.setupResize()

    // Handle initial loading state
    if (opts.loading?.value) {
      chartInstance.showLoading()
    }
  })

  onBeforeUnmount(() => {
    chartInstance.dispose()
  })

  return {
    chart: chartInstance.chart,
    setOption: chartInstance.setOption,
    resize: chartInstance.resize,
    dispatchAction: chartInstance.dispatchAction,
    convertToPixel: chartInstance.convertToPixel,
    convertFromPixel: chartInstance.convertFromPixel,
    containPixel: chartInstance.containPixel,
    showLoading: chartInstance.showLoading,
    hideLoading: chartInstance.hideLoading,
    getDataURL: chartInstance.getDataURL,
    clear: chartInstance.clear,
    dispose: chartInstance.dispose
  }
}

/**
 * Static methods from ECharts
 */
/**
 * GeoJSON type for map registration
 */
export type GeoJSON = Record<string, unknown>

export const connect = (group: string | Parameters<typeof echarts.connect>[0]) => echarts.connect(group as string)
export const disconnect = (group: string) => echarts.disconnect(group)
export const getInstanceByDom = (target: HTMLElement) => echarts.getInstanceByDom(target)
export const registerMap = (mapName: string, geoJson: Parameters<typeof echarts.registerMap>[1], specialAreas?: Record<string, unknown>) =>
  echarts.registerMap(mapName, geoJson, specialAreas as Parameters<typeof echarts.registerMap>[2])
export const getMap = (mapName: string) => echarts.getMap(mapName)
export const registerTheme = (themeName: string, theme: object) =>
  echarts.registerTheme(themeName, theme)
