import { useId, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useRequireLogin } from '@/features/auth/hooks/useRequireLogin'
import ReportButton from '@/features/reports/components/ReportButton'
import Button from '@/shared/components/Button'
import ConfirmDialog from '@/shared/components/ConfirmDialog'
import Icon from '@/shared/components/Icon'
import { loginPath } from '@/shared/config/paths'
import { useAction } from '@/shared/hooks/useAction'
import { useIsClamped } from '@/shared/hooks/useIsClamped'
import { useToast } from '@/shared/hooks/useToast'
import { Link } from '@/shared/i18n/router'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'
import { eventsService } from '../services/eventsService'

const LONG_DESCRIPTION = 140

function localDate(iso) {
  const [year, month, day] = iso.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export default function EventCard({ event, index = 0, headingLevel = 'h3', compact = false, onDeleted }) {
  const { t, locale } = useI18n()
  const Heading = headingLevel
  const { isAuthenticated } = useAuth()
  const requireLogin = useRequireLogin()
  const toast = useToast()
  const { pathname, search } = useLocation()
  const [confirming, setConfirming] = useState(false)
  const descriptionId = useId()
  const [expanded, setExpanded] = useState(false)
  const [descriptionRef, clamped] = useIsClamped(event.description, expanded)
  const [going, setGoing] = useState({ count: event.interestedCount ?? 0, interested: Boolean(event.interested) })
  const [toggleGoing, togglingGoing] = useAction(async () => {
    const updated = await eventsService.toggleInterest(event.id)
    setGoing(updated)
    toast.success(t(updated.interested ? 'events.card.goingAdded' : 'events.card.goingRemoved'))
  })
  const handleGoing = () => {
    if (requireLogin(t('events.card.loginToGo'))) return
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

  const joinClasses = cx(
    'btn btn-sm rounded-full text-white transition-all hover:-translate-y-0.5 active:translate-y-[3px] active:shadow-none',
    event.forWomen
      ? 'bg-pink-700 shadow-[0_4px_0_#831843,0_10px_18px_-8px_rgba(131,24,67,0.6)] hover:bg-pink-800'
      : 'btn-primary shadow-[0_4px_0_#312e81,0_10px_18px_-8px_rgba(49,46,129,0.6)]',
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
        'group flex h-full flex-col rounded-3xl border bg-surface p-5 transition-shadow duration-300 animate-rise-in [perspective:700px]',
        'shadow-[0_2px_0_rgba(15,23,42,0.05),0_4px_0_rgba(15,23,42,0.04),0_18px_30px_-18px_rgba(46,36,119,0.45)] hover:shadow-[0_2px_0_rgba(15,23,42,0.06),0_6px_0_rgba(15,23,42,0.05),0_30px_45px_-20px_rgba(46,36,119,0.6)]',
        'dark:shadow-[0_2px_0_rgba(0,0,0,0.35),0_4px_0_rgba(0,0,0,0.3),0_18px_30px_-18px_rgba(0,0,0,0.8)]',
        event.forWomen
          ? 'border-pink-200 hover:border-pink-300 dark:border-pink-400/30'
          : 'border-slate-200 hover:border-accent-line',
      )}
    >
      <header className="flex items-start gap-3">
        <time
          dateTime={event.date}
          aria-hidden="true"
          className={cx(
            'relative flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl text-white transition-transform duration-500 [transform:rotateX(10deg)_rotateY(-14deg)] group-hover:[transform:rotateX(18deg)_rotateY(-24deg)_translateY(-4px)_scale(1.06)]',
            "before:absolute before:-top-1 before:left-3 before:h-2.5 before:w-1.5 before:rounded-full before:bg-white before:shadow before:content-[''] after:absolute after:-top-1 after:right-3 after:h-2.5 after:w-1.5 after:rounded-full after:bg-white after:shadow after:content-['']",
            event.forWomen
              ? 'bg-gradient-to-br from-pink-400 to-pink-700 shadow-[0_3px_0_#9d174d,0_6px_0_#831843,0_16px_22px_-8px_rgba(131,24,67,0.65),inset_0_2px_0_rgba(255,255,255,0.35)]'
              : 'bg-gradient-to-br from-brand-400 to-brand-700 shadow-[0_3px_0_#3730a3,0_6px_0_#312e81,0_16px_22px_-8px_rgba(49,46,129,0.65),inset_0_2px_0_rgba(255,255,255,0.35)]',
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

      <Heading
        id={`event-${event.id}`}
        className="mt-4 text-base font-bold uppercase leading-snug tracking-wide text-ink"
      >
        {event.title}
      </Heading>
      <dl
        className={cx(
          'mt-3 grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-2.5 gap-y-2 rounded-2xl px-3.5 py-3 text-sm shadow-[inset_0_2px_6px_rgba(46,36,119,0.12)] dark:shadow-[inset_0_2px_6px_rgba(0,0,0,0.45)]',
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
      {!compact && (
        <>
          <p
            id={descriptionId}
            ref={descriptionRef}
            className={cx(
              'mt-3 whitespace-pre-line text-sm leading-relaxed text-ink-soft',
              !expanded && 'line-clamp-3',
            )}
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
        </>
      )}
      <p aria-hidden="true" className="mt-auto flex items-center gap-1 truncate pt-3 text-xs text-ink-muted">
        <Icon name="link" className="h-3.5 w-3.5 shrink-0" />
        {event.host}
      </p>

      <footer className="mt-3 flex flex-wrap items-center gap-2 border-t border-slate-200 pt-4">
        {isAuthenticated ? (
          <a href={event.url} target="_blank" rel="noopener noreferrer nofollow ugc" className={joinClasses}>
            {t('events.card.join')}
            <Icon name="external" className="h-4 w-4" />
            <span className="sr-only"> {t('events.card.joinSr', { host: event.host })}</span>
          </a>
        ) : (
          <Link
            to={loginPath(`${pathname}${search}`)}
            onClick={() => toast.info(t('events.card.loginToJoin'))}
            className={joinClasses}
          >
            {t('events.card.join')}
            <Icon name="lock" className="h-4 w-4" />
            <span className="sr-only"> {t('events.card.joinSignIn')}</span>
          </Link>
        )}
        <button
          type="button"
          onClick={handleGoing}
          disabled={togglingGoing}
          aria-pressed={going.interested}
          title={t('events.card.goingHint')}
          className={cx(
            'inline-flex min-h-[2.75rem] shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3 text-sm font-semibold transition-all hover:-translate-y-0.5 active:translate-y-[3px] active:shadow-none disabled:opacity-60 sm:min-h-[2.25rem]',
            going.interested
              ? 'border-amber-300 bg-amber-50 text-amber-900 shadow-[0_3px_0_#fcd34d] dark:border-amber-400/40 dark:bg-amber-500/15 dark:text-amber-200 dark:shadow-[0_3px_0_rgba(251,191,36,0.35)]'
              : 'border-slate-300 bg-surface text-ink-soft shadow-[0_3px_0_theme(colors.slate.300)] hover:border-accent-line hover:text-ink',
          )}
        >
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
