/**
 * Logger utility for VChart
 * Provides consistent logging across the library
 */

const PREFIX = '[VChart]'

/**
 * Log a warning message
 * @param message - The warning message
 * @param data - Optional data to log
 */
export function warn(message: string, data?: unknown): void {
  console.warn(`${PREFIX} ${message}`, data !== undefined ? data : '')
}

/**
 * Log an error message
 * @param message - The error message
 * @param error - Optional error object
 */
export function error(message: string, error?: unknown): void {
  console.error(`${PREFIX} ${message}`, error !== undefined ? error : '')
}

/**
 * Log an info message (development only)
 * @param message - The info message
 * @param data - Optional data to log
 */
export function info(message: string, data?: unknown): void {
  if (process.env['NODE_ENV'] === 'development') {
    console.info(`${PREFIX} ${message}`, data !== undefined ? data : '')
  }
}
