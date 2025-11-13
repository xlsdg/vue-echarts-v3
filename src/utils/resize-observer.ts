import { type Ref, shallowRef } from 'vue'

/**
 * Configuration for resize observer
 */
export interface ResizeObserverConfig {
  /**
   * Throttle time in milliseconds
   */
  throttle?: number
}

/**
 * Create a throttled resize observer
 * @param target - The element to observe
 * @param onResize - Callback to invoke on resize
 * @param throttle - Throttle time in milliseconds
 * @returns Observer instance and cleanup function
 */
export function createThrottledResizeObserver(
  target: Ref<HTMLElement | undefined>,
  onResize: () => void,
  throttle: number = 100
) {
  const observer = shallowRef<ResizeObserver>()
  let timer: ReturnType<typeof setTimeout> | null = null

  const setup = () => {
    if (!target.value) return

    observer.value = new ResizeObserver(() => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        onResize()
        timer = null
      }, throttle)
    })

    observer.value.observe(target.value)
  }

  const cleanup = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    if (observer.value) {
      observer.value.disconnect()
      observer.value = undefined
    }
  }

  return {
    observer,
    setup,
    cleanup
  }
}
