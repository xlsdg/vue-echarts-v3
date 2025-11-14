import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ref, nextTick, defineComponent, h, type Ref } from 'vue'
import { mount } from '@vue/test-utils'
import {
  useECharts,
  connect,
  disconnect,
  getInstanceByDom,
  registerMap,
  getMap,
  registerTheme
} from '@/composables/useECharts'
import type { EChartsOption, EChartsType } from 'echarts'
import type { TestGeoJSON } from '../types'

// Mock echarts
vi.mock('echarts/core', () => {
  const mockChart: Partial<EChartsType> = {
    setOption: vi.fn(),
    resize: vi.fn(),
    dispose: vi.fn(),
    showLoading: vi.fn(),
    hideLoading: vi.fn(),
    on: vi.fn(),
    off: vi.fn(),
    dispatchAction: vi.fn(),
    convertToPixel: vi.fn() as unknown as EChartsType['convertToPixel'],
    convertFromPixel: vi.fn() as unknown as EChartsType['convertFromPixel'],
    containPixel: vi.fn(() => true),
    getDataURL: vi.fn(() => 'data:image/png;base64,test'),
    clear: vi.fn(),
    group: undefined
  }

  return {
    init: vi.fn(() => mockChart),
    getInstanceByDom: vi.fn(() => null),
    connect: vi.fn(),
    disconnect: vi.fn(),
    registerMap: vi.fn(),
    getMap: vi.fn(() => ({ geoJson: {} })),
    registerTheme: vi.fn()
  }
})

// Mock useChartInstance
vi.mock('@/composables/useChartInstance', async () => {
  const actual = await vi.importActual('@/composables/useChartInstance')
  return actual
})

