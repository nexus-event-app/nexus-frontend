import { afterEach, describe, expect, it } from 'vitest'
import { setCurrentLanguage } from '@/shared/i18n/translate'
import { formatDate, fromLocalDateTimeInput, toLocalDateTimeInput } from './date'

afterEach(() => setCurrentLanguage('es'))

describe('formatDate', () => {
  it('formatea en el idioma actual', () => {
    expect(formatDate('2026-03-05T10:00:00')).toBe('5 de marzo de 2026')
    setCurrentLanguage('en')
    expect(formatDate('2026-03-05T10:00:00')).toBe('5 March 2026')
  })

  it('devuelve una cadena vacía si la fecha no es válida', () => {
    expect(formatDate(null)).toBe('')
    expect(formatDate('no es una fecha')).toBe('')
  })
})

describe('campos de fecha y hora', () => {
  it('convierten entre el formato del campo y el de la API', () => {
    expect(toLocalDateTimeInput('2026-03-05T09:07:00')).toBe('2026-03-05T09:07')
    expect(fromLocalDateTimeInput('2026-03-05T09:07')).toBe('2026-03-05T09:07:00')
    expect(fromLocalDateTimeInput('')).toBeNull()
  })
})
