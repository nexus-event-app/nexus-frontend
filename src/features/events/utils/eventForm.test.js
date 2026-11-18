import { describe, expect, it } from 'vitest'
import { INITIAL_EVENT, toEventPayload, todayIso, validateEvent } from './eventForm'

const valid = {
  ...INITIAL_EVENT,
  url: 'https://www.meetup.com/react-valencia/events/1/',
  title: 'Meetup de React',
  date: '2026-12-01',
  description: 'Charlas cortas para empezar con React.',
}

describe('eventForm', () => {
  it('acepta un evento online completo', () => {
    expect(validateEvent(valid, '2026-11-20')).toEqual({})
  })

  it('pide enlace https, título, fecha de hoy en adelante, descripción y ciudad si es presencial', () => {
    const errors = validateEvent(
      {
        ...valid,
        url: 'http://inseguro.com',
        title: 'abc',
        date: '2026-11-19',
        description: 'corta',
        mode: 'PRESENCIAL',
      },
      '2026-11-20',
    )
    expect(Object.keys(errors).sort()).toEqual(['city', 'date', 'description', 'title', 'url'])
    expect(validateEvent({ ...valid, url: 'javascript:alert(1)' }, '2026-11-20').url).toBeDefined()
  })

  it('no envía la ciudad de un evento online ni una hora vacía', () => {
    expect(toEventPayload({ ...valid, city: 'Madrid', time: '' })).toMatchObject({
      city: null,
      time: null,
      mode: 'ONLINE',
    })
    expect(toEventPayload({ ...valid, mode: 'PRESENCIAL', city: ' Bilbao ' }).city).toBe('Bilbao')
  })

  it('da la fecha de hoy en formato de campo', () => {
    expect(todayIso(new Date(2026, 10, 20, 23, 30))).toBe('2026-11-20')
  })
})
