import { formatDate, formatDateTime, formatMonthYear, formatRelative, formatShortDate } from '@/shared/utils/date'

const FORMATTERS = {
  long: formatDate,
  short: formatShortDate,
  datetime: formatDateTime,
  monthYear: formatMonthYear,
  relative: formatRelative,
}

export default function Time({ value, format = 'long', className }) {
  if (!value) return null

  return (
    // En las fechas relativas («hace 2 días»), la fecha exacta se ve al pasar el ratón.
    <time dateTime={value} title={format === 'relative' ? formatDate(value) : undefined} className={className}>
      {FORMATTERS[format](value)}
    </time>
  )
}
