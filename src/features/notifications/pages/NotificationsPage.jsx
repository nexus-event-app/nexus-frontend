import { Navigate } from '@/shared/i18n/router'
import Breadcrumbs from '@/shared/components/Breadcrumbs'
import Button from '@/shared/components/Button'
import ButtonLink from '@/shared/components/ButtonLink'
import EmptyState from '@/shared/components/EmptyState'
import Illustration from '@/shared/components/Illustration'
import { illustrations } from '@/shared/config/illustrations'
import Eyebrow from '@/shared/components/Eyebrow'
import Icon from '@/shared/components/Icon'
import ListSkeleton from '@/shared/components/ListSkeleton'
import PageMain from '@/shared/components/PageMain'
import Pagination from '@/shared/components/Pagination'
import QueryBoundary from '@/shared/components/QueryBoundary'
import Seo from '@/shared/components/Seo'
import { DEFAULT_PAGE_SIZE } from '@/shared/api/params'
import { paths } from '@/shared/config/paths'
import { useAction } from '@/shared/hooks/useAction'
import { useListQuery } from '@/shared/hooks/useListQuery'
import { useRequest } from '@/shared/hooks/useRequest'
import { useI18n } from '@/shared/i18n/useI18n'
import NotificationItem from '../components/NotificationItem'
import { useNotifications } from '../hooks/useNotifications'
import { notificationService } from '../services/notificationService'

const TYPES = [
  { key: 'Comment', icon: 'chat', tone: 'bg-accent' },
  { key: 'Accepted', icon: 'check', tone: 'bg-emerald-600' },
]

/** Al lado de la lista: qué avisos llegan, que solo los ves tú, y un enlace al foro. */
function HowItWorks({ className }) {
  const { t } = useI18n()
  return (
    <aside aria-labelledby="notifications-how" className={className}>
      <hgroup>
        <Eyebrow>{t('notifications.asideEyebrow')}</Eyebrow>
        <h2 id="notifications-how" className="mt-3 text-2xl font-bold tracking-tight text-ink">
          {t('notifications.asideTitle')}
        </h2>
      </hgroup>
      <ul className="mt-5 space-y-4 rounded-3xl border border-slate-200 bg-surface p-6 shadow-card">
        {TYPES.map((type) => (
          <li key={type.key} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3">
            <span
              aria-hidden="true"
              className={`flex h-8 w-8 items-center justify-center rounded-full text-white ${type.tone}`}
            >
              <Icon name={type.icon} className="h-4 w-4" />
            </span>
            <p className="text-sm leading-relaxed text-ink-soft">
              <strong className="block font-semibold text-ink">{t(`notifications.type${type.key}Title`)}</strong>
              {t(`notifications.type${type.key}Text`)}
            </p>
          </li>
        ))}
        <li className="flex items-center gap-2 border-t border-slate-200 pt-4 text-sm text-ink-muted">
          <Icon name="lock" className="h-4 w-4 shrink-0 text-accent" />
          {t('notifications.privacy')}
        </li>
      </ul>
      <ButtonLink to={paths.forum} variant="secondary" className="mt-5 w-full rounded-full">
        {t('notifications.forumLink')}
        <Icon name="arrow-right" className="h-4 w-4" />
      </ButtonLink>
    </aside>
  )
}

export default function NotificationsPage() {
  const { t } = useI18n()
  const { page, buildHref } = useListQuery()
  const { unread, adjust } = useNotifications()
  const request = useRequest(`notifications:${page}`, ({ signal }) =>
    notificationService.list({ page: page - 1, size: DEFAULT_PAGE_SIZE }, { signal }),
  )

  const [markAllRead, markingAll] = useAction(
    async () => {
      await notificationService.markAllRead()
      request.mutate((result) => ({ ...result, content: result.content.map((item) => ({ ...item, read: true })) }))
      adjust(() => 0)
    },
    { successMessage: t('notifications.allRead') },
  )

  const handleOpen = (notification) => {
    if (notification.read) return
    adjust((count) => count - 1)
    // Se marca en segundo plano: si falla, el aviso seguirá sin leer la próxima vez.
    notificationService.markRead(notification.id).catch(() => {})
  }

  return (
    // Como el resto de páginas: cabecera arriba; a la izquierda, tus avisos; a la derecha, qué te avisamos.
    <PageMain className="page-container page-section relative isolate grid grid-cols-1 content-start gap-x-12 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <span aria-hidden="true" className="bg-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-96" />
      <Seo title={t('notifications.seoTitle')} path={paths.notifications} robots="noindex,nofollow" />
      <Breadcrumbs className="col-span-full" items={[{ label: t('notifications.title'), to: paths.notifications }]} />
      <hgroup className="col-span-full mt-6 max-w-3xl lg:row-start-2">
        <Eyebrow>{t('notifications.eyebrow')}</Eyebrow>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{t('notifications.title')}</h1>
        <p className="mt-3 text-lg text-ink-muted">{t('notifications.description')}</p>
      </hgroup>
      {/* En el hueco de la derecha del título; los márgenes negativos evitan que la cabecera crezca. */}
      <Illustration
        {...illustrations.notifications}
        className="hidden lg:col-start-2 lg:row-start-2 lg:-mb-6 lg:-mt-24 lg:block lg:w-44 lg:self-end lg:justify-self-start xl:-ml-32 xl:-mt-16 xl:w-52"
      />

      <section
        aria-labelledby="notifications-list"
        aria-busy={request.loading}
        className="mt-10 min-w-0 lg:col-start-1 lg:row-start-3"
      >
        <header className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <hgroup>
            <Eyebrow>{t('notifications.listEyebrow')}</Eyebrow>
            <h2 id="notifications-list" className="mt-3 text-2xl font-bold tracking-tight text-ink">
              {t('notifications.listTitle')}
            </h2>
          </hgroup>
          {unread > 0 && (
            <Button variant="secondary" size="sm" className="rounded-full" loading={markingAll} onClick={markAllRead}>
              <Icon name="check" className="h-4 w-4" />
              {t('notifications.markAllRead')}
            </Button>
          )}
        </header>
        <QueryBoundary
          data={request.data}
          error={request.error}
          onRetry={request.reload}
          skeleton={<ListSkeleton rows={4} />}
          errorTitle={t('notifications.error')}
        >
          {(result) => {
            if (result.totalPages > 0 && page > result.totalPages) {
              return <Navigate to={buildHref(result.totalPages)} replace />
            }
            if (result.content.length === 0) {
              return (
                <EmptyState
                  icon="bell"
                  title={t('notifications.emptyTitle')}
                  description={t('notifications.empty')}
                  action={<ButtonLink to={paths.forum}>{t('notifications.browse')}</ButtonLink>}
                />
              )
            }
            return (
              <>
                <p role="status" className="mb-4 text-sm text-ink-muted">
                  {unread > 0 ? t('notifications.unreadCount', { count: unread }) : t('notifications.noneUnread')}
                </p>
                <ul className="divide-y divide-slate-200 overflow-hidden rounded-3xl border border-slate-200 bg-surface shadow-card">
                  {result.content.map((notification) => (
                    <li key={notification.id}>
                      <NotificationItem notification={notification} onOpen={handleOpen} />
                    </li>
                  ))}
                </ul>
                <Pagination page={page} totalPages={result.totalPages} buildHref={buildHref} />
              </>
            )
          }}
        </QueryBoundary>
      </section>
      <HowItWorks className="mt-14 lg:sticky lg:top-24 lg:col-start-2 lg:row-start-3 lg:mt-10 lg:self-start" />
    </PageMain>
  )
}
