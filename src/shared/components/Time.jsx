import { formatDate, formatDateTime, formatMonthYear, formatShortDate } from '@/shared/utils/date'

const FORMATTERS = {
  long: formatDate,
  short: formatShortDate,
  datetime: formatDateTime,
  monthYear: formatMonthYear,
}

export default function Time({ value, format = 'long', className }) {
  if (!value) return null

  return (
    <time dateTime={value} className={className}>
      {FORMATTERS[format](value)}
    </time>
  )
}
