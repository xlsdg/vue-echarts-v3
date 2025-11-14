import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ref } from 'vue'
import { createThrottledResizeObserver } from '@/utils/resize-observer'

describe('resize-observer', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  describe('createThrottledResizeObserver', () => {
    it('creates observer with setup and cleanup functions', () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const onResize = vi.fn()

      const result = createThrottledResizeObserver(target, onResize)

      expect(result).toHaveProperty('observer')
      expect(result).toHaveProperty('setup')
      expect(result).toHaveProperty('cleanup')
      expect(typeof result.setup).toBe('function')
      expect(typeof result.cleanup).toBe('function')
    })

    it('sets up ResizeObserver when target is available', () => {
      const observeSpy = vi.fn()
      global.ResizeObserver = class ResizeObserver {
        observe = observeSpy
        unobserve = vi.fn()
        disconnect = vi.fn()
        constructor(public callback: ResizeObserverCallback) {}
      }

      const target = ref<HTMLElement>(document.createElement('div'))
      const onResize = vi.fn()

      const { setup } = createThrottledResizeObserver(target, onResize)
      setup()

      expect(observeSpy).toHaveBeenCalledWith(target.value)
    })

    it('does not set up observer when target is undefined', () => {
      const observeSpy = vi.fn()
      global.ResizeObserver = class ResizeObserver {
        observe = observeSpy
        unobserve = vi.fn()
        disconnect = vi.fn()
        constructor(public callback: ResizeObserverCallback) {}
      }

      const target = ref<HTMLElement | undefined>(undefined)
      const onResize = vi.fn()

      const { setup } = createThrottledResizeObserver(target, onResize)
      setup()

      expect(observeSpy).not.toHaveBeenCalled()
    })

    it('throttles resize callback with default throttle (100ms)', () => {
      let observerCallback: ResizeObserverCallback | null = null

      global.ResizeObserver = class ResizeObserver {
        observe = vi.fn()
        unobserve = vi.fn()
        disconnect = vi.fn()
        constructor(callback: ResizeObserverCallback) {
          observerCallback = callback
        }
      }

      const target = ref<HTMLElement>(document.createElement('div'))
      const onResize = vi.fn()

      const { setup } = createThrottledResizeObserver(target, onResize)
      setup()

      // Trigger resize
      if (observerCallback) {
        const callback: ResizeObserverCallback = observerCallback
        callback([] as ResizeObserverEntry[], {} as ResizeObserver)
      }

      // Should not call immediately
      expect(onResize).not.toHaveBeenCalled()

      // After throttle time
      vi.advanceTimersByTime(100)
      expect(onResize).toHaveBeenCalledTimes(1)
    })

    it('throttles resize callback with custom throttle', () => {
      let observerCallback: ResizeObserverCallback | null = null

      global.ResizeObserver = class ResizeObserver {
        observe = vi.fn()
        unobserve = vi.fn()
        disconnect = vi.fn()
        constructor(callback: ResizeObserverCallback) {
          observerCallback = callback
        }
      }

      const target = ref<HTMLElement>(document.createElement('div'))
      const onResize = vi.fn()

      const { setup } = createThrottledResizeObserver(target, onResize, 200)
      setup()

      // Trigger resize
      if (observerCallback) {
        const callback: ResizeObserverCallback = observerCallback
        callback([] as ResizeObserverEntry[], {} as ResizeObserver)
      }

      // Should not call before throttle time
      vi.advanceTimersByTime(100)
      expect(onResize).not.toHaveBeenCalled()

      // After throttle time
      vi.advanceTimersByTime(100)
      expect(onResize).toHaveBeenCalledTimes(1)
    })

    it('throttles multiple resize events', () => {
      let observerCallback: ResizeObserverCallback | null = null

      global.ResizeObserver = class ResizeObserver {
        observe = vi.fn()
        unobserve = vi.fn()
        disconnect = vi.fn()
        constructor(callback: ResizeObserverCallback) {
          observerCallback = callback
        }
      }

      const target = ref<HTMLElement>(document.createElement('div'))
      const onResize = vi.fn()

      const { setup } = createThrottledResizeObserver(target, onResize, 100)
      setup()

      // Trigger multiple resize events
      if (observerCallback) {
        const callback: ResizeObserverCallback = observerCallback
        callback([] as ResizeObserverEntry[], {} as ResizeObserver)
        vi.advanceTimersByTime(50)
        callback([] as ResizeObserverEntry[], {} as ResizeObserver)
        vi.advanceTimersByTime(50)
        callback([] as ResizeObserverEntry[], {} as ResizeObserver)
      }

      // Should not call yet
      expect(onResize).not.toHaveBeenCalled()

      // After full throttle time from last event
      vi.advanceTimersByTime(100)
      expect(onResize).toHaveBeenCalledTimes(1)
    })

    it('cleans up observer and clears timer', () => {
      const disconnectSpy = vi.fn()
      let observerCallback: ResizeObserverCallback | null = null

      global.ResizeObserver = class ResizeObserver {
        observe = vi.fn()
        unobserve = vi.fn()
        disconnect = disconnectSpy
        constructor(callback: ResizeObserverCallback) {
          observerCallback = callback
        }
      }

      const target = ref<HTMLElement>(document.createElement('div'))
      const onResize = vi.fn()

      const { setup, cleanup } = createThrottledResizeObserver(target, onResize, 100)
      setup()

      // Trigger resize
      if (observerCallback) {
        const callback: ResizeObserverCallback = observerCallback
        callback([] as ResizeObserverEntry[], {} as ResizeObserver)
      }

      // Cleanup before throttle completes
      cleanup()

      expect(disconnectSpy).toHaveBeenCalled()

      // Advance time - callback should not be called
      vi.advanceTimersByTime(100)
      expect(onResize).not.toHaveBeenCalled()
    })

    it('handles cleanup when observer is not set up', () => {
      const target = ref<HTMLElement>(document.createElement('div'))
      const onResize = vi.fn()

      const { cleanup } = createThrottledResizeObserver(target, onResize)

      // Should not throw
      expect(() => cleanup()).not.toThrow()
    })

    it('handles cleanup when no pending timer', () => {
      const disconnectSpy = vi.fn()

      global.ResizeObserver = class ResizeObserver {
        observe = vi.fn()
        unobserve = vi.fn()
        disconnect = disconnectSpy
        constructor(public callback: ResizeObserverCallback) {}
      }

      const target = ref<HTMLElement>(document.createElement('div'))
      const onResize = vi.fn()

      const { setup, cleanup } = createThrottledResizeObserver(target, onResize)
      setup()

      // Cleanup without triggering resize
      cleanup()

      expect(disconnectSpy).toHaveBeenCalled()
    })

    it('can setup after cleanup', () => {
      const observeSpy = vi.fn()
      const disconnectSpy = vi.fn()

      global.ResizeObserver = class ResizeObserver {
        observe = observeSpy
        unobserve = vi.fn()
        disconnect = disconnectSpy
        constructor(public callback: ResizeObserverCallback) {}
      }

      const target = ref<HTMLElement>(document.createElement('div'))
      const onResize = vi.fn()

      const { setup, cleanup } = createThrottledResizeObserver(target, onResize)

      setup()
      expect(observeSpy).toHaveBeenCalledTimes(1)

      cleanup()
      expect(disconnectSpy).toHaveBeenCalledTimes(1)

      setup()
      expect(observeSpy).toHaveBeenCalledTimes(2)
    })
  })
})
