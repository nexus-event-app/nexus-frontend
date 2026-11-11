import { afterEach, describe, expect, it } from 'vitest'
import { setCurrentLanguage } from '@/shared/i18n/translate'
import { daysSince, formatDate, formatRelative, fromLocalDateTimeInput, toLocalDateTimeInput } from './date'

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

describe('fechas relativas', () => {
  const now = new Date('2026-11-11T09:00:00')

  it('cuenta días naturales y dice «hoy», «ayer» o «hace N días»', () => {
    expect(daysSince('2026-11-11T00:30:00', now)).toBe(0)
    expect(daysSince('2026-11-10T23:59:00', now)).toBe(1)
    expect(formatRelative('2026-11-11T08:00:00', now)).toBe('hoy')
    expect(formatRelative('2026-11-10T08:00:00', now)).toBe('ayer')
    expect(formatRelative('2026-11-06T08:00:00', now)).toBe('hace 5 días')
  })

  it('a partir de un mes muestra la fecha y se traduce', () => {
    expect(formatRelative('2026-09-01T08:00:00', now)).toBe('1 sept 2026')
    setCurrentLanguage('en')
    expect(formatRelative('2026-11-10T08:00:00', now)).toBe('yesterday')
  })
})
