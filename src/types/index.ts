import type { PropType, ExtractPropTypes } from 'vue'
import type {
  EChartsType,
  EChartsOption,
  SetOptionOpts as EChartsSetOptionOpts,
  EChartsInitOpts,
  ECElementEvent,
  SelectChangedPayload
} from 'echarts/types/dist/echarts'

/**
 * Extended SetOptionOpts with manual update flag
 */
export interface SetOptionOpts extends EChartsSetOptionOpts {
  manual?: boolean
}

/**
 * Component props definition
 */
export const vChartProps = {
  /**
   * ECharts option configuration object
   */
  option: {
    type: Object as PropType<EChartsOption>,
    required: true
  },
  /**
   * Theme to be applied
   * Can be a theme name (string) or theme object
   */
  theme: {
    type: [String, Object] as PropType<string | object>,
    default: undefined
  },
  /**
   * Options for ECharts initialization
   */
  initOptions: {
    type: Object as PropType<EChartsInitOpts>,
    default: undefined
  },
  /**
   * Options for setOption method
   */
  updateOptions: {
    type: Object as PropType<SetOptionOpts>,
    default: () => ({ notMerge: false, lazyUpdate: false })
  },
  /**
   * Whether to show loading animation
   */
  loading: {
    type: Boolean,
    default: false
  },
  /**
   * Loading animation configuration
   */
  loadingOptions: {
    type: Object,
    default: undefined
  },
  /**
   * Whether to enable auto-resize when container size changes
   * Can be true/false or config object with throttle option
   */
  autoresize: {
    type: [Boolean, Object] as PropType<boolean | { throttle?: number }>,
    default: false
  },
  /**
   * Group name for chart connection
   */
  group: {
    type: String,
    default: undefined
  }
} as const

/**
 * Extracted prop types
 */
export type VChartProps = ExtractPropTypes<typeof vChartProps>

/**
 * Generic ECharts event payload type
 * For events without specific type definitions from ECharts
 */
export type EChartsEventPayload = Record<string, unknown>

/**
 * Component emit events
 */
export interface VChartEmits {
  /**
   * Emitted when chart instance is ready
   */
  (e: 'ready', instance: EChartsType): void
  /**
   * Emitted when chart is resized
   */
  (e: 'resize', width: number, height: number): void
  /**
   * ECharts mouse/interaction events
   */
  (e: 'click', event: ECElementEvent): void
  (e: 'dblclick', event: ECElementEvent): void
  (e: 'mousedown', event: ECElementEvent): void
  (e: 'mousemove', event: ECElementEvent): void
  (e: 'mouseup', event: ECElementEvent): void
  (e: 'mouseover', event: ECElementEvent): void
  (e: 'mouseout', event: ECElementEvent): void
  (e: 'globalout', event: ECElementEvent): void
  (e: 'contextmenu', event: ECElementEvent): void
  /**
   * ECharts highlight/select events
   */
  (e: 'highlight', event: EChartsEventPayload): void
  (e: 'downplay', event: EChartsEventPayload): void
  (e: 'selectchanged', event: SelectChangedPayload): void
  /**
   * ECharts legend events
   */
  (e: 'legendselectchanged', event: SelectChangedPayload): void
  (e: 'legendselected', event: EChartsEventPayload): void
  (e: 'legendunselected', event: EChartsEventPayload): void
  (e: 'legendselectall', event: EChartsEventPayload): void
  (e: 'legendinverseselect', event: EChartsEventPayload): void
  (e: 'legendscroll', event: EChartsEventPayload): void
  /**
   * ECharts data zoom events
   */
  (e: 'datazoom', event: EChartsEventPayload): void
  (e: 'datarangeselected', event: EChartsEventPayload): void
  /**
   * ECharts timeline events
   */
  (e: 'timelinechanged', event: EChartsEventPayload): void
  (e: 'timelineplaychanged', event: EChartsEventPayload): void
  /**
   * ECharts toolbox events
   */
  (e: 'restore', event: EChartsEventPayload): void
  (e: 'dataviewchanged', event: EChartsEventPayload): void
  (e: 'magictypechanged', event: EChartsEventPayload): void
  /**
   * ECharts geo events
   */
  (e: 'geoselectchanged', event: SelectChangedPayload): void
  (e: 'geoselected', event: EChartsEventPayload): void
  (e: 'geounselected', event: EChartsEventPayload): void
  (e: 'georoam', event: EChartsEventPayload): void
  /**
   * ECharts pie events
   */
  (e: 'pieselectchanged', event: SelectChangedPayload): void
  (e: 'pieselected', event: EChartsEventPayload): void
  (e: 'pieunselected', event: EChartsEventPayload): void
  /**
   * ECharts map events
   */
  (e: 'mapselectchanged', event: SelectChangedPayload): void
  (e: 'mapselected', event: EChartsEventPayload): void
  (e: 'mapunselected', event: EChartsEventPayload): void
  /**
   * ECharts graph events
   */
  (e: 'graphroam', event: EChartsEventPayload): void
  (e: 'focusnodeadjacency', event: EChartsEventPayload): void
  (e: 'unfocusnodeadjacency', event: EChartsEventPayload): void
  /**
   * ECharts tree events
   */
  (e: 'treeroam', event: EChartsEventPayload): void
  (e: 'treeexpandandcollapse', event: EChartsEventPayload): void
  /**
   * ECharts brush events
   */
  (e: 'axisareaselected', event: EChartsEventPayload): void
  (e: 'brush', event: EChartsEventPayload): void
  (e: 'brushselected', event: EChartsEventPayload): void
  (e: 'brushEnd', event: EChartsEventPayload): void
  /**
   * ECharts rendering events
   */
  (e: 'globalcursortaken', event: EChartsEventPayload): void
  (e: 'rendered', event: EChartsEventPayload): void
  (e: 'finished', event: EChartsEventPayload): void
}

