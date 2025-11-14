import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import VChart from '@/components/VChart.vue'
import type { EChartsOption } from 'echarts'
import type { VChartExposed } from '@/types'
import { getFirstMockResult, setProps } from '../types'

// Mock echarts
vi.mock('echarts/core', async () => {
  const actual = await vi.importActual('echarts/core')
  return {
    ...actual,
    init: vi.fn(() => ({
      setOption: vi.fn(),
      resize: vi.fn(),
      dispose: vi.fn(),
      showLoading: vi.fn(),
      hideLoading: vi.fn(),
      on: vi.fn(),
      off: vi.fn(),
      dispatchAction: vi.fn(),
      convertToPixel: vi.fn(() => 0),
      convertFromPixel: vi.fn(() => 0),
      containPixel: vi.fn(() => false),
      getDataURL: vi.fn(() => ''),
      clear: vi.fn(),
      group: undefined
    })),
    getInstanceByDom: vi.fn(() => null)
  }
})

describe('VChart.vue', () => {
  const mockOption: EChartsOption = {
    title: { text: 'Test Chart' },
    xAxis: { type: 'category', data: ['A', 'B', 'C'] },
    yAxis: { type: 'value' },
    series: [{ type: 'line', data: [1, 2, 3] }]
  }

  let echarts: Awaited<typeof import('echarts/core')>

  beforeEach(async () => {
    echarts = await import('echarts/core')
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('Component Rendering', () => {
    it('renders the chart container', () => {
      const wrapper = mount(VChart, {
        props: { option: mockOption }
      })

      expect(wrapper.find('.v-chart').exists()).toBe(true)
    })

    it('has correct default classes', () => {
      const wrapper = mount(VChart, {
        props: { option: mockOption }
      })

      const element = wrapper.find('.v-chart').element as HTMLElement
      expect(element.className).toContain('v-chart')
    })
  })

  describe('Initialization', () => {
    it('initializes ECharts instance on mount', async () => {
      mount(VChart, {
        props: { option: mockOption }
      })

      await nextTick()
      expect(echarts.init).toHaveBeenCalled()
    })

    it('emits ready event with instance', async () => {
      const wrapper = mount(VChart, {
        props: { option: mockOption }
      })

      await nextTick()
      expect(wrapper.emitted('ready')).toBeTruthy()
      expect(wrapper.emitted('ready')?.[0]).toHaveLength(1)
    })

    it('sets initial option on mount', async () => {
      mount(VChart, {
        props: { option: mockOption }
      })

      await nextTick()
      const mockInstance = getFirstMockResult(echarts.init)
      expect(mockInstance.setOption).toHaveBeenCalledWith(
        mockOption,
        expect.any(Object)
      )
    })

    it('initializes with theme', async () => {
      const theme = 'dark'
      mount(VChart, {
        props: {
          option: mockOption,
          theme
        }
      })

      await nextTick()
      expect(echarts.init).toHaveBeenCalledWith(
        expect.any(HTMLElement),
        theme,
        undefined
      )
    })

    it('initializes with init options', async () => {
      const initOptions = { renderer: 'svg' as const, width: 600, height: 400 }
      mount(VChart, {
        props: {
          option: mockOption,
          initOptions
        }
      })

      await nextTick()
      expect(echarts.init).toHaveBeenCalledWith(
        expect.any(HTMLElement),
        undefined,
        initOptions
      )
    })

    it('sets group on initialization', async () => {
      const group = 'test-group'
      mount(VChart, {
        props: {
          option: mockOption,
          group
        }
      })

      await nextTick()
      const mockInstance = getFirstMockResult(echarts.init)
      expect(mockInstance.group).toBe(group)
    })
  })

  describe('Props Reactivity', () => {
    it('updates chart when option changes', async () => {
      const wrapper = mount(VChart, {
        props: { option: mockOption }
      })

      await nextTick()
      const mockInstance = getFirstMockResult(echarts.init)

      const newOption: EChartsOption = {
        ...mockOption,
        title: { text: 'Updated Chart' }
      }

      await setProps(wrapper, { option: newOption })
      await nextTick()

      expect(mockInstance.setOption).toHaveBeenCalledWith(
        newOption,
        expect.any(Object)
      )
    })

    it('shows loading when loading prop is true', async () => {
      const wrapper = mount(VChart, {
        props: {
          option: mockOption,
          loading: false
        }
      })

      await nextTick()
      const mockInstance = getFirstMockResult(echarts.init)

      await setProps(wrapper, { loading: true })
      await nextTick()

      expect(mockInstance.showLoading).toHaveBeenCalled()
    })

    it('hides loading when loading prop is false', async () => {
      const wrapper = mount(VChart, {
        props: {
          option: mockOption,
          loading: true
        }
      })

      await nextTick()
      const mockInstance = getFirstMockResult(echarts.init)

      await setProps(wrapper, { loading: false })
      await nextTick()

      expect(mockInstance.hideLoading).toHaveBeenCalled()
    })

    it('updates group when group prop changes', async () => {
      const wrapper = mount(VChart, {
        props: {
          option: mockOption,
          group: 'group1'
        }
      })

      await nextTick()
      const mockInstance = getFirstMockResult(echarts.init)

      await setProps(wrapper, { group: 'group2' })
      await nextTick()

      expect(mockInstance.group).toBe('group2')
    })
  })

  describe('Exposed Methods', () => {
    it('exposes getInstance method', async () => {
      const wrapper = mount(VChart, {
        props: { option: mockOption }
      })

      await nextTick()
      const vm = wrapper.vm as unknown as VChartExposed
      expect(vm.getInstance).toBeDefined()
      expect(typeof vm.getInstance).toBe('function')
    })

    it('exposes setOption method', async () => {
      const wrapper = mount(VChart, {
        props: { option: mockOption }
      })

      await nextTick()
      const vm = wrapper.vm as unknown as VChartExposed
      expect(vm.setOption).toBeDefined()

      const newOption: EChartsOption = { title: { text: 'New' } }
      vm.setOption(newOption)

      const mockInstance = getFirstMockResult(echarts.init)
      expect(mockInstance.setOption).toHaveBeenCalledWith(
        newOption,
        expect.any(Object)
      )
    })

    it('exposes resize method', async () => {
      const wrapper = mount(VChart, {
        props: { option: mockOption }
      })

      await nextTick()
      const vm = wrapper.vm as unknown as VChartExposed
      expect(vm.resize).toBeDefined()

      vm.resize()

      const mockInstance = getFirstMockResult(echarts.init)
      expect(mockInstance.resize).toHaveBeenCalled()
    })

    it('exposes showLoading and hideLoading methods', async () => {
      const wrapper = mount(VChart, {
        props: { option: mockOption }
      })

      await nextTick()
      const mockInstance = getFirstMockResult(echarts.init)
      const vm = wrapper.vm as unknown as VChartExposed

      vm.showLoading()
      expect(mockInstance.showLoading).toHaveBeenCalled()

      vm.hideLoading()
      expect(mockInstance.hideLoading).toHaveBeenCalled()
    })

    it('exposes clear method', async () => {
      const wrapper = mount(VChart, {
        props: { option: mockOption }
      })

      await nextTick()
      const mockInstance = getFirstMockResult(echarts.init)
      const vm = wrapper.vm as unknown as VChartExposed

      vm.clear()
      expect(mockInstance.clear).toHaveBeenCalled()
    })

    it('exposes dispatchAction method', async () => {
      const wrapper = mount(VChart, {
        props: { option: mockOption }
      })

      await nextTick()
      const mockInstance = getFirstMockResult(echarts.init)
      const vm = wrapper.vm as unknown as VChartExposed

      const action = { type: 'highlight', seriesIndex: 0 }
      vm.dispatchAction(action)

      expect(mockInstance.dispatchAction).toHaveBeenCalledWith(action)
    })
  })

  describe('Lifecycle', () => {
    it('disposes chart instance on unmount', async () => {
      const wrapper = mount(VChart, {
        props: { option: mockOption }
      })

      await nextTick()
      const mockInstance = getFirstMockResult(echarts.init)

      wrapper.unmount()

      expect(mockInstance.dispose).toHaveBeenCalled()
    })

    it('cleans up resize observer on unmount', async () => {
      const disconnectSpy = vi.fn()
      global.ResizeObserver = class ResizeObserver {
        observe = vi.fn()
        unobserve = vi.fn()
        disconnect = disconnectSpy
      }

      const wrapper = mount(VChart, {
        props: {
          option: mockOption,
          autoresize: true
        }
      })

      await nextTick()
      wrapper.unmount()

      expect(disconnectSpy).toHaveBeenCalled()
    })
  })

  describe('Auto-resize', () => {
    it('sets up ResizeObserver when autoresize is true', async () => {
      const observeSpy = vi.fn()
      global.ResizeObserver = class ResizeObserver {
        observe = observeSpy
        unobserve = vi.fn()
        disconnect = vi.fn()
      }

      mount(VChart, {
        props: {
          option: mockOption,
          autoresize: true
        }
      })

      await nextTick()
      expect(observeSpy).toHaveBeenCalled()
    })

    it('does not set up ResizeObserver when autoresize is false', async () => {
      const observeSpy = vi.fn()
      global.ResizeObserver = class ResizeObserver {
        observe = observeSpy
        unobserve = vi.fn()
        disconnect = vi.fn()
      }

      mount(VChart, {
        props: {
          option: mockOption,
          autoresize: false
        }
      })

      await nextTick()
      expect(observeSpy).not.toHaveBeenCalled()
    })
  })

  describe('Events', () => {
    it('binds ECharts events', async () => {
      mount(VChart, {
        props: { option: mockOption }
      })

      await nextTick()
      const mockInstance = getFirstMockResult(echarts.init)

      // Should bind events
      expect(mockInstance.on).toHaveBeenCalled()
    })

    it('unbinds events on unmount', async () => {
      const wrapper = mount(VChart, {
        props: { option: mockOption }
      })

      await nextTick()
      const mockInstance = getFirstMockResult(echarts.init)

      wrapper.unmount()

      expect(mockInstance.off).toHaveBeenCalled()
    })
  })
})
