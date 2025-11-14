import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { validateOption, validateThrottle, validateAutoresize } from '@/utils/validation'
import * as logger from '@/utils/logger'

// Mock logger
vi.mock('@/utils/logger', () => ({
  warn: vi.fn()
}))

describe('validation', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('validateOption', () => {
    it('returns true for valid option object', () => {
      const validOption = {
        title: { text: 'Test' },
        series: [{ type: 'line', data: [1, 2, 3] }]
      }
      expect(validateOption(validOption)).toBe(true)
      expect(logger.warn).not.toHaveBeenCalled()
    })

    it('returns true for empty object', () => {
      expect(validateOption({})).toBe(true)
      expect(logger.warn).not.toHaveBeenCalled()
    })

    it('returns false for null', () => {
      expect(validateOption(null)).toBe(false)
      expect(logger.warn).toHaveBeenCalledWith('Invalid option: must be a non-null object')
    })

    it('returns false for undefined', () => {
      expect(validateOption(undefined)).toBe(false)
      expect(logger.warn).toHaveBeenCalledWith('Invalid option: must be a non-null object')
    })

    it('returns false for string', () => {
      expect(validateOption('not an object')).toBe(false)
      expect(logger.warn).toHaveBeenCalledWith('Invalid option: must be a non-null object')
    })

    it('returns false for number', () => {
      expect(validateOption(123)).toBe(false)
      expect(logger.warn).toHaveBeenCalledWith('Invalid option: must be a non-null object')
    })

    it('returns false for boolean', () => {
      expect(validateOption(true)).toBe(false)
      expect(logger.warn).toHaveBeenCalledWith('Invalid option: must be a non-null object')
    })

    it('returns true for array (arrays are objects in JavaScript)', () => {
      // In JavaScript, typeof [] === 'object', so arrays pass validation
      expect(validateOption([1, 2, 3])).toBe(true)
      expect(logger.warn).not.toHaveBeenCalled()
    })
  })

  describe('validateThrottle', () => {
    it('returns true for valid positive number', () => {
      expect(validateThrottle(100)).toBe(true)
      expect(logger.warn).not.toHaveBeenCalled()
    })

    it('returns true for zero', () => {
      expect(validateThrottle(0)).toBe(true)
      expect(logger.warn).not.toHaveBeenCalled()
    })

    it('returns true for large valid number', () => {
      expect(validateThrottle(5000)).toBe(true)
      expect(logger.warn).not.toHaveBeenCalled()
    })

    it('warns for very high throttle value but returns true', () => {
      expect(validateThrottle(15000)).toBe(true)
      expect(logger.warn).toHaveBeenCalledWith(
        'Throttle value 15000ms is very high. Consider using a lower value.'
      )
    })

    it('returns false for negative number', () => {
      expect(validateThrottle(-1)).toBe(false)
      expect(logger.warn).toHaveBeenCalledWith(
        'Invalid throttle value: -1. Must be a positive number. Using default (100ms).'
      )
    })

    it('returns true for NaN (typeof NaN is number)', () => {
      // In JavaScript, typeof NaN === 'number' and NaN < 0 is false, so it passes validation
      expect(validateThrottle(NaN)).toBe(true)
      expect(logger.warn).not.toHaveBeenCalled()
    })

    it('returns false for string', () => {
      // @ts-expect-error - Testing invalid input type
      expect(validateThrottle('100')).toBe(false)
      expect(logger.warn).toHaveBeenCalled()
    })
  })

  describe('validateAutoresize', () => {
    it('returns true for boolean true', () => {
      expect(validateAutoresize(true)).toBe(true)
      expect(logger.warn).not.toHaveBeenCalled()
    })

    it('returns true for boolean false', () => {
      expect(validateAutoresize(false)).toBe(true)
      expect(logger.warn).not.toHaveBeenCalled()
    })

    it('returns true for empty object', () => {
      expect(validateAutoresize({})).toBe(true)
      expect(logger.warn).not.toHaveBeenCalled()
    })

    it('returns true for object with valid throttle', () => {
      expect(validateAutoresize({ throttle: 200 })).toBe(true)
      expect(logger.warn).not.toHaveBeenCalled()
    })

    it('returns false for object with invalid throttle', () => {
      expect(validateAutoresize({ throttle: -1 })).toBe(false)
      expect(logger.warn).toHaveBeenCalled()
    })

    it('warns for object with very high throttle but returns true', () => {
      expect(validateAutoresize({ throttle: 15000 })).toBe(true)
      expect(logger.warn).toHaveBeenCalledWith(
        'Throttle value 15000ms is very high. Consider using a lower value.'
      )
    })

    it('returns false for null', () => {
      expect(validateAutoresize(null)).toBe(false)
      expect(logger.warn).toHaveBeenCalledWith(
        'Invalid autoresize config: must be boolean or object with throttle property'
      )
    })

    it('returns false for string', () => {
      expect(validateAutoresize('true')).toBe(false)
      expect(logger.warn).toHaveBeenCalledWith(
        'Invalid autoresize config: must be boolean or object with throttle property'
      )
    })

    it('returns false for number', () => {
      expect(validateAutoresize(100)).toBe(false)
      expect(logger.warn).toHaveBeenCalledWith(
        'Invalid autoresize config: must be boolean or object with throttle property'
      )
    })

    it('returns false for undefined', () => {
      expect(validateAutoresize(undefined)).toBe(false)
      expect(logger.warn).toHaveBeenCalledWith(
        'Invalid autoresize config: must be boolean or object with throttle property'
      )
    })
  })
})
