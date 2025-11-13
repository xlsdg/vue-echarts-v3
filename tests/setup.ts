import { vi } from 'vitest'
import { config } from '@vue/test-utils'

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}))

// Mock HTMLCanvasElement.getContext for ECharts
HTMLCanvasElement.prototype.getContext = vi.fn(
  (contextId: string) => {
    if (contextId === '2d') {
      return {
        fillRect: vi.fn(),
        clearRect: vi.fn(),
        getImageData: vi.fn(),
        putImageData: vi.fn(),
        createImageData: vi.fn(),
        setTransform: vi.fn(),
        drawImage: vi.fn(),
        save: vi.fn(),
        restore: vi.fn(),
        beginPath: vi.fn(),
        moveTo: vi.fn(),
        lineTo: vi.fn(),
        closePath: vi.fn(),
        stroke: vi.fn(),
        translate: vi.fn(),
        scale: vi.fn(),
        rotate: vi.fn(),
        arc: vi.fn(),
        arcTo: vi.fn(),
        fill: vi.fn(),
        measureText: vi.fn(() => ({ width: 0 })),
        transform: vi.fn(),
        rect: vi.fn(),
        clip: vi.fn(),
        isPointInPath: vi.fn(),
        isPointInStroke: vi.fn(),
        quadraticCurveTo: vi.fn(),
        bezierCurveTo: vi.fn(),
        fillText: vi.fn(),
        strokeText: vi.fn(),
        createLinearGradient: vi.fn(() => ({
          addColorStop: vi.fn()
        })),
        createRadialGradient: vi.fn(() => ({
          addColorStop: vi.fn()
        })),
        createPattern: vi.fn(),
        canvas: {},
        globalAlpha: 1,
        globalCompositeOperation: 'source-over',
        strokeStyle: '',
        fillStyle: '',
        lineWidth: 1,
        lineCap: 'butt',
        lineJoin: 'miter',
        miterLimit: 10,
        lineDashOffset: 0,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowBlur: 0,
        shadowColor: '',
        font: '',
        textAlign: 'start',
        textBaseline: 'alphabetic',
        direction: 'ltr',
        imageSmoothingEnabled: true
      } as any
    }
    return null
  }
) as any

// Mock HTMLCanvasElement methods
HTMLCanvasElement.prototype.toDataURL = vi.fn(() => '')
HTMLCanvasElement.prototype.toBlob = vi.fn()

// Mock requestAnimationFrame
global.requestAnimationFrame = vi.fn((cb) => {
  cb(0)
  return 0
})

global.cancelAnimationFrame = vi.fn()

// Configure Vue Test Utils
config.global.stubs = {
  transition: false,
  'transition-group': false
}

// Suppress Vue warnings in tests
config.global.config.warnHandler = () => null
config.global.config.errorHandler = () => null
