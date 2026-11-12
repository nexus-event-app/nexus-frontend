import { Navigate } from '@/shared/i18n/router'
import Breadcrumbs from '@/shared/components/Breadcrumbs'
import ButtonLink from '@/shared/components/ButtonLink'
import JobListSkeleton from '../components/JobListSkeleton'
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
import CompanyMonogram from '../components/CompanyMonogram'
import JobCard from '../components/JobCard'
import { JOB_LIST_CLASSES } from '../components/JobList'
import SaveJobButton from '../components/SaveJobButton'
import { useSavedJobs } from '../hooks/useSavedJobs'
import { savedJobsService } from '../services/savedJobsService'

/** Oferta guardada que ya no está publicada: se muestra para que el usuario pueda quitarla. */
/** Oferta guardada que ya no está publicada: misma fila, apagada y sin enlace; solo se puede quitar de guardadas. */
function UnavailableJob({ job, note }) {
  const { t } = useI18n()
  return (
    <article className="job-row gap-y-1.5 px-5 py-5 sm:px-6">
      <CompanyMonogram name={job.company} className="opacity-50 [grid-area:logo]" />
      <h2 className="self-center text-base font-bold leading-snug text-ink-soft [grid-area:title] sm:text-lg">
        {job.title}
      </h2>
      <p className="truncate text-sm text-ink-muted [grid-area:company]">{job.company}</p>
      <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-ink-muted [grid-area:facts]">
        <Icon name="info" className="h-4 w-4" />
        {t('jobs.saved.unavailable')}
      </p>
      <SaveJobButton job={job} compact className="-mr-2 justify-self-end [grid-area:save]" />
      <p className="mt-2 text-xs text-ink-muted [grid-area:time] lg:mt-0 lg:self-start lg:text-right">{note}</p>
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
          skeleton={<JobListSkeleton />}
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
                <ul className={JOB_LIST_CLASSES}>
                  {items.map(({ job, available, savedAt }) => {
                    const note = (
                      <span>
                        {t('jobs.saved.savedOn')} <Time value={savedAt} format="short" />
                      </span>
                    )
                    return (
                      <li key={job.id}>
                        {available ? (
                          <JobCard job={job} headingLevel="h2" note={note} />
                        ) : (
                          <UnavailableJob job={job} note={note} />
                        )}
                      </li>
                    )
                  })}
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
