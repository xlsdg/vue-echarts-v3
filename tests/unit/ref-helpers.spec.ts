import { describe, it, expect } from 'vitest'
import { ref } from 'vue'
import { unwrapRef, extractThrottle } from '@/utils/ref-helpers'
import type { AutoresizeConfigWithExtra } from '../types'

describe('ref-helpers', () => {
  describe('unwrapRef', () => {
    it('returns value from ref', () => {
      const refValue = ref('test')
      expect(unwrapRef(refValue)).toBe('test')
    })

    it('returns value directly if not a ref', () => {
      expect(unwrapRef('test')).toBe('test')
    })

    it('handles numeric values', () => {
      const refValue = ref(123)
      expect(unwrapRef(refValue)).toBe(123)
      expect(unwrapRef(456)).toBe(456)
    })

    it('handles boolean values', () => {
      const refValue = ref(true)
      expect(unwrapRef(refValue)).toBe(true)
      expect(unwrapRef(false)).toBe(false)
    })

    it('handles object values', () => {
      const obj = { foo: 'bar' }
      const refValue = ref(obj)
      expect(unwrapRef(refValue)).toStrictEqual(obj)
      expect(unwrapRef(obj)).toBe(obj)
    })

    it('handles array values', () => {
      const arr = [1, 2, 3]
      const refValue = ref(arr)
      expect(unwrapRef(refValue)).toStrictEqual(arr)
      expect(unwrapRef(arr)).toBe(arr)
    })

    it('handles null values', () => {
      const refValue = ref(null)
      expect(unwrapRef(refValue)).toBe(null)
      expect(unwrapRef(null)).toBe(null)
    })

    it('handles undefined values', () => {
      const refValue = ref(undefined)
      expect(unwrapRef(refValue)).toBe(undefined)
      expect(unwrapRef(undefined)).toBe(undefined)
    })
  })

  describe('extractThrottle', () => {
    it('returns default throttle (100) for undefined', () => {
      expect(extractThrottle(undefined)).toBe(100)
    })

    it('returns default throttle (100) for true', () => {
      expect(extractThrottle(true)).toBe(100)
    })

    it('returns default throttle (100) for false', () => {
      expect(extractThrottle(false)).toBe(100)
    })

    it('returns throttle value from object', () => {
      expect(extractThrottle({ throttle: 200 })).toBe(200)
    })

    it('returns default throttle (100) for object without throttle', () => {
      expect(extractThrottle({})).toBe(100)
    })

    it('returns default throttle (100) for null throttle', () => {
      expect(extractThrottle({ throttle: undefined })).toBe(100)
    })

    it('returns zero throttle if specified', () => {
      expect(extractThrottle({ throttle: 0 })).toBe(0)
    })

    it('returns large throttle values', () => {
      expect(extractThrottle({ throttle: 5000 })).toBe(5000)
    })

    it('handles object with other properties', () => {
      const config: AutoresizeConfigWithExtra = { throttle: 300, other: 'prop' }
      expect(extractThrottle(config)).toBe(300)
    })
  })
})
