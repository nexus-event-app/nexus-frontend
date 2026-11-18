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
 * Un evento: fecha bien visible a la izquierda, título, cuándo y dónde, la descripción y «Apuntarme», que lleva a su
 * web (se ve a qué dominio). No dice quién lo compartió; esa persona puede borrarlo y el resto, reportarlo.
 */
export default function EventCard({ event, headingLevel = 'h3', onDeleted }) {
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
  const where = event.mode === 'ONLINE' ? t('events.card.online') : event.city
  const when = [
    new Intl.DateTimeFormat(locale, { weekday: 'long', day: 'numeric', month: 'long' }).format(date),
    event.time?.slice(0, 5),
  ]
    .filter(Boolean)
    .join(' · ')

  return (
    <article
      aria-labelledby={`event-${event.id}`}
      className={cx(
        'grid h-full grid-cols-[auto_minmax(0,1fr)] gap-x-4 rounded-3xl border bg-surface p-5 shadow-card transition-shadow hover:shadow-pop sm:p-6',
        event.forWomen ? 'border-pink-200 dark:border-pink-400/30' : 'border-slate-200',
      )}
    >
      {/* Calendario: día grande y mes abreviado; la fecha completa la leen los lectores de pantalla en «when». */}
      <time
        dateTime={event.date}
        aria-hidden="true"
        className={cx(
          'row-span-4 flex h-16 w-16 flex-col items-center justify-center rounded-2xl text-center',
          event.forWomen
            ? 'bg-pink-50 text-pink-800 dark:bg-pink-500/15 dark:text-pink-200'
            : 'bg-accent-soft text-accent-strong',
        )}
      >
        <span className="text-2xl font-bold leading-none">{date.getDate()}</span>
        <span className="mt-1 text-xs font-semibold uppercase tracking-wide">
          {new Intl.DateTimeFormat(locale, { month: 'short' }).format(date).replace('.', '')}
        </span>
      </time>
      <Heading id={`event-${event.id}`} className="text-lg font-bold leading-snug text-ink">
        {event.title}
      </Heading>
      <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-muted">
        <span className="first-letter:uppercase">{when}</span>
        <span className="inline-flex items-center gap-1">
          <Icon name={event.mode === 'ONLINE' ? 'computer' : 'pin'} className="h-4 w-4" />
          {where}
        </span>
      </p>
      <p className="mt-3 leading-relaxed text-ink-soft">{event.description}</p>
      <footer className="col-span-full mt-4 flex flex-wrap items-center gap-2 border-t border-slate-200 pt-4">
        <a
          href={event.url}
          target="_blank"
          rel="noopener noreferrer nofollow ugc"
          className="btn btn-primary btn-sm rounded-full"
        >
          {t('events.card.join')}
          <Icon name="external" className="h-4 w-4" />
          <span className="sr-only"> {t('events.card.joinSr', { host: event.host })}</span>
        </a>
        <span aria-hidden="true" className="text-sm text-ink-muted">
          {event.host}
        </span>
        <span className="ml-auto">
          {event.mine ? (
            <Button variant="ghost" size="sm" onClick={() => setConfirming(true)}>
              <Icon name="trash" className="h-4 w-4" />
              {t('events.card.delete')}
              <span className="sr-only"> {t('events.card.deleteSr', { title: event.title })}</span>
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
