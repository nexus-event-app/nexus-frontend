import { describe, expect, it } from 'vitest'
import { readingMinutes } from './readingTime'

describe('readingMinutes', () => {
  it('cuenta las palabras a 200 por minuto, redondeando hacia arriba', () => {
    expect(readingMinutes('palabra '.repeat(200))).toBe(1)
    expect(readingMinutes('palabra '.repeat(201))).toBe(2)
    expect(readingMinutes('palabra '.repeat(1000))).toBe(5)
  })

  it('un texto corto o vacío se lee en un minuto', () => {
    expect(readingMinutes('Hola')).toBe(1)
    expect(readingMinutes('')).toBe(1)
    expect(readingMinutes(null)).toBe(1)
  })
})
