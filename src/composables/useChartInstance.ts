import { type Ref, shallowRef, computed } from 'vue'
import * as echarts from 'echarts/core'
import type { EChartsType, EChartsOption, EChartsInitOpts } from 'echarts'
import type { SetOptionOpts, ConvertFinder, ScaleDataValue, EChartsEventName } from '../types'
import { ECHARTS_EVENTS } from '../types'
import { unwrapRef, extractThrottle } from '../utils/ref-helpers'
import { createThrottledResizeObserver } from '../utils/resize-observer'
import { warn, error as logError } from '../utils/logger'

/**
 * Core chart instance options
 */
export interface ChartInstanceOptions {
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
   * Event handlers map
   */
  eventHandlers?: Partial<Record<EChartsEventName, (event: unknown) => void>>
  /**
   * Callback when chart is ready
   */
  onReady?: (instance: EChartsType) => void
  /**
   * Callback when chart is resized
   */
  onResize?: (width: number, height: number) => void
}

/**
 * Core chart instance management composable
 * This is the single source of truth for all ECharts instance logic
 * Used by both VChart component and useECharts composable
 */
export function useChartInstance(
  target: Ref<HTMLElement | undefined>,
  option: Ref<EChartsOption>,
  options: ChartInstanceOptions = {}
) {
  const chart = shallowRef<EChartsType>()
  const resizeObserver = shallowRef<ResizeObserver>()

  // Unwrap all ref options using our utility
  const theme = computed(() => unwrapRef(options.theme))
  const initOptions = computed(() => unwrapRef(options.initOptions))
  const updateOptions = computed(() => unwrapRef(options.updateOptions) ?? { notMerge: false, lazyUpdate: false })
  const loadingOptions = computed(() => unwrapRef(options.loadingOptions))
  const group = computed(() => unwrapRef(options.group))

  /**
   * Initialize ECharts instance
   */
  const initChart = (): boolean => {
    if (!target.value) {
      warn('Cannot initialize chart: target element is not available')
      return false
    }

    try {
      // Check if instance already exists
      const existingInstance = echarts.getInstanceByDom(target.value)
      if (existingInstance) {
        chart.value = existingInstance as unknown as EChartsType
      } else {
        chart.value = echarts.init(target.value, theme.value, initOptions.value) as unknown as EChartsType
      }

      // Set group if provided
      if (group.value && chart.value) {
        chart.value.group = group.value
      }

      // Bind event handlers
      bindEvents()

      // Set initial option
      if (option.value && chart.value) {
        chart.value.setOption(option.value, updateOptions.value)
      }

      // Notify ready
      if (options.onReady && chart.value) {
        options.onReady(chart.value)
      }

      return true
    } catch (err) {
      logError('Failed to initialize chart', err)
      return false
    }
  }

  /**
   * Bind event handlers
   */
  const bindEvents = () => {
    if (!chart.value) return

    if (!options.eventHandlers) return

    Object.entries(options.eventHandlers).forEach(([eventName, handler]) => {
      if (ECHARTS_EVENTS.includes(eventName as EChartsEventName) && handler) {
        try {
          chart.value?.on(eventName, handler)
        } catch (err) {
          logError(`Failed to bind event handler for "${eventName}"`, err)
        }
      }
    })
  }

  /**
   * Unbind event handlers
   */
  const unbindEvents = () => {
    if (!chart.value) return

    if (!options.eventHandlers) return

    Object.keys(options.eventHandlers).forEach((eventName) => {
      if (ECHARTS_EVENTS.includes(eventName as EChartsEventName)) {
        try {
          chart.value?.off(eventName)
        } catch (err) {
          logError(`Failed to unbind event handler for "${eventName}"`, err)
        }
      }
    })
  }

  /**
   * Resize chart
   */
  const resize = (resizeOpts?: { width?: number; height?: number; silent?: boolean }) => {
    if (!chart.value) {
      warn('Cannot resize: chart instance not initialized')
      return
    }

    try {
      chart.value.resize(resizeOpts)

      // Notify resize callback
      if (options.onResize && target.value) {
        options.onResize(target.value.offsetWidth, target.value.offsetHeight)
      }
    } catch (err) {
      logError('Failed to resize chart', err)
    }
  }

  /**
   * Cleanup function for resize observer
   */
  let resizeCleanup: (() => void) | null = null

  /**
   * Setup resize observer
   */
  const setupResize = () => {
    if (!options.autoresize || !target.value) return

    const throttle = extractThrottle(options.autoresize)
    const { setup, cleanup, observer } = createThrottledResizeObserver(target, resize, throttle)

    setup()
    resizeObserver.value = observer.value
    resizeCleanup = cleanup
  }

  /**
   * Cleanup resize observer
   */
  const cleanupResize = () => {
    if (resizeCleanup) {
      resizeCleanup()
      resizeCleanup = null
    }
    resizeObserver.value = undefined
  }

  /**
   * Set chart option
   */
  const setOption = (newOption: EChartsOption, setOpts?: SetOptionOpts) => {
    if (!chart.value) {
      warn('Cannot set option: chart instance not initialized')
      return
    }

    try {
      chart.value.setOption(newOption, setOpts ?? updateOptions.value)
    } catch (err) {
      logError('Failed to set option', err)
    }
  }

  /**
   * Show loading animation
   */
  const showLoading = (type = 'default', opts?: object) => {
    if (!chart.value) {
      warn('Cannot show loading: chart instance not initialized')
      return
    }

    try {
      chart.value.showLoading(type, opts ?? loadingOptions.value)
    } catch (err) {
      logError('Failed to show loading', err)
    }
  }

  /**
   * Hide loading animation
   */
  const hideLoading = () => {
    if (!chart.value) {
      warn('Cannot hide loading: chart instance not initialized')
      return
    }

    try {
      chart.value.hideLoading()
    } catch (err) {
      logError('Failed to hide loading', err)
    }
  }

  /**
   * Dispatch action
   */
  const dispatchAction = (payload: { type: string; [key: string]: unknown }) => {
    if (!chart.value) {
      warn('Cannot dispatch action: chart instance not initialized')
      return
    }

    try {
      chart.value.dispatchAction(payload)
    } catch (err) {
      logError('Failed to dispatch action', err)
    }
  }

  /**
   * Convert to pixel
   */
  const convertToPixel = (finder: ConvertFinder, value: ScaleDataValue): number => {
    if (!chart.value) {
      warn('Cannot convert to pixel: chart instance not initialized')
      return 0
    }

    try {
      return chart.value.convertToPixel(finder, value)
    } catch (err) {
      logError('Failed to convert to pixel', err)
      return 0
    }
  }

  /**
   * Convert from pixel (single value)
   */
  function convertFromPixel(finder: ConvertFinder, value: number): number
  /**
   * Convert from pixel (array)
   */
  function convertFromPixel(finder: ConvertFinder, value: number[]): number[]
  /**
   * Convert from pixel implementation
   */
  function convertFromPixel(finder: ConvertFinder, value: number | number[]): number | number[] {
    if (!chart.value) {
      warn('Cannot convert from pixel: chart instance not initialized')
      return Array.isArray(value) ? [0, 0] : 0
    }

    try {
      if (Array.isArray(value)) {
        return chart.value.convertFromPixel(finder, value)
      }
      return chart.value.convertFromPixel(finder, value)
    } catch (err) {
      logError('Failed to convert from pixel', err)
      return Array.isArray(value) ? [0, 0] : 0
    }
  }

  /**
   * Check if contains pixel
   */
  const containPixel = (finder: ConvertFinder, value: number[]): boolean => {
    if (!chart.value) {
      warn('Cannot check pixel containment: chart instance not initialized')
      return false
    }

    try {
      return chart.value.containPixel(finder, value)
    } catch (err) {
      logError('Failed to check pixel containment', err)
      return false
    }
  }

  /**
   * Get data URL
   */
  const getDataURL = (urlOpts?: {
    type?: 'png' | 'jpeg' | 'svg'
    pixelRatio?: number
    backgroundColor?: string
    excludeComponents?: string[]
  }): string => {
    if (!chart.value) {
      warn('Cannot get data URL: chart instance not initialized')
      return ''
    }

    try {
      return chart.value.getDataURL(urlOpts as Parameters<typeof chart.value.getDataURL>[0])
    } catch (err) {
      logError('Failed to get data URL', err)
      return ''
    }
  }

  /**
   * Clear chart
   */
  const clear = () => {
    if (!chart.value) {
      warn('Cannot clear: chart instance not initialized')
      return
    }

    try {
      chart.value.clear()
    } catch (err) {
      logError('Failed to clear chart', err)
    }
  }

  /**
   * Dispose chart instance
   */
  const dispose = () => {
    try {
      unbindEvents()
      cleanupResize()
      if (chart.value) {
        chart.value.dispose()
        chart.value = undefined
      }
    } catch (err) {
      logError('Failed to dispose chart', err)
    }
  }

  /**
   * Update group dynamically
   */
  const updateGroup = (newGroup: string | undefined) => {
    if (chart.value && newGroup) {
      chart.value.group = newGroup
    }
  }

  return {
    // State
    chart,

    // Lifecycle methods
    initChart,
    dispose,

    // Chart methods
    setOption,
    resize,
    clear,

    // Loading methods
    showLoading,
    hideLoading,

    // Action and conversion methods
    dispatchAction,
    convertToPixel,
    convertFromPixel,
    containPixel,
    getDataURL,

    // Resize observer
    setupResize,
    cleanupResize,

    // Group management
    updateGroup
  }
}
