import { describe, expect, it } from 'vitest'
import { INITIAL_EVENT, toEventFormValues, toEventPayload, todayIso, validateEvent } from './eventForm'

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

  it('pide solo la ciudad cuando se escribe la dirección en ella', () => {
    const inPerson = { ...valid, mode: 'PRESENCIAL' }
    for (const city of ['Doofinder C. de Cronos, 63 · Madrid', 'Calle Pelai 12', 'x'.repeat(41)]) {
      expect(validateEvent({ ...inPerson, city }, '2026-11-20').city).toMatch(/solo la ciudad/)
    }
    for (const city of ['Madrid', 'San Sebastián de los Reyes', 'Vitoria-Gasteiz']) {
      expect(validateEvent({ ...inPerson, city }, '2026-11-20')).toEqual({})
    }
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

  it('la dirección es opcional y solo va en los presenciales; el panel puede corregir fechas pasadas', () => {
    expect(toEventPayload({ ...valid, mode: 'PRESENCIAL', city: 'Madrid', address: ' Calle Mayor, 1 ' }).address).toBe(
      'Calle Mayor, 1',
    )
    expect(toEventPayload({ ...valid, mode: 'PRESENCIAL', city: 'Madrid', address: '' }).address).toBeNull()
    expect(toEventPayload({ ...valid, address: 'Calle Mayor, 1' }).address).toBeNull()
    expect(validateEvent({ ...valid, date: '2020-01-01' }, null)).toEqual({})
  })

  it('pasa un evento guardado a los valores del formulario', () => {
    expect(
      toEventFormValues({ ...valid, time: '19:00:00', city: null, address: null, mode: 'ONLINE', forWomen: true }),
    ).toMatchObject({ time: '19:00', city: '', address: '', forWomen: true })
  })
})
