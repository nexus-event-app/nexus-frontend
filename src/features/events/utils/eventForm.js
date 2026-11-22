import { translate } from '@/shared/i18n/translate'

export const DESCRIPTION_MAX = 2000

export const INITIAL_EVENT = {
  url: '',
  title: '',
  date: '',
  time: '',
  mode: 'ONLINE',
  city: '',
  address: '',
  description: '',
  forWomen: false,
}

export function toEventFormValues(event) {
  return {
    url: event.url ?? '',
    title: event.title ?? '',
    date: event.date ?? '',
    time: event.time ? event.time.slice(0, 5) : '',
    mode: event.mode ?? 'ONLINE',
    city: event.city ?? '',
    address: event.address ?? '',
    description: event.description ?? '',
    forWomen: Boolean(event.forWomen),
  }
}

export function todayIso(now = new Date()) {
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
  return local.toISOString().slice(0, 10)
}

function looksLikeAddress(city) {
  return /[\d,·]/.test(city) || city.trim().length > 40
}

export function validateEvent(values, today = todayIso()) {
  const errors = {}
  if (!/^https:\/\/[^\s/]+\.[^\s/]+(\/\S*)?$/.test(values.url.trim())) errors.url = translate('events.validation.url')
  const title = values.title.trim().length
  if (title < 5 || title > 120) errors.title = translate('events.validation.title')
  if (!values.date || (today && values.date < today)) errors.date = translate('events.validation.date')
  if (values.mode === 'PRESENCIAL') {
    if (!values.city.trim()) errors.city = translate('events.validation.city')
    else if (looksLikeAddress(values.city)) errors.city = translate('events.validation.cityOnly')
  }
  if (values.address.trim().length > 200) errors.address = translate('events.validation.address')
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
    address: values.mode === 'PRESENCIAL' && values.address.trim() ? values.address.trim() : null,
    description: values.description.trim(),
    forWomen: values.forWomen,
  }
}
