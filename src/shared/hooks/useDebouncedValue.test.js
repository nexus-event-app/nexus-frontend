import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useDebouncedValue } from './useDebouncedValue'

beforeEach(() => vi.useFakeTimers())
afterEach(() => vi.useRealTimers())

describe('useDebouncedValue', () => {
  it('solo actualiza el valor cuando se deja de cambiar', () => {
    const { result, rerender } = renderHook(({ value }) => useDebouncedValue(value, 300), {
      initialProps: { value: 'r' },
    })
    rerender({ value: 're' })
    act(() => vi.advanceTimersByTime(200))
    rerender({ value: 'rea' })
    act(() => vi.advanceTimersByTime(200))
    // Han pasado 400 ms, pero nunca 300 seguidos sin cambios.
    expect(result.current).toBe('r')
    act(() => vi.advanceTimersByTime(100))
    expect(result.current).toBe('rea')
  })
})
