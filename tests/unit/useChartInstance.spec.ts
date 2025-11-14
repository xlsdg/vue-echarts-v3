import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ref, type Ref } from 'vue'
import { useChartInstance } from '@/composables/useChartInstance'
import type { EChartsOption, EChartsType } from 'echarts'
import * as logger from '@/utils/logger'

// Mock logger
vi.mock('@/utils/logger', () => ({
  warn: vi.fn(),
  error: vi.fn(),
  info: vi.fn()
}))

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
    getInstanceByDom: vi.fn(() => null)
  }
})

describe('useChartInstance', () => {
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

  describe('initialization', () => {
    it('initializes chart instance', () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const { initChart } = useChartInstance(target, mockOption)

      expect(initChart()).toBe(true)
      expect(echarts.init).toHaveBeenCalledWith(target.value, undefined, undefined)
    })

    it('returns false when target is not available', () => {
      const target = ref<HTMLElement | undefined>(undefined)
      const { initChart } = useChartInstance(target, mockOption)

      expect(initChart()).toBe(false)
      expect(logger.warn).toHaveBeenCalledWith('Cannot initialize chart: target element is not available')
    })

    it('initializes with theme', () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const { initChart } = useChartInstance(target, mockOption, { theme: 'dark' })

      initChart()
      expect(echarts.init).toHaveBeenCalledWith(target.value, 'dark', undefined)
    })

    it('initializes with theme ref', () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const theme = ref('dark')
      const { initChart } = useChartInstance(target, mockOption, { theme })

      initChart()
      expect(echarts.init).toHaveBeenCalledWith(target.value, 'dark', undefined)
    })

    it('initializes with init options', () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const initOptions = { renderer: 'svg' as const }
      const { initChart } = useChartInstance(target, mockOption, { initOptions })

      initChart()
      expect(echarts.init).toHaveBeenCalledWith(target.value, undefined, initOptions)
    })

    it('sets group on initialization', () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const { initChart, chart } = useChartInstance(target, mockOption, { group: 'test-group' })

      initChart()
      expect(chart.value?.group).toBe('test-group')
    })

    it('calls onReady callback', () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const onReady = vi.fn()
      const { initChart } = useChartInstance(target, mockOption, { onReady })

      initChart()
      expect(onReady).toHaveBeenCalledWith(mockChartInstance)
    })

    it('handles initialization error', () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      echarts.init.mockImplementationOnce(() => {
        throw new Error('Init failed')
      })

      const { initChart } = useChartInstance(target, mockOption)
      expect(initChart()).toBe(false)
      expect(logger.error).toHaveBeenCalledWith('Failed to initialize chart', expect.any(Error))
    })

    it('reuses existing instance if available', () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const existingInstance = { ...mockChartInstance }
      echarts.getInstanceByDom.mockReturnValueOnce(existingInstance)

      const { initChart, chart } = useChartInstance(target, mockOption)
      initChart()

      expect(echarts.getInstanceByDom).toHaveBeenCalledWith(target.value)
      expect(chart.value).toBe(existingInstance)
    })
  })

  describe('setOption', () => {
    it('sets option on chart', () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const { initChart, setOption } = useChartInstance(target, mockOption)

      initChart()
      const newOption: EChartsOption = { title: { text: 'New' } }
      setOption(newOption)

      expect(mockChartInstance.setOption).toHaveBeenCalledWith(newOption, { notMerge: false, lazyUpdate: false })
    })

    it('warns when chart is not initialized', () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const { setOption } = useChartInstance(target, mockOption)

      setOption({ title: { text: 'New' } })
      expect(logger.warn).toHaveBeenCalledWith('Cannot set option: chart instance not initialized')
    })

    it('uses custom update options', () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const updateOptions = { notMerge: true, lazyUpdate: true }
      const { initChart, setOption } = useChartInstance(target, mockOption, { updateOptions })

      initChart()
      const newOption: EChartsOption = { title: { text: 'New' } }
      setOption(newOption)

      expect(mockChartInstance.setOption).toHaveBeenCalledWith(newOption, updateOptions)
    })

    it('handles setOption error', () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const { initChart, setOption } = useChartInstance(target, mockOption)

      initChart()
      mockChartInstance.setOption.mockImplementationOnce(() => {
        throw new Error('SetOption failed')
      })

      setOption({ title: { text: 'New' } })
      expect(logger.error).toHaveBeenCalledWith('Failed to set option', expect.any(Error))
    })
  })

  describe('resize', () => {
    it('resizes chart', () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      Object.defineProperty(target.value, 'offsetWidth', { value: 600, writable: true })
      Object.defineProperty(target.value, 'offsetHeight', { value: 400, writable: true })

      const { initChart, resize } = useChartInstance(target, mockOption)
      initChart()
      resize()

      expect(mockChartInstance.resize).toHaveBeenCalled()
    })

    it('resizes chart with options', () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const { initChart, resize } = useChartInstance(target, mockOption)

      initChart()
      resize({ width: 800, height: 600, silent: true })

      expect(mockChartInstance.resize).toHaveBeenCalledWith({ width: 800, height: 600, silent: true })
    })

    it('calls onResize callback', () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      Object.defineProperty(target.value, 'offsetWidth', { value: 600, writable: true })
      Object.defineProperty(target.value, 'offsetHeight', { value: 400, writable: true })

      const onResize = vi.fn()
      const { initChart, resize } = useChartInstance(target, mockOption, { onResize })

      initChart()
      resize()

      expect(onResize).toHaveBeenCalledWith(600, 400)
    })

    it('warns when chart is not initialized', () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const { resize } = useChartInstance(target, mockOption)

      resize()
      expect(logger.warn).toHaveBeenCalledWith('Cannot resize: chart instance not initialized')
    })

    it('handles resize error', () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const { initChart, resize } = useChartInstance(target, mockOption)

      initChart()
      mockChartInstance.resize.mockImplementationOnce(() => {
        throw new Error('Resize failed')
      })

      resize()
      expect(logger.error).toHaveBeenCalledWith('Failed to resize chart', expect.any(Error))
    })
  })

  describe('loading', () => {
    it('shows loading', () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const { initChart, showLoading } = useChartInstance(target, mockOption)

      initChart()
      showLoading()

      expect(mockChartInstance.showLoading).toHaveBeenCalledWith('default', undefined)
    })

    it('shows loading with options', () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const loadingOptions = { text: 'Loading...' }
      const { initChart, showLoading } = useChartInstance(target, mockOption, { loadingOptions })

      initChart()
      showLoading('default', { text: 'Custom' })

      expect(mockChartInstance.showLoading).toHaveBeenCalledWith('default', { text: 'Custom' })
    })

    it('hides loading', () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const { initChart, hideLoading } = useChartInstance(target, mockOption)

      initChart()
      hideLoading()

      expect(mockChartInstance.hideLoading).toHaveBeenCalled()
    })

    it('warns when showing loading without initialized chart', () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const { showLoading } = useChartInstance(target, mockOption)

      showLoading()
      expect(logger.warn).toHaveBeenCalledWith('Cannot show loading: chart instance not initialized')
    })

    it('warns when hiding loading without initialized chart', () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const { hideLoading } = useChartInstance(target, mockOption)

      hideLoading()
      expect(logger.warn).toHaveBeenCalledWith('Cannot hide loading: chart instance not initialized')
    })
  })

  describe('actions and conversions', () => {
    it('dispatches action', () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const { initChart, dispatchAction } = useChartInstance(target, mockOption)

      initChart()
      const action = { type: 'highlight', seriesIndex: 0 }
      dispatchAction(action)

      expect(mockChartInstance.dispatchAction).toHaveBeenCalledWith(action)
    })

    it('converts to pixel', () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const { initChart, convertToPixel } = useChartInstance(target, mockOption)

      initChart()
      mockChartInstance.convertToPixel.mockReturnValue(100)
      const result = convertToPixel({ xAxisIndex: 0 }, 10)

      expect(result).toBe(100)
      expect(mockChartInstance.convertToPixel).toHaveBeenCalledWith({ xAxisIndex: 0 }, 10)
    })

    it('converts from pixel (number)', () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const { initChart, convertFromPixel } = useChartInstance(target, mockOption)

      initChart()
      mockChartInstance.convertFromPixel.mockReturnValue(50)
      const result = convertFromPixel({ xAxisIndex: 0 }, 100)

      expect(result).toBe(50)
    })

    it('converts from pixel (array)', () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const { initChart, convertFromPixel } = useChartInstance(target, mockOption)

      initChart()
      mockChartInstance.convertFromPixel.mockReturnValue([50, 50])
      const result = convertFromPixel({ xAxisIndex: 0 }, [100, 200])

      expect(result).toEqual([50, 50])
    })

    it('contains pixel', () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const { initChart, containPixel } = useChartInstance(target, mockOption)

      initChart()
      const result = containPixel({ xAxisIndex: 0 }, [100, 200])

      expect(result).toBe(true)
    })

    it('gets data URL', () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const { initChart, getDataURL } = useChartInstance(target, mockOption)

      initChart()
      const result = getDataURL({ type: 'png', pixelRatio: 2 })

      expect(result).toBe('data:image/png;base64,test')
    })

    it('returns default values when chart not initialized', () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const { convertToPixel, convertFromPixel, containPixel, getDataURL } = useChartInstance(target, mockOption)

      expect(convertToPixel({ xAxisIndex: 0 }, 10)).toBe(0)
      expect(convertFromPixel({ xAxisIndex: 0 }, 100)).toBe(0)
      expect(convertFromPixel({ xAxisIndex: 0 }, [100, 200])).toEqual([0, 0])
      expect(containPixel({ xAxisIndex: 0 }, [100, 200])).toBe(false)
      expect(getDataURL()).toBe('')
    })

    it('handles errors in actions and conversions', () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const { initChart, dispatchAction, convertToPixel, convertFromPixel, containPixel, getDataURL } =
        useChartInstance(target, mockOption)

      initChart()

      mockChartInstance.dispatchAction.mockImplementationOnce(() => {
        throw new Error('Failed')
      })
      mockChartInstance.convertToPixel.mockImplementationOnce(() => {
        throw new Error('Failed')
      })
      mockChartInstance.convertFromPixel.mockImplementationOnce(() => {
        throw new Error('Failed')
      })
      mockChartInstance.containPixel.mockImplementationOnce(() => {
        throw new Error('Failed')
      })
      mockChartInstance.getDataURL.mockImplementationOnce(() => {
        throw new Error('Failed')
      })

      dispatchAction({ type: 'highlight' })
      expect(convertToPixel({ xAxisIndex: 0 }, 10)).toBe(0)
      expect(convertFromPixel({ xAxisIndex: 0 }, 100)).toBe(0)
      expect(containPixel({ xAxisIndex: 0 }, [100, 200])).toBe(false)
      expect(getDataURL()).toBe('')

      expect(logger.error).toHaveBeenCalledTimes(5)
    })
  })

  describe('clear and dispose', () => {
    it('clears chart', () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const { initChart, clear } = useChartInstance(target, mockOption)

      initChart()
      clear()

      expect(mockChartInstance.clear).toHaveBeenCalled()
    })

    it('disposes chart', () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const { initChart, dispose } = useChartInstance(target, mockOption)

      initChart()
      dispose()

      expect(mockChartInstance.dispose).toHaveBeenCalled()
    })

    it('warns when clearing uninitialized chart', () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const { clear } = useChartInstance(target, mockOption)

      clear()
      expect(logger.warn).toHaveBeenCalledWith('Cannot clear: chart instance not initialized')
    })

    it('handles clear error', () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const { initChart, clear } = useChartInstance(target, mockOption)

      initChart()
      mockChartInstance.clear.mockImplementationOnce(() => {
        throw new Error('Clear failed')
      })

      clear()
      expect(logger.error).toHaveBeenCalledWith('Failed to clear chart', expect.any(Error))
    })

    it('handles dispose error', () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const { initChart, dispose } = useChartInstance(target, mockOption)

      initChart()
      mockChartInstance.dispose.mockImplementationOnce(() => {
        throw new Error('Dispose failed')
      })

      dispose()
      expect(logger.error).toHaveBeenCalledWith('Failed to dispose chart', expect.any(Error))
    })
  })

  describe('event handlers', () => {
    it('binds event handlers on init', () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const clickHandler = vi.fn()
      const { initChart } = useChartInstance(target, mockOption, {
        eventHandlers: { click: clickHandler }
      })

      initChart()
      expect(mockChartInstance.on).toHaveBeenCalledWith('click', clickHandler)
    })

    it('unbinds event handlers on dispose', () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const clickHandler = vi.fn()
      const { initChart, dispose } = useChartInstance(target, mockOption, {
        eventHandlers: { click: clickHandler }
      })

      initChart()
      dispose()
      expect(mockChartInstance.off).toHaveBeenCalledWith('click')
    })

    it('handles event binding error', () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const clickHandler = vi.fn()

      mockChartInstance.on.mockImplementationOnce(() => {
        throw new Error('Bind failed')
      })

      const { initChart } = useChartInstance(target, mockOption, {
        eventHandlers: { click: clickHandler }
      })

      initChart()
      expect(logger.error).toHaveBeenCalledWith('Failed to bind event handler for "click"', expect.any(Error))
    })

    it('handles event unbinding error', () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const clickHandler = vi.fn()

      mockChartInstance.off.mockImplementationOnce(() => {
        throw new Error('Unbind failed')
      })

      const { initChart, dispose } = useChartInstance(target, mockOption, {
        eventHandlers: { click: clickHandler }
      })

      initChart()
      dispose()
      expect(logger.error).toHaveBeenCalledWith('Failed to unbind event handler for "click"', expect.any(Error))
    })
  })

  describe('resize observer', () => {
    it('sets up resize observer', () => {
      const observeSpy = vi.fn()
      global.ResizeObserver = class ResizeObserver {
        observe = observeSpy
        unobserve = vi.fn()
        disconnect = vi.fn()
        constructor(public callback: ResizeObserverCallback) {}
      }

      const target = ref<HTMLElement>(document.createElement('div'))
      const { initChart, setupResize } = useChartInstance(target, mockOption, { autoresize: true })

      initChart()
      setupResize()

      expect(observeSpy).toHaveBeenCalledWith(target.value)
    })

    it('cleans up resize observer', () => {
      const disconnectSpy = vi.fn()
      global.ResizeObserver = class ResizeObserver {
        observe = vi.fn()
        unobserve = vi.fn()
        disconnect = disconnectSpy
        constructor(public callback: ResizeObserverCallback) {}
      }

      const target = ref<HTMLElement>(document.createElement('div'))
      const { initChart, setupResize, cleanupResize } = useChartInstance(target, mockOption, { autoresize: true })

      initChart()
      setupResize()
      cleanupResize()

      expect(disconnectSpy).toHaveBeenCalled()
    })

    it('does not setup resize observer when autoresize is false', () => {
      const observeSpy = vi.fn()
      global.ResizeObserver = class ResizeObserver {
        observe = observeSpy
        unobserve = vi.fn()
        disconnect = vi.fn()
        constructor(public callback: ResizeObserverCallback) {}
      }

      const target = ref<HTMLElement>(document.createElement('div'))
      const { initChart, setupResize } = useChartInstance(target, mockOption, { autoresize: false })

      initChart()
      setupResize()

      expect(observeSpy).not.toHaveBeenCalled()
    })
  })

  describe('group management', () => {
    it('updates group', () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const { initChart, chart, updateGroup } = useChartInstance(target, mockOption)

      initChart()
      updateGroup('new-group')

      expect(chart.value?.group).toBe('new-group')
    })

    it('does not update group if chart not initialized', () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const { updateGroup } = useChartInstance(target, mockOption)

      // Should not throw
      expect(() => updateGroup('new-group')).not.toThrow()
    })

    it('does not update group if newGroup is undefined', () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const { initChart, chart, updateGroup } = useChartInstance(target, mockOption, { group: 'initial-group' })

      initChart()
      const initialGroup = chart.value?.group

      updateGroup(undefined)

      expect(chart.value?.group).toBe(initialGroup)
    })
  })
})
