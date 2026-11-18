import { useState } from 'react'
import ReportButton from '@/features/reports/components/ReportButton'
import Button from '@/shared/components/Button'
import ConfirmDialog from '@/shared/components/ConfirmDialog'
import Icon from '@/shared/components/Icon'
import { useAction } from '@/shared/hooks/useAction'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'
import { eventsService } from '../services/eventsService'

/** «2026-12-01» como fecha local (sin desfase horario): un evento del día 1 no puede salir el 30. */
function localDate(iso) {
  const [year, month, day] = iso.split('-').map(Number)
  return new Date(year, month - 1, day)
}

/**
 * Un evento, en una tarjeta compacta (caben tres por fila): fecha en un sello de color, título, cuándo y dónde, la
 * descripción recortada a tres líneas y «Apuntarme», que lleva a su web (se ve a qué dominio). Al pasar el ratón se
 * eleva un poco y el sello gira; aparecen escalonadas (`index`). Todo se desactiva con «reducir movimiento».
 * No dice quién lo compartió; esa persona puede borrarlo y el resto, reportarlo.
 */
export default function EventCard({ event, index = 0, headingLevel = 'h3', onDeleted }) {
  const { t, locale } = useI18n()
  const Heading = headingLevel
  const [confirming, setConfirming] = useState(false)
  const [remove, removing] = useAction(
    async () => {
      await eventsService.remove(event.id)
      setConfirming(false)
      onDeleted?.(event)
    },
    { successMessage: t('events.card.deleted') },
  )

  const date = localDate(event.date)
  const online = event.mode === 'ONLINE'
  const when = [
    new Intl.DateTimeFormat(locale, { weekday: 'long', day: 'numeric', month: 'long' }).format(date),
    event.time?.slice(0, 5),
  ]
    .filter(Boolean)
    .join(' · ')

  return (
    <article
      aria-labelledby={`event-${event.id}`}
      style={{ animationDelay: `${Math.min(index, 5) * 70}ms` }}
      className={cx(
        'group flex h-full flex-col rounded-3xl border bg-surface p-5 shadow-card transition-all duration-300 animate-rise-in hover:-translate-y-1 hover:shadow-pop',
        event.forWomen
          ? 'border-pink-200 hover:border-pink-300 dark:border-pink-400/30'
          : 'border-slate-200 hover:border-accent-line',
      )}
    >
      <header className="flex items-start gap-3">
        {/* Sello de calendario: la fecha completa la leen los lectores de pantalla en «when». */}
        <time
          dateTime={event.date}
          aria-hidden="true"
          className={cx(
            'flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl text-white shadow-card transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105',
            event.forWomen
              ? 'bg-gradient-to-br from-pink-500 to-pink-700'
              : 'bg-gradient-to-br from-brand-500 to-brand-700',
          )}
        >
          <span className="text-xl font-bold leading-none">{date.getDate()}</span>
          <span className="mt-0.5 text-[0.7rem] font-semibold uppercase tracking-wide">
            {new Intl.DateTimeFormat(locale, { month: 'short' }).format(date).replace('.', '')}
          </span>
        </time>
        <p className="mt-1 flex flex-wrap gap-1.5">
          <span
            className={cx(
              'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold',
              online
                ? 'bg-sky-50 text-sky-800 dark:bg-sky-500/15 dark:text-sky-200'
                : 'bg-amber-50 text-amber-900 dark:bg-amber-500/15 dark:text-amber-200',
            )}
          >
            <Icon name={online ? 'computer' : 'pin'} className="h-3.5 w-3.5" />
            {online ? t('events.card.online') : event.city}
          </span>
          {event.forWomen && (
            <span className="inline-flex items-center gap-1 rounded-full bg-pink-50 px-2.5 py-1 text-xs font-semibold text-pink-800 dark:bg-pink-500/15 dark:text-pink-200">
              <Icon name="heart" className="h-3.5 w-3.5" />
              {t('events.card.women')}
            </span>
          )}
        </p>
      </header>

      <Heading id={`event-${event.id}`} className="mt-4 line-clamp-2 text-base font-bold leading-snug text-ink">
        {event.title}
      </Heading>
      <p className="mt-1 text-sm text-ink-muted first-letter:uppercase">{when}</p>
      {!online && event.address && (
        <p className="mt-1 flex items-start gap-1 text-sm text-ink-muted">
          <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0" />
          <span className="line-clamp-1" title={event.address}>
            {event.address}
          </span>
        </p>
      )}
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-soft" title={event.description}>
        {event.description}
      </p>

      <footer className="mt-auto flex items-center gap-2 border-t border-slate-200 pt-4">
        <a
          href={event.url}
          target="_blank"
          rel="noopener noreferrer nofollow ugc"
          className={cx(
            'btn btn-sm rounded-full text-white shadow-card transition-transform hover:scale-105',
            event.forWomen ? 'bg-pink-700 hover:bg-pink-800' : 'btn-primary',
          )}
        >
          {t('events.card.join')}
          <Icon name="external" className="h-4 w-4" />
          <span className="sr-only"> {t('events.card.joinSr', { host: event.host })}</span>
        </a>
        <span aria-hidden="true" className="min-w-0 truncate text-xs text-ink-muted">
          {event.host}
        </span>
        <span className="ml-auto shrink-0">
          {event.mine ? (
            <Button variant="ghost" size="sm" title={t('events.card.delete')} onClick={() => setConfirming(true)}>
              <Icon name="trash" className="h-4 w-4" />
              <span className="sr-only">
                {t('events.card.delete')} {t('events.card.deleteSr', { title: event.title })}
              </span>
            </Button>
          ) : (
            <ReportButton
              targetType="EVENT"
              targetId={event.id}
              compact
              srLabel={t('events.card.reportSr', { title: event.title })}
            />
          )}
        </span>
      </footer>
      {confirming && (
        <ConfirmDialog
          title={t('events.card.deleteTitle')}
          message={t('events.card.deleteText', { title: event.title })}
          confirmLabel={t('events.card.delete')}
          pending={removing}
          onConfirm={() => remove()}
          onCancel={() => setConfirming(false)}
        />
      )}
    </article>
  )
}
