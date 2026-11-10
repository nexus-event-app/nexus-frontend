import { describe, expect, it } from 'vitest'
import { excerpt, initialsOf } from './text'

describe('excerpt', () => {
  it('deja igual los textos cortos y une los espacios', () => {
    expect(excerpt('  Hola\n\n mundo  ')).toBe('Hola mundo')
    expect(excerpt(null)).toBe('')
  })

  it('quita los bloques de código', () => {
    expect(excerpt('Mira esto ```const a = 1``` y dime')).toBe('Mira esto y dime')
  })

  it('corta por una palabra completa y añade puntos suspensivos', () => {
    const result = excerpt('Aprender a programar requiere constancia, curiosidad y comunidad', 40)
    expect(result.length).toBeLessThanOrEqual(40)
    expect(result.endsWith('…')).toBe(true)
    expect(result).toBe('Aprender a programar requiere…')
  })
})

describe('initialsOf', () => {
  it('toma la inicial del primer y el último nombre', () => {
    expect(initialsOf('ana garcía lópez')).toBe('AL')
    expect(initialsOf('Marta')).toBe('M')
    expect(initialsOf('   ')).toBe('?')
    expect(initialsOf(undefined)).toBe('?')
  })
})
