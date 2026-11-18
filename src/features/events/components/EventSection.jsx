import { useState } from 'react'
import Button from '@/shared/components/Button'
import Eyebrow from '@/shared/components/Eyebrow'
import ErrorState from '@/shared/components/ErrorState'
import Icon from '@/shared/components/Icon'
import ListSkeleton from '@/shared/components/ListSkeleton'
import { Link } from '@/shared/i18n/router'
import { paths } from '@/shared/config/paths'
import { useRequest } from '@/shared/hooks/useRequest'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'
import { eventsService } from '../services/eventsService'
import EventCard from './EventCard'

const PAGE = 6

/**
 * Un bloque de la agenda («Para todo el mundo» o «Por y para mujeres») con sus próximos eventos. «Ver más» pide más
 * sin vaciar la lista mientras llegan. Sin eventos, invita a compartir uno.
 */
export default function EventSection({ id, forWomen, mode, className }) {
  const { t } = useI18n()
  const [size, setSize] = useState(PAGE)
  const key = forWomen ? 'women' : 'general'
  const request = useRequest(`events:${key}:${mode}:${size}`, ({ signal }) =>
    eventsService.upcoming({ forWomen, mode: mode || undefined, page: 0, size }, { signal }),
  )
  // Al pedir más, se siguen viendo los que ya estaban (se guarda la última lista que llegó).
  const [lastPage, setLastPage] = useState(null)
  if (request.data && request.data !== lastPage) setLastPage(request.data)
  const page = request.data ?? (request.loading && size > PAGE ? lastPage : null)

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
      className={cx('scroll-mt-24', className)}
    >
      <hgroup className="max-w-2xl">
        <Eyebrow>{t(`events.${key}.eyebrow`)}</Eyebrow>
        <h2
          id={`${id}-title`}
          className={cx(
            'mt-3 flex items-center gap-3 text-3xl font-bold tracking-tight sm:text-4xl',
            forWomen ? 'text-pink-800 dark:text-pink-200' : 'text-ink',
          )}
        >
          {forWomen && <Icon name="heart" className="h-7 w-7" />}
          {t(`events.${key}.title`)}
        </h2>
        <p className="mt-3 text-lg leading-relaxed text-ink-muted">{t(`events.${key}.text`)}</p>
      </hgroup>

      {request.error && !page ? (
        <ErrorState className="mt-8" error={request.error} title={t('events.error')} onRetry={request.reload} />
      ) : !page ? (
        <ListSkeleton className="mt-8" />
      ) : page.content.length === 0 ? (
        <p className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 rounded-3xl border-2 border-dashed border-slate-300 p-6 text-ink-muted">
          {t('events.empty')}
          <Link to={paths.eventsNew} className="link font-semibold">
            {t('events.emptyCta')}
          </Link>
        </p>
      ) : (
        <>
          <ul className="mt-8 grid gap-5 md:grid-cols-2">
            {page.content.map((event) => (
              <li key={event.id}>
                <EventCard event={event} onDeleted={removeFromList} />
              </li>
            ))}
          </ul>
          {page.totalElements > page.content.length && (
            <p className="mt-6 text-center">
              <Button
                variant="secondary"
                loading={request.loading}
                onClick={() => setSize((current) => current + PAGE)}
              >
                {t('events.more')}
              </Button>
            </p>
          )}
        </>
      )}
    </section>
  )
}
