import type { EChartsOption } from 'echarts'
import { warn } from './logger'

/**
 * Validate ECharts option
 * @param option - The option to validate
 * @returns true if valid, false otherwise
 */
export function validateOption(option: unknown): option is EChartsOption {
  if (!option || typeof option !== 'object') {
    warn('Invalid option: must be a non-null object')
    return false
  }
  return true
}

/**
 * Validate throttle value
 * @param throttle - The throttle value to validate
 * @returns true if valid, false otherwise
 */
export function validateThrottle(throttle: number): boolean {
  if (typeof throttle !== 'number' || throttle < 0) {
    warn(`Invalid throttle value: ${throttle}. Must be a positive number. Using default (100ms).`)
    return false
  }
  if (throttle > 10000) {
    warn(`Throttle value ${throttle}ms is very high. Consider using a lower value.`)
  }
  return true
}

/**
 * Validate autoresize configuration
 * @param autoresize - The autoresize config to validate
 * @returns true if valid, false otherwise
 */
export function validateAutoresize(autoresize: unknown): boolean {
  if (typeof autoresize === 'boolean') {
    return true
  }
  if (typeof autoresize === 'object' && autoresize !== null) {
    const config = autoresize as { throttle?: number }
    if (config.throttle !== undefined) {
      return validateThrottle(config.throttle)
    }
    return true
  }
  warn('Invalid autoresize config: must be boolean or object with throttle property')
  return false
}
