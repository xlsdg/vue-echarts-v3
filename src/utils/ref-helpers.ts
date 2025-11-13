import { type Ref, isRef } from 'vue'

/**
 * Unwrap a value that may or may not be a Ref
 * @param value - The value to unwrap
 * @returns The unwrapped value
 */
export function unwrapRef<T>(value: T | Ref<T>): T {
  return isRef(value) ? value.value : value
}

/**
 * Extract throttle time from autoresize option
 * @param autoresize - The autoresize configuration
 * @returns The throttle time in milliseconds (default: 100)
 */
export function extractThrottle(autoresize: boolean | { throttle?: number } | undefined): number {
  if (typeof autoresize === 'object' && autoresize !== null) {
    return autoresize.throttle ?? 100
  }
  return 100
}
