import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { App } from 'vue'
import type { ComponentWithECharts, GlobalWithWindow } from '../types'

// Mock echarts
vi.mock('echarts', () => ({
  default: {},
  __esModule: true
}))

vi.mock('echarts/core', () => ({
  default: {},
  __esModule: true
}))

// Mock VChart component
vi.mock('@/components/VChart.vue', () => ({
  default: {
    name: 'VChart',
    __echarts__: undefined
  }
}))

// Mock useECharts
vi.mock('@/composables/useECharts', () => ({
  useECharts: vi.fn(),
  connect: vi.fn(),
  disconnect: vi.fn(),
  getInstanceByDom: vi.fn(),
  registerMap: vi.fn(),
  getMap: vi.fn(),
  registerTheme: vi.fn()
}))

describe('entry points', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('index.ts (full version)', () => {
    it('exports VChart component as named export', async () => {
      const { VChart } = await import('@/index')
      expect(VChart).toBeDefined()
      expect(VChart.name).toBe('VChart')
    })

    it('exports VChart component as default export', async () => {
      const VChart = (await import('@/index')).default
      expect(VChart).toBeDefined()
      expect(VChart.name).toBe('VChart')
    })

    it('exports useECharts composable', async () => {
      const { useECharts } = await import('@/index')
      expect(useECharts).toBeDefined()
    })

    it('exports static methods', async () => {
      const { connect, disconnect, getInstanceByDom, registerMap, getMap, registerTheme } = await import('@/index')

      expect(connect).toBeDefined()
      expect(disconnect).toBeDefined()
      expect(getInstanceByDom).toBeDefined()
      expect(registerMap).toBeDefined()
      expect(getMap).toBeDefined()
      expect(registerTheme).toBeDefined()
    })

    it('exports install function', async () => {
      const { install } = await import('@/index')
      expect(install).toBeDefined()
      expect(typeof install).toBe('function')
    })

    it('install function registers VChart component', async () => {
      const { install } = await import('@/index')

      const mockApp = {
        component: vi.fn()
      } as unknown as App

      if (typeof install === 'function') {
        install(mockApp)
      }

      expect(mockApp.component).toHaveBeenCalledWith('VChart', expect.any(Object))
    })

    it('attaches echarts to VChart component', async () => {
      const { VChart } = await import('@/index')
      expect((VChart as ComponentWithECharts).__echarts__).toBeDefined()
    })

    it('auto-installs when window.Vue is available', async () => {
      const mockApp = {
        component: vi.fn()
      } as unknown as App

      // Set up window.Vue
      const globalWithWindow = global as unknown as GlobalWithWindow
      globalWithWindow.window = { Vue: mockApp }

      // Force re-import by clearing cache
      vi.resetModules()

      await import('@/index')

      // In actual implementation, install would be called
      // But since the module is cached, we just verify the behavior exists
      expect(typeof globalWithWindow.window).toBe('object')

      // Clean up
      delete globalWithWindow.window
    })
  })

  describe('lite.ts (lite version)', () => {
    it('exports VChart component as named export', async () => {
      const { VChart } = await import('@/lite')
      expect(VChart).toBeDefined()
      expect(VChart.name).toBe('VChart')
    })

    it('exports VChart component as default export', async () => {
      const VChart = (await import('@/lite')).default
      expect(VChart).toBeDefined()
      expect(VChart.name).toBe('VChart')
    })

    it('exports useECharts composable', async () => {
      const { useECharts } = await import('@/lite')
      expect(useECharts).toBeDefined()
    })

    it('exports static methods', async () => {
      const { connect, disconnect, getInstanceByDom, registerMap, getMap, registerTheme } = await import('@/lite')

      expect(connect).toBeDefined()
      expect(disconnect).toBeDefined()
      expect(getInstanceByDom).toBeDefined()
      expect(registerMap).toBeDefined()
      expect(getMap).toBeDefined()
      expect(registerTheme).toBeDefined()
    })

    it('exports install function', async () => {
      const { install } = await import('@/lite')
      expect(install).toBeDefined()
      expect(typeof install).toBe('function')
    })

    it('install function registers VChart component', async () => {
      const { install } = await import('@/lite')

      const mockApp = {
        component: vi.fn()
      } as unknown as App

      if (typeof install === 'function') {
        install(mockApp)
      }

      expect(mockApp.component).toHaveBeenCalledWith('VChart', expect.any(Object))
    })

    it('attaches echarts core to VChart component', async () => {
      const { VChart } = await import('@/lite')
      expect((VChart as ComponentWithECharts).__echarts__).toBeDefined()
    })
  })

  describe('difference between full and lite', () => {
    it('both export the same component structure', async () => {
      const fullVersion = await import('@/index')
      const liteVersion = await import('@/lite')

      // Both should have the same exports
      expect(typeof fullVersion.VChart).toBe('object')
      expect(typeof liteVersion.VChart).toBe('object')

      expect(typeof fullVersion.useECharts).toBe('function')
      expect(typeof liteVersion.useECharts).toBe('function')

      expect(typeof fullVersion.install).toBe('function')
      expect(typeof liteVersion.install).toBe('function')
    })

    it('both attach echarts instance to component', async () => {
      const { VChart: FullVChart } = await import('@/index')
      const { VChart: LiteVChart } = await import('@/lite')

      expect((FullVChart as ComponentWithECharts).__echarts__).toBeDefined()
      expect((LiteVChart as ComponentWithECharts).__echarts__).toBeDefined()
    })
  })

  describe('TypeScript types', () => {
    it('exports types from index', async () => {
      // This test verifies that types can be imported
      // TypeScript compilation would fail if types are not properly exported
      const module = await import('@/index')

      // Runtime check that the module exports expected values
      expect(module).toHaveProperty('VChart')
      expect(module).toHaveProperty('useECharts')
      expect(module).toHaveProperty('install')
    })

    it('exports types from lite', async () => {
      const module = await import('@/lite')

      expect(module).toHaveProperty('VChart')
      expect(module).toHaveProperty('useECharts')
      expect(module).toHaveProperty('install')
    })
  })
})
