import { translate } from '@/shared/i18n/translate'

export const DESCRIPTION_MAX = 280

export const INITIAL_EVENT = {
  url: '',
  title: '',
  date: '',
  time: '',
  mode: 'ONLINE',
  city: '',
  description: '',
  forWomen: false,
}

/** Hoy en el formato de los campos de fecha («2026-11-20»), en la hora de quien usa la web. */
export function todayIso(now = new Date()) {
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
  return local.toISOString().slice(0, 10)
}

/** Las mismas reglas que el servidor, para avisar antes de enviar. */
export function validateEvent(values, today = todayIso()) {
  const errors = {}
  if (!/^https:\/\/[^\s/]+\.[^\s/]+(\/\S*)?$/.test(values.url.trim())) errors.url = translate('events.validation.url')
  const title = values.title.trim().length
  if (title < 5 || title > 120) errors.title = translate('events.validation.title')
  if (!values.date || values.date < today) errors.date = translate('events.validation.date')
  if (values.mode === 'PRESENCIAL' && !values.city.trim()) errors.city = translate('events.validation.city')
  const description = values.description.trim().length
  if (description < 10 || description > DESCRIPTION_MAX) errors.description = translate('events.validation.description')
  return errors
}

export function toEventPayload(values) {
  return {
    url: values.url.trim(),
    title: values.title.trim(),
    date: values.date,
    time: values.time || null,
    mode: values.mode,
    city: values.mode === 'PRESENCIAL' ? values.city.trim() : null,
    description: values.description.trim(),
    forWomen: values.forWomen,
  }
}
