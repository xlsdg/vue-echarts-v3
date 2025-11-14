import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { warn, error, info } from '@/utils/logger'

describe('logger', () => {
  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.spyOn(console, 'info').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('warn', () => {
    it('logs warning with prefix', () => {
      warn('test warning')
      expect(console.warn).toHaveBeenCalledWith('[VChart] test warning', '')
    })

    it('logs warning with data', () => {
      const data = { foo: 'bar' }
      warn('test warning', data)
      expect(console.warn).toHaveBeenCalledWith('[VChart] test warning', data)
    })

    it('logs warning with undefined data', () => {
      warn('test warning', undefined)
      expect(console.warn).toHaveBeenCalledWith('[VChart] test warning', '')
    })

    it('logs warning with null data', () => {
      warn('test warning', null)
      expect(console.warn).toHaveBeenCalledWith('[VChart] test warning', null)
    })

    it('logs warning with numeric data', () => {
      warn('test warning', 123)
      expect(console.warn).toHaveBeenCalledWith('[VChart] test warning', 123)
    })

    it('logs warning with string data', () => {
      warn('test warning', 'extra info')
      expect(console.warn).toHaveBeenCalledWith('[VChart] test warning', 'extra info')
    })
  })

  describe('error', () => {
    it('logs error with prefix', () => {
      error('test error')
      expect(console.error).toHaveBeenCalledWith('[VChart] test error', '')
    })

    it('logs error with error object', () => {
      const err = new Error('test error')
      error('test error', err)
      expect(console.error).toHaveBeenCalledWith('[VChart] test error', err)
    })

    it('logs error with undefined error', () => {
      error('test error', undefined)
      expect(console.error).toHaveBeenCalledWith('[VChart] test error', '')
    })

    it('logs error with null error', () => {
      error('test error', null)
      expect(console.error).toHaveBeenCalledWith('[VChart] test error', null)
    })

    it('logs error with string error', () => {
      error('test error', 'error details')
      expect(console.error).toHaveBeenCalledWith('[VChart] test error', 'error details')
    })

    it('logs error with object', () => {
      const errObj = { code: 500, message: 'Internal error' }
      error('test error', errObj)
      expect(console.error).toHaveBeenCalledWith('[VChart] test error', errObj)
    })
  })

  describe('info', () => {
    it('logs info in development mode', () => {
      // In Vitest, import.meta.env.DEV is true by default
      info('test info')
      expect(console.info).toHaveBeenCalledWith('[VChart] test info', '')
    })

    it('logs info with data in development mode', () => {
      const data = { foo: 'bar' }
      info('test info', data)
      expect(console.info).toHaveBeenCalledWith('[VChart] test info', data)
    })

    it('logs info with undefined data in development mode', () => {
      info('test info', undefined)
      expect(console.info).toHaveBeenCalledWith('[VChart] test info', '')
    })

    // Note: Testing production mode behavior is not possible with import.meta.env.DEV
    // as it's a compile-time constant. The production behavior is tested through
    // the build output verification.
  })
})
