import { Navigate } from '@/shared/i18n/router'
import Breadcrumbs from '@/shared/components/Breadcrumbs'
import ButtonLink from '@/shared/components/ButtonLink'
import CardGridSkeleton from '@/shared/components/CardGridSkeleton'
import EmptyState from '@/shared/components/EmptyState'
import Icon from '@/shared/components/Icon'
import PageHeader from '@/shared/components/PageHeader'
import PageMain from '@/shared/components/PageMain'
import Pagination from '@/shared/components/Pagination'
import QueryBoundary from '@/shared/components/QueryBoundary'
import Seo from '@/shared/components/Seo'
import Time from '@/shared/components/Time'
import { DEFAULT_PAGE_SIZE } from '@/shared/api/params'
import { paths } from '@/shared/config/paths'
import { useListQuery } from '@/shared/hooks/useListQuery'
import { useRequest } from '@/shared/hooks/useRequest'
import { useI18n } from '@/shared/i18n/useI18n'
import JobCard from '../components/JobCard'
import SaveJobButton from '../components/SaveJobButton'
import { useSavedJobs } from '../hooks/useSavedJobs'
import { savedJobsService } from '../services/savedJobsService'

/** Oferta guardada que ya no está publicada: se muestra para que el usuario pueda quitarla. */
function UnavailableJob({ job }) {
  const { t } = useI18n()
  return (
    <article className="card flex h-full flex-col p-5">
      <p className="flex items-center gap-2 text-sm font-semibold text-ink-muted">
        <Icon name="info" className="h-4 w-4" />
        {t('jobs.saved.unavailable')}
      </p>
      <h2 className="mt-3 text-lg font-bold leading-snug text-ink-soft">{job.title}</h2>
      <p className="mt-2 flex items-center gap-2 text-ink-muted">
        <Icon name="building" className="h-4 w-4" />
        {job.company}
      </p>
      <footer className="mt-auto flex justify-end pt-4">
        <SaveJobButton job={job} compact />
      </footer>
    </article>
  )
}

export default function SavedJobsPage() {
  const { t } = useI18n()
  const { page, buildHref } = useListQuery()
  const { ready, isSaved } = useSavedJobs()
  const request = useRequest(`saved-jobs:${page}`, ({ signal }) =>
    savedJobsService.list({ page: page - 1, size: DEFAULT_PAGE_SIZE }, { signal }),
  )

  return (
    <PageMain className="page-container page-section">
      <Seo title={t('jobs.saved.title')} path={paths.savedJobs} robots="noindex,nofollow" />
      <Breadcrumbs
        items={[
          { label: t('jobs.breadcrumb'), to: paths.jobs },
          { label: t('jobs.saved.title'), to: paths.savedJobs },
        ]}
      />
      <PageHeader title={t('jobs.saved.title')} description={t('jobs.saved.description')} />

      <section aria-label={t('jobs.saved.title')} aria-busy={request.loading}>
        <QueryBoundary
          data={request.data}
          error={request.error}
          onRetry={request.reload}
          skeleton={<CardGridSkeleton withImage={false} />}
          errorTitle={t('jobs.saved.error')}
        >
          {(result) => {
            if (result.totalPages > 0 && page > result.totalPages) {
              return <Navigate to={buildHref(result.totalPages)} replace />
            }
            // Las que el usuario quita en esta página desaparecen al momento; al volver se recarga la lista.
            const items = ready ? result.content.filter((item) => isSaved(item.job.id)) : result.content
            if (items.length === 0) {
              return (
                <EmptyState
                  icon="bookmark"
                  title={t('jobs.saved.emptyTitle')}
                  description={t('jobs.saved.empty')}
                  action={<ButtonLink to={paths.jobs}>{t('jobs.saved.browse')}</ButtonLink>}
                />
              )
            }
            return (
              <>
                <p role="status" className="mb-4 text-sm text-ink-muted">
                  {t('jobs.saved.count', { count: result.totalElements - (result.content.length - items.length) })}
                </p>
                <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map(({ job, available, savedAt }) => (
                    <li key={job.id} className="flex flex-col gap-2">
                      {available ? <JobCard job={job} headingLevel="h2" /> : <UnavailableJob job={job} />}
                      <p className="px-1 text-xs text-ink-muted">
                        {t('jobs.saved.savedOn')} <Time value={savedAt} format="short" />
                      </p>
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
