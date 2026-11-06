const LOCALE = 'es-ES'

const dateFormat = new Intl.DateTimeFormat(LOCALE, { day: 'numeric', month: 'long', year: 'numeric' })
const shortDateFormat = new Intl.DateTimeFormat(LOCALE, { day: 'numeric', month: 'short', year: 'numeric' })
const dateTimeFormat = new Intl.DateTimeFormat(LOCALE, {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
})

function toDate(value) {
  if (!value) return null
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

export function formatDate(value) {
  const date = toDate(value)
  return date ? dateFormat.format(date) : ''
}

export function formatShortDate(value) {
  const date = toDate(value)
  return date ? shortDateFormat.format(date) : ''
}

export function formatDateTime(value) {
  const date = toDate(value)
  return date ? dateTimeFormat.format(date) : ''
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