/**
 * Component exposed methods
 */
export interface VChartExposed {
  /**
   * Get the ECharts instance
   */
  getInstance: () => EChartsType | undefined
  /**
   * Set chart option
   */
  setOption: (option: EChartsOption, opts?: SetOptionOpts) => void
  /**
   * Resize the chart
   */
  resize: (opts?: { width?: number; height?: number; silent?: boolean }) => void
  /**
   * Dispatch an action
   */
  dispatchAction: (payload: { type: string; [key: string]: unknown }) => void
  /**
   * Convert logical position to pixel position
   */
  convertToPixel: (finder: ConvertFinder, value: ScaleDataValue) => number
  /**
   * Convert pixel position to logical position
   */
  convertFromPixel: {
    (finder: ConvertFinder, value: number): number
    (finder: ConvertFinder, value: number[]): number[]
  }
  /**
   * Check if pixel position is in the given coordinate system
   */
  containPixel: (finder: ConvertFinder, value: number[]) => boolean
  /**
   * Show loading animation
   */
  showLoading: (type?: string, opts?: object) => void
  /**
   * Hide loading animation
   */
  hideLoading: () => void
  /**
   * Get data URL (for export)
   */
  getDataURL: (opts?: {
    type?: 'png' | 'jpeg' | 'svg'
    pixelRatio?: number
    backgroundColor?: string
    excludeComponents?: string[]
  }) => string
  /**
   * Clear the chart
   */
  clear: () => void
  /**
   * Dispose the chart instance
   */
  dispose: () => void
}

/**
 * Resize observer config
 */
export interface ResizeConfig {
  throttle?: number
}

/**
 * Convert finder for coordinate conversion
 * Can be a component ID, index, or a finder object
 */
export type ConvertFinder =
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

/**
 * Scale data value type
 */
export type ScaleDataValue = string | number | Date

/**
 * ECharts event names
 * @see https://echarts.apache.org/en/api.html#events
 */
export const ECHARTS_EVENTS = [
  // Mouse events
  'click',
  'dblclick',
  'mousedown',
  'mousemove',
  'mouseup',
  'mouseover',
  'mouseout',
  'globalout',
  'contextmenu',
  // Highlight/Select events
  'highlight',
  'downplay',
  'selectchanged',
  // Legend events
  'legendselectchanged',
  'legendselected',
  'legendunselected',
  'legendselectall',
  'legendinverseselect',
  'legendscroll',
  // Data zoom events
  'datazoom',
  'datarangeselected',
  // Timeline events
  'timelinechanged',
  'timelineplaychanged',
  // Toolbox events
  'restore',
  'dataviewchanged',
  'magictypechanged',
  // Geo events
  'geoselectchanged',
  'geoselected',
  'geounselected',
  'georoam',
  // Pie events
  'pieselectchanged',
  'pieselected',
  'pieunselected',
  // Map events
  'mapselectchanged',
  'mapselected',
  'mapunselected',
  // Graph events
  'graphroam',
  'focusnodeadjacency',
  'unfocusnodeadjacency',
  // Tree events
  'treeroam',
  'treeexpandandcollapse',
  // Brush events
  'axisareaselected',
  'brush',
  'brushselected',
  'brushEnd',
  // Other events
  'globalcursortaken',
  'rendered',
  'finished'
] as const

export type EChartsEventName = typeof ECHARTS_EVENTS[number]
