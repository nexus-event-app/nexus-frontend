import { useState } from 'react'
import Icon from '@/shared/components/Icon'
import { useRequest } from '@/shared/hooks/useRequest'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'
import { eventsService } from '../services/eventsService'
import { todayIso } from '../utils/eventForm'

function iso(date) {
  return todayIso(date)
}

function parse(value) {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day)
}

function monthGrid(year, month) {
  const first = new Date(year, month, 1)
  const start = new Date(year, month, 1 - ((first.getDay() + 6) % 7))
  const weeks = []
  for (let week = 0; week < 6; week++) {
    const days = Array.from(
      { length: 7 },
      (_, index) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + week * 7 + index),
    )
    if (week > 3 && days[0].getMonth() !== month) break
    weeks.push(days)
  }
  return weeks
}

export default function EventsCalendar({ selectedDay, onSelectDay, className }) {
  const { t, locale } = useI18n()
  const today = todayIso()
  const initial = parse(selectedDay ?? today)
  const [visible, setVisible] = useState({ year: initial.getFullYear(), month: initial.getMonth() })
  const weeks = monthGrid(visible.year, visible.month)
  const from = iso(weeks[0][0])
  const to = iso(weeks.at(-1)[6])

  const request = useRequest(`events:calendar:${from}:${to}`, ({ signal }) =>
    eventsService.calendar(from, to, { signal }),
  )
  const byDay = new Map((request.data ?? []).map((day) => [day.date, day]))

  const current = parse(today)
  const isCurrentMonth = visible.year === current.getFullYear() && visible.month === current.getMonth()
  const move = (delta) =>
    setVisible(({ year, month }) => {
      const next = new Date(year, month + delta, 1)
      return { year: next.getFullYear(), month: next.getMonth() }
    })

  const monthName = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(
    new Date(visible.year, visible.month, 1),
  )
  const weekdays = weeks[0].map((day) => new Intl.DateTimeFormat(locale, { weekday: 'narrow' }).format(day))
  const weekdayNames = weeks[0].map((day) => new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(day))
  const fullDate = new Intl.DateTimeFormat(locale, { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <section
      aria-labelledby="events-calendar-title"
      aria-busy={request.loading}
      className={cx(
        'overflow-hidden rounded-3xl border border-slate-200 bg-surface shadow-pop animate-rise-in',
        className,
      )}
    >
      <header className="flex items-center justify-between gap-2 bg-gradient-to-br from-brand-600 to-brand-800 px-3 py-1.5 text-white">
        <button
          type="button"
          onClick={() => move(-1)}
          disabled={isCurrentMonth}
          aria-label={t('events.calendar.previous')}
          className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/15 disabled:opacity-40 disabled:hover:bg-transparent"
        >
          <Icon name="chevron-left" className="h-5 w-5" />
        </button>
        <h2
          id="events-calendar-title"
          className="text-center text-base font-bold first-letter:uppercase"
          aria-live="polite"
        >
          {monthName}
        </h2>
        <button
          type="button"
          onClick={() => move(1)}
          aria-label={t('events.calendar.next')}
          className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/15"
        >
          <Icon name="chevron-right" className="h-5 w-5" />
        </button>
      </header>

      <table className="w-full table-fixed border-separate border-spacing-x-1 border-spacing-y-0.5 px-2.5 pt-1.5 text-center">
        <caption className="sr-only">{t('events.calendar.caption', { month: monthName })}</caption>
        <thead>
          <tr>
            {weekdays.map((label, index) => (
              <th key={weekdayNames[index]} scope="col" className="pb-1 text-xs font-semibold uppercase text-ink-muted">
                <abbr title={weekdayNames[index]} className="no-underline">
                  {label}
                </abbr>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week) => (
            <tr key={iso(week[0])}>
              {week.map((date) => {
                const key = iso(date)
                const info = byDay.get(key)
                const outside = date.getMonth() !== visible.month
                const selected = key === selectedDay
                const isToday = key === today
                return (
                  <td key={key} className="p-0">
                    {info ? (
                      <button
                        type="button"
                        onClick={() => onSelectDay(selected ? null : key)}
                        aria-pressed={selected}
                        aria-label={t('events.calendar.dayLabel', { date: fullDate.format(date), count: info.count })}
                        className={cx(
                          'group relative mx-auto flex h-9 w-9 flex-col items-center justify-center rounded-full text-[0.8rem] font-bold transition-all duration-200 hover:scale-110',
                          selected
                            ? 'bg-brand-600 text-white shadow-pop'
                            : info.forWomen
                              ? 'bg-pink-100 text-pink-900 hover:bg-pink-200 dark:bg-pink-500/20 dark:text-pink-100'
                              : 'bg-accent-soft text-accent-strong hover:bg-brand-100 dark:hover:bg-brand-500/25',
                        )}
                      >
                        {date.getDate()}
                        <span
                          aria-hidden="true"
                          className={cx(
                            'absolute bottom-1 h-1 w-1 rounded-full',
                            selected
                              ? 'bg-white'
                              : info.forWomen
                                ? 'bg-pink-600 dark:bg-pink-300'
                                : 'bg-brand-600 dark:bg-brand-300',
                          )}
                        />
                      </button>
                    ) : (
                      <span
                        className={cx(
                          'mx-auto flex h-9 w-9 items-center justify-center rounded-full text-[0.8rem]',
                          key < today || outside ? 'font-normal text-ink-muted' : 'text-ink-soft',
                          isToday && 'font-bold text-ink ring-2 ring-inset ring-accent-line',
                        )}
                      >
                        {date.getDate()}
                      </span>
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <footer className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 border-t border-slate-200 px-4 py-2.5 text-xs text-ink-muted">
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-brand-600 dark:bg-brand-300" />
          {t('events.calendar.legendEvents')}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-pink-600 dark:bg-pink-300" />
          {t('events.calendar.legendWomen')}
        </span>
      </footer>
    </section>
  )
}
