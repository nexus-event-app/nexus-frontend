import { useId, useState } from 'react'
import { useAuth } from '@/features/auth/hooks/useAuth'
import ReportButton from '@/features/reports/components/ReportButton'
import Button from '@/shared/components/Button'
import ConfirmDialog from '@/shared/components/ConfirmDialog'
import Icon from '@/shared/components/Icon'
import { useAction } from '@/shared/hooks/useAction'
import { useIsClamped } from '@/shared/hooks/useIsClamped'
import { useToast } from '@/shared/hooks/useToast'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'
import { eventsService } from '../services/eventsService'

/**
 * A partir de aquí la descripción seguro que no cabe en tres líneas: «Leer más» sale aunque todavía no se haya
 * podido medir (por ejemplo, mientras carga la tipografía).
 */
const LONG_DESCRIPTION = 140

/** «2026-12-01» como fecha local (sin desfase horario): un evento del día 1 no puede salir el 30. */
function localDate(iso) {
  const [year, month, day] = iso.split('-').map(Number)
  return new Date(year, month - 1, day)
}

/**
 * Un evento, en una tarjeta compacta (caben tres por fila): fecha en un sello de color, título, cuándo y dónde, la
 * descripción recortada a tres líneas y «Apuntarme», que lleva a su web (se ve a qué dominio). Al pasar el ratón se
 * eleva un poco y el sello gira; aparecen escalonadas (`index`). Todo se desactiva con «reducir movimiento».
 * «Voy» (la mano) cuenta cuánta gente va, para que se vea que la agenda se usa; nunca dice quién.
 * No dice quién lo compartió; esa persona puede borrarlo y el resto, reportarlo.
 */
export default function EventCard({ event, index = 0, headingLevel = 'h3', onDeleted }) {
  const { t, locale } = useI18n()
  const Heading = headingLevel
  const { isAuthenticated } = useAuth()
  const toast = useToast()
  const [confirming, setConfirming] = useState(false)
  // Descripción recortada a tres líneas; si no cabe, «Leer más» la abre entera en la propia tarjeta.
  const descriptionId = useId()
  const [expanded, setExpanded] = useState(false)
  const [descriptionRef, clamped] = useIsClamped([event.description, expanded])
  const [going, setGoing] = useState({ count: event.interestedCount ?? 0, interested: Boolean(event.interested) })
  const [toggleGoing, togglingGoing] = useAction(async () => {
    setGoing(await eventsService.toggleInterest(event.id))
  })
  const handleGoing = () => {
    if (!isAuthenticated) {
      toast.info(t('events.card.loginToGo'))
      return
    }
    toggleGoing()
  }
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
        <p className="mt-1 flex min-w-0 flex-wrap gap-1.5">
          <span
            title={online ? undefined : event.city}
            className={cx(
              'inline-flex max-w-full items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold',
              online
                ? 'bg-sky-50 text-sky-800 dark:bg-sky-500/15 dark:text-sky-200'
                : 'bg-amber-50 text-amber-900 dark:bg-amber-500/15 dark:text-amber-200',
            )}
          >
            <Icon name={online ? 'computer' : 'pin'} className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{online ? t('events.card.online') : event.city}</span>
          </span>
          {event.forWomen && (
            <span className="inline-flex items-center gap-1 rounded-full bg-pink-50 px-2.5 py-1 text-xs font-semibold text-pink-800 dark:bg-pink-500/15 dark:text-pink-200">
              <Icon name="heart" className="h-3.5 w-3.5" />
              {t('events.card.women')}
            </span>
          )}
        </p>
      </header>

      {/* En mayúsculas para que destaque (solo visual: los lectores de pantalla lo leen tal cual). */}
      <Heading
        id={`event-${event.id}`}
        className="mt-4 text-base font-bold uppercase leading-snug tracking-wide text-ink"
      >
        {event.title}
      </Heading>
      {/* Cuándo y dónde, lo más importante para ir: en su propio recuadro, con el texto más marcado. */}
      <dl
        className={cx(
          'mt-3 grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-2.5 gap-y-2 rounded-2xl px-3.5 py-3 text-sm',
          event.forWomen ? 'bg-pink-50 dark:bg-pink-500/10' : 'bg-accent-soft/60',
        )}
      >
        <dt className="pt-px">
          <Icon
            name="calendar"
            className={cx('h-4 w-4', event.forWomen ? 'text-pink-700 dark:text-pink-300' : 'text-accent')}
          />
          <span className="sr-only">{t('events.card.whenLabel')}</span>
        </dt>
        <dd className="font-semibold text-ink first-letter:uppercase">{when}</dd>
        {!online && event.address && (
          <>
            <dt className="pt-px">
              <Icon
                name="pin"
                className={cx('h-4 w-4', event.forWomen ? 'text-pink-700 dark:text-pink-300' : 'text-accent')}
              />
              <span className="sr-only">{t('events.card.whereLabel')}</span>
            </dt>
            <dd className="font-medium text-ink-soft">{event.address}</dd>
          </>
        )}
      </dl>
      <p
        id={descriptionId}
        ref={descriptionRef}
        className={cx('mt-3 whitespace-pre-line text-sm leading-relaxed text-ink-soft', !expanded && 'line-clamp-3')}
      >
        {event.description}
      </p>
      {(clamped || expanded || event.description.length > LONG_DESCRIPTION) && (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          aria-controls={descriptionId}
          className="inline-flex min-h-[2.75rem] items-center gap-1 self-start text-sm font-semibold text-accent hover:underline sm:min-h-[2rem]"
        >
          {expanded ? t('common.readLess') : t('common.readMore')}
          <Icon name="chevron-down" className={cx('h-4 w-4 transition-transform', expanded && 'rotate-180')} />
          <span className="sr-only">{t('events.card.descriptionOf', { title: event.title })}</span>
        </button>
      )}
      {/* Adónde lleva «Apuntarme»: los lectores de pantalla ya lo oyen en el propio enlace. */}
      <p aria-hidden="true" className="mt-auto flex items-center gap-1 truncate pt-3 text-xs text-ink-muted">
        <Icon name="link" className="h-3.5 w-3.5 shrink-0" />
        {event.host}
      </p>

      <footer className="mt-3 flex items-center gap-2 border-t border-slate-200 pt-4">
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
        <button
          type="button"
          onClick={handleGoing}
          disabled={togglingGoing}
          aria-pressed={going.interested}
          title={t('events.card.goingHint')}
          className={cx(
            'inline-flex min-h-[2.75rem] shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3 text-sm font-semibold transition-colors disabled:opacity-60 sm:min-h-[2.25rem]',
            going.interested
              ? 'border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-400/40 dark:bg-amber-500/15 dark:text-amber-200'
              : 'border-slate-300 bg-surface text-ink-soft hover:border-accent-line hover:text-ink',
          )}
        >
          {/* La clave reinicia la animación cada vez que se marca. */}
          <Icon
            key={going.interested ? `on-${going.count}` : 'off'}
            name="hand"
            filled={going.interested}
            className={cx('h-4 w-4', going.interested && 'animate-pop')}
          />
          <span aria-hidden="true">{t('events.card.going')}</span>
          {going.count > 0 && (
            <span aria-hidden="true" className="tabular-nums">
              · {going.count}
            </span>
          )}
          {/* Nombre accesible con lo que se ve y el número completo (WCAG 2.5.3). */}
          <span className="sr-only">
            {t('events.card.goingSr', { title: event.title })}. {t('events.card.goingCount', { count: going.count })}
          </span>
        </button>
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
