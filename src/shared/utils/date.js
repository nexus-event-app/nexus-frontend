import { LANGUAGE_META } from '@/shared/i18n/languages'
import { getCurrentLanguage } from '@/shared/i18n/translate'

const OPTIONS = {
  long: { day: 'numeric', month: 'long', year: 'numeric' },
  short: { day: 'numeric', month: 'short', year: 'numeric' },
  datetime: { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' },
}

const formatters = new Map()

/** Un formateador por idioma y estilo, creado la primera vez que se necesita. */
function formatter(style) {
  const locale = LANGUAGE_META[getCurrentLanguage()].locale
  const key = `${locale}:${style}`
  if (!formatters.has(key)) formatters.set(key, new Intl.DateTimeFormat(locale, OPTIONS[style]))
  return formatters.get(key)
}

function toDate(value) {
  if (!value) return null
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

export function formatDate(value) {
  const date = toDate(value)
  return date ? formatter('long').format(date) : ''
}

export function formatShortDate(value) {
  const date = toDate(value)
  return date ? formatter('short').format(date) : ''
}

export function formatDateTime(value) {
  const date = toDate(value)
  return date ? formatter('datetime').format(date) : ''
}

export function toLocalDateTimeInput(value) {
  const date = toDate(value)
  if (!date) return ''
  const pad = (number) => String(number).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

export function fromLocalDateTimeInput(value) {
  if (!value) return null
  return value.length === 16 ? `${value}:00` : value
}
