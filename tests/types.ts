/**
 * Type definitions for tests
 * This file provides type-safe alternatives to `as any` in test files
 */

import type { Mock } from 'vitest'
import type * as echarts from 'echarts'

/**
 * Mock CanvasRenderingContext2D for tests
 * Includes mock methods and property values for ECharts
 */
export type MockCanvasRenderingContext2D = {
  // Mock methods
  fillRect: Mock
  clearRect: Mock
  getImageData: Mock
  putImageData: Mock
  createImageData: Mock
  setTransform: Mock
  drawImage: Mock
  save: Mock
  restore: Mock
  beginPath: Mock
  moveTo: Mock
  lineTo: Mock
  closePath: Mock
  stroke: Mock
  translate: Mock
  scale: Mock
  rotate: Mock
  arc: Mock
  arcTo: Mock
  fill: Mock
  measureText: Mock
  transform: Mock
  rect: Mock
  clip: Mock
  isPointInPath: Mock
  isPointInStroke: Mock
  quadraticCurveTo: Mock
  bezierCurveTo: Mock
  fillText: Mock
  strokeText: Mock
  createLinearGradient: Mock
  createRadialGradient: Mock
  createPattern: Mock
  // Properties (not mocks)
  canvas: any
  globalAlpha: number
  globalCompositeOperation: string
  strokeStyle: string | CanvasGradient | CanvasPattern
  fillStyle: string | CanvasGradient | CanvasPattern
  lineWidth: number
  lineCap: CanvasLineCap
  lineJoin: CanvasLineJoin
  miterLimit: number
  lineDashOffset: number
  shadowOffsetX: number
  shadowOffsetY: number
  shadowBlur: number
  shadowColor: string
  font: string
  textAlign: CanvasTextAlign
  textBaseline: CanvasTextBaseline
  direction: CanvasDirection
  imageSmoothingEnabled: boolean
}

/**
 * Type for HTMLCanvasElement.getContext mock
 */
export type MockGetContext = Mock<
  (
    contextId: string,
    options?: CanvasRenderingContext2DSettings
  ) => MockCanvasRenderingContext2D | null
>

/**
 * Get the first mock result from a vitest mock
 * Accepts any mock function to avoid type compatibility issues
 */
export function getFirstMockResult<T = any>(mockFn: any): T {
  return mockFn.mock.results[0]?.value
}

/**
 * Type for components with internal __echarts__ property
 */
export interface ComponentWithECharts {
  __echarts__?: typeof echarts
}

/**
 * Type for global window with Vue property
 */
export interface GlobalWithWindow {
  window?: {
    Vue?: any
  }
}

/**
 * Type assertion helper for testing invalid inputs
 * Use this instead of `as any` when you want to test type validation
 * @example
 * validateThrottle(invalidInput<number>('100'))
 */
export function invalidInput<T>(value: unknown): T {
  return value as T
}

/**
 * Type for autoresize config with additional properties (for testing)
 */
export type AutoresizeConfigWithExtra = {
  throttle?: number
  [key: string]: unknown
}

/**
 * Simplified GeoJSON type for testing
 * Based on the GeoJSON specification but simplified for test purposes
 */
export interface TestGeoJSON {
  type:
    | 'FeatureCollection'
    | 'Feature'
    | 'Point'
    | 'LineString'
    | 'Polygon'
    | 'MultiPoint'
    | 'MultiLineString'
    | 'MultiPolygon'
    | 'GeometryCollection'
  features?: unknown[]
  geometry?: unknown
  properties?: unknown
  coordinates?: unknown
  geometries?: unknown[]
}

/**
 * Type-safe wrapper for Vue Test Utils setProps
 * Resolves TypeScript issues with SFC prop inference
 * @param wrapper - Component wrapper from mount()
 * @param props - Props to update
 * @example
 * await setProps(wrapper, { option: newOption })
 */
export async function setProps<T extends Record<string, any>>(
  wrapper: { setProps: (props: any) => Promise<void> },
  props: T
): Promise<void> {
  await wrapper.setProps(props)
}
