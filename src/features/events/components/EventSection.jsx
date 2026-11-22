import Illustration from '@/shared/components/Illustration'
import Eyebrow from '@/shared/components/Eyebrow'
import ErrorState from '@/shared/components/ErrorState'
import Icon from '@/shared/components/Icon'
import ListSkeleton from '@/shared/components/ListSkeleton'
import Pagination from '@/shared/components/Pagination'
import { Link } from '@/shared/i18n/router'
import { paths } from '@/shared/config/paths'
import { useRequest } from '@/shared/hooks/useRequest'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'
import { eventsService } from '../services/eventsService'
import EventCard from './EventCard'

const EVENTS_PAGE_SIZE = 6

export default function EventSection({ id, forWomen, filters, page, pageHref, illustration, className }) {
  const { t } = useI18n()
  const key = forWomen ? 'women' : 'general'
  const { mode, city, day } = filters
  const request = useRequest(`events:${key}:${mode}:${city}:${day}:${page}`, ({ signal }) =>
    eventsService.upcoming(
      {
        forWomen,
        mode: mode || undefined,
        city: city || undefined,
        day: day || undefined,
        page: page - 1,
        size: EVENTS_PAGE_SIZE,
      },
      { signal },
    ),
  )
  const data = request.data

  const removeFromList = (removed) =>
    request.mutate((current) => ({
      ...current,
      content: current.content.filter((item) => item.id !== removed.id),
      totalElements: current.totalElements - 1,
    }))

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      aria-busy={request.loading}
      className={cx('relative scroll-mt-24', className)}
    >
      <hgroup className="max-w-2xl">
        <Eyebrow>{t(`events.${key}.eyebrow`)}</Eyebrow>
        <h2
          id={`${id}-title`}
          className={cx(
            'mt-3 flex items-center gap-3 text-3xl font-bold tracking-tight',
            forWomen ? 'text-pink-800 dark:text-pink-200' : 'text-ink',
          )}
        >
          {forWomen && <Icon name="heart" className="h-7 w-7" />}
          {t(`events.${key}.title`)}
        </h2>
        <p className="mt-3 leading-relaxed text-ink-muted">{t(`events.${key}.text`)}</p>
      </hgroup>
      {illustration && (
        <Illustration
          {...illustration}
          className={cx(
            'absolute right-4 hidden w-64 lg:block xl:right-8 xl:w-[19rem]',
            forWomen ? '-top-14' : '-top-24 xl:-top-28',
          )}
        />
      )}

      {request.error ? (
        <ErrorState className="mt-8" error={request.error} title={t('events.error')} onRetry={request.reload} />
      ) : !data ? (
        <ListSkeleton rows={2} className="mt-8" />
      ) : data.content.length === 0 ? (
        <p className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 rounded-3xl border-2 border-dashed border-slate-300 p-6 text-ink-muted">
          {t(filters.active ? 'events.emptyFiltered' : 'events.empty')}
          <Link to={paths.eventsNew} className="link font-semibold">
            {t('events.emptyCta')}
          </Link>
        </p>
      ) : (
        <>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.content.map((event, index) => (
              <li key={event.id}>
                <EventCard event={event} index={index} onDeleted={removeFromList} />
              </li>
            ))}
          </ul>
          <Pagination
            page={page}
            totalPages={data.totalPages}
            buildHref={pageHref}
            label={t('events.pagination', { section: t(`events.${key}.title`) })}
          />
        </>
      )}
    </section>
  )
}
