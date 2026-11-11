import { Navigate } from '@/shared/i18n/router'
import Breadcrumbs from '@/shared/components/Breadcrumbs'
import Button from '@/shared/components/Button'
import ButtonLink from '@/shared/components/ButtonLink'
import EmptyState from '@/shared/components/EmptyState'
import Icon from '@/shared/components/Icon'
import ListSkeleton from '@/shared/components/ListSkeleton'
import PageHeader from '@/shared/components/PageHeader'
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
    <PageMain className="page-container page-section">
      <Seo title={t('notifications.seoTitle')} path={paths.notifications} robots="noindex,nofollow" />
      <Breadcrumbs items={[{ label: t('notifications.title'), to: paths.notifications }]} />
      <PageHeader
        title={t('notifications.title')}
        description={t('notifications.description')}
        actions={
          unread > 0 && (
            <Button variant="secondary" loading={markingAll} onClick={markAllRead}>
              <Icon name="check" className="h-4 w-4" />
              {t('notifications.markAllRead')}
            </Button>
          )
        }
      />

      <section aria-label={t('notifications.title')} aria-busy={request.loading} className="mx-auto max-w-3xl">
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
                <ul className="space-y-3">
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
    </PageMain>
  )
}