describe('useECharts', () => {
  const mockOption = ref({
    title: { text: 'Test' },
    series: [{ type: 'line', data: [1, 2, 3] }]
  }) as unknown as Ref<EChartsOption>

  let echarts: any
  let mockChartInstance: any

  beforeEach(async () => {
    echarts = await import('echarts/core')
    mockChartInstance = echarts.init()
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  // Helper to test composables in component context
  function withSetup<T>(composable: () => T) {
    let result: T
    const app = mount(
      defineComponent({
        setup() {
          result = composable()
          return () => h('div')
        }
      })
    )
    return { result: result!, app }
  }

  describe('basic usage', () => {
    it('returns chart methods', () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const { result } = withSetup(() => useECharts(target, mockOption))

      expect(result).toHaveProperty('chart')
      expect(result).toHaveProperty('setOption')
      expect(result).toHaveProperty('resize')
      expect(result).toHaveProperty('dispatchAction')
      expect(result).toHaveProperty('convertToPixel')
      expect(result).toHaveProperty('convertFromPixel')
      expect(result).toHaveProperty('containPixel')
      expect(result).toHaveProperty('showLoading')
      expect(result).toHaveProperty('hideLoading')
      expect(result).toHaveProperty('getDataURL')
      expect(result).toHaveProperty('clear')
      expect(result).toHaveProperty('dispose')
    })
  })

  describe('option watching', () => {
    it('watches option changes by default', async () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const option = ref({ title: { text: 'Test' } }) as unknown as Ref<EChartsOption>

      withSetup(() => useECharts(target, option))

      // Wait for mount
      await nextTick()

      // Clear previous calls
      mockChartInstance.setOption.mockClear()

      // Update option
      option.value = { title: { text: 'Updated' } }
      await nextTick()

      expect(mockChartInstance.setOption).toHaveBeenCalled()
    })

    it('does not watch option changes in manual mode', async () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const option = ref({ title: { text: 'Test' } }) as unknown as Ref<EChartsOption>

      withSetup(() => useECharts(target, option, { manual: true }))

      // Wait for mount
      await nextTick()

      // Clear previous calls
      mockChartInstance.setOption.mockClear()

      // Update option
      option.value = { title: { text: 'Updated' } }
      await nextTick()

      expect(mockChartInstance.setOption).not.toHaveBeenCalled()
    })
  })

  describe('loading state', () => {
    it('watches loading state', async () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const loading = ref(false)

      withSetup(() => useECharts(target, mockOption, { loading }))

      await nextTick()

      mockChartInstance.showLoading.mockClear()
      mockChartInstance.hideLoading.mockClear()

      loading.value = true
      await nextTick()

      expect(mockChartInstance.showLoading).toHaveBeenCalled()

      loading.value = false
      await nextTick()

      expect(mockChartInstance.hideLoading).toHaveBeenCalled()
    })

    it('shows loading on mount if loading is true', async () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const loading = ref(true)

      withSetup(() => useECharts(target, mockOption, { loading }))

      await nextTick()

      expect(mockChartInstance.showLoading).toHaveBeenCalled()
    })

    it('does not show loading on mount if loading is false', async () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const loading = ref(false)

      withSetup(() => useECharts(target, mockOption, { loading }))

      await nextTick()

      expect(mockChartInstance.showLoading).not.toHaveBeenCalled()
    })
  })

  describe('group watching', () => {
    it('watches group changes when group is a ref', async () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const group = ref('group1')

      withSetup(() => useECharts(target, mockOption, { group }))

      await nextTick()

      group.value = 'group2'
      await nextTick()

      // The group should be updated on the chart instance
      expect(mockChartInstance.group).toBe('group2')
    })

    it('does not watch group when it is a string', async () => {
      const target = ref<HTMLElement>(document.createElement('div'))

      withSetup(() => useECharts(target, mockOption, { group: 'static-group' }))

      await nextTick()

      // Should initialize with group but not watch for changes
      expect(mockChartInstance.group).toBe('static-group')
    })

    it('handles undefined group in watcher', async () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const group = ref<string | undefined>('group1')

      withSetup(() => useECharts(target, mockOption, { group }))

      await nextTick()

      const previousGroup = mockChartInstance.group

      group.value = undefined
      await nextTick()

      // Should not update to undefined
      expect(mockChartInstance.group).toBe(previousGroup)
    })
  })

  describe('event handlers', () => {
    it('binds event handlers', async () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const clickHandler = vi.fn()

      withSetup(() => useECharts(target, mockOption, {}, { click: clickHandler }))

      await nextTick()

      expect(mockChartInstance.on).toHaveBeenCalledWith('click', clickHandler)
    })

    it('supports multiple event handlers', async () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const clickHandler = vi.fn()
      const hoverHandler = vi.fn()

      withSetup(() =>
        useECharts(
          target,
          mockOption,
          {},
          {
            click: clickHandler,
            mouseover: hoverHandler
          }
        )
      )

      await nextTick()

      expect(mockChartInstance.on).toHaveBeenCalledWith('click', clickHandler)
      expect(mockChartInstance.on).toHaveBeenCalledWith('mouseover', hoverHandler)
    })
  })

  describe('options', () => {
    it('passes theme to chart instance', async () => {
      const target = ref<HTMLElement>(document.createElement('div'))

      withSetup(() => useECharts(target, mockOption, { theme: 'dark' }))

      await nextTick()

      expect(echarts.init).toHaveBeenCalledWith(target.value, 'dark', undefined)
    })

    it('passes initOptions to chart instance', async () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const initOptions = { renderer: 'svg' as const }

      withSetup(() => useECharts(target, mockOption, { initOptions }))

      await nextTick()

      expect(echarts.init).toHaveBeenCalledWith(target.value, undefined, initOptions)
    })

    it('passes updateOptions to setOption', async () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const updateOptions = { notMerge: true, lazyUpdate: true }
      const option = ref({ title: { text: 'Test' } }) as unknown as Ref<EChartsOption>

      withSetup(() => useECharts(target, option, { updateOptions }))

      await nextTick()

      // Clear initial setOption call
      mockChartInstance.setOption.mockClear()

      // Trigger option update
      option.value = { title: { text: 'Updated' } }
      await nextTick()

      expect(mockChartInstance.setOption).toHaveBeenCalledWith(
        expect.objectContaining({ title: { text: 'Updated' } }),
        updateOptions
      )
    })

    it('passes loadingOptions to chart instance', async () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const loadingOptions = { text: 'Loading...' }
      const loading = ref(true)

      withSetup(() => useECharts(target, mockOption, { loading, loadingOptions }))

      await nextTick()

      expect(mockChartInstance.showLoading).toHaveBeenCalledWith('default', loadingOptions)
    })

    it('passes autoresize option', async () => {
      const observeSpy = vi.fn()
      global.ResizeObserver = class ResizeObserver {
        observe = observeSpy
        unobserve = vi.fn()
        disconnect = vi.fn()
        constructor(public callback: ResizeObserverCallback) {}
      }

      const target = ref<HTMLElement>(document.createElement('div'))

      withSetup(() => useECharts(target, mockOption, { autoresize: true }))

      await nextTick()

      expect(observeSpy).toHaveBeenCalledWith(target.value)
    })
  })

  describe('static methods', () => {
    it('exports connect method', () => {
      connect('test-group')
      expect(echarts.connect).toHaveBeenCalledWith('test-group')
    })

    it('exports disconnect method', () => {
      disconnect('test-group')
      expect(echarts.disconnect).toHaveBeenCalledWith('test-group')
    })

    it('exports getInstanceByDom method', () => {
      const element = document.createElement('div')
      getInstanceByDom(element)
      expect(echarts.getInstanceByDom).toHaveBeenCalledWith(element)
    })

    it('exports registerMap method', () => {
      const geoJson: TestGeoJSON = { type: 'FeatureCollection', features: [] }
      registerMap('test-map', geoJson as any) // ECharts expects specific GeoJSON structure
      expect(echarts.registerMap).toHaveBeenCalledWith('test-map', geoJson, undefined)
    })

    it('exports registerMap with specialAreas', () => {
      const geoJson: TestGeoJSON = { type: 'FeatureCollection', features: [] }
      const specialAreas = { area1: { left: 0, top: 0, width: 100, height: 100 } }
      registerMap('test-map', geoJson as any, specialAreas) // ECharts expects specific GeoJSON structure
      expect(echarts.registerMap).toHaveBeenCalledWith('test-map', geoJson, specialAreas)
    })

    it('exports getMap method', () => {
      const result = getMap('test-map')
      expect(echarts.getMap).toHaveBeenCalledWith('test-map')
      expect(result).toEqual({ geoJson: {} })
    })

    it('exports registerTheme method', () => {
      const theme = { color: ['#ff0000'] }
      registerTheme('test-theme', theme)
      expect(echarts.registerTheme).toHaveBeenCalledWith('test-theme', theme)
    })
  })
})
