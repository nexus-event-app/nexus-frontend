import Breadcrumbs from '@/shared/components/Breadcrumbs'
import EmptyState from '@/shared/components/EmptyState'
import ActionMenu from '@/shared/components/ActionMenu'
import Eyebrow from '@/shared/components/Eyebrow'
import PageMain from '@/shared/components/PageMain'
import Pagination from '@/shared/components/Pagination'
import QueryBoundary from '@/shared/components/QueryBoundary'
import Seo from '@/shared/components/Seo'
import { paths } from '@/shared/config/paths'
import JobFilters from '../components/JobFilters'
import JobList from '../components/JobList'
import JobListSkeleton from '../components/JobListSkeleton'
import JobPortals from '../components/JobPortals'
import { useJobsList } from '../hooks/useJobsList'
import { useSavedJobs } from '../hooks/useSavedJobs'
import { useAuth } from '@/features/auth/hooks/useAuth'
import ButtonLink from '@/shared/components/ButtonLink'
import Icon from '@/shared/components/Icon'
import { useI18n } from '@/shared/i18n/useI18n'

const CLEARED_FILTERS = { nivel: '', modalidad: '', contrato: '', q: '' }

/** «Quitar filtros»: discreto, como un enlace, junto al número de ofertas. */
function ClearFilters({ onClear }) {
  const { t } = useI18n()
  return (
    <button
      type="button"
      onClick={onClear}
      className="inline-flex min-h-[2.75rem] items-center gap-1.5 rounded-full px-3 text-sm font-medium text-accent hover:bg-accent-soft sm:min-h-[2.25rem]"
    >
      <Icon name="close" className="h-4 w-4" />
      {t('jobs.filters.clear')}
    </button>
  )
}

export default function JobsListPage() {
  const { t } = useI18n()
  const list = useJobsList()
  const { page, filters, hasFilters, setFilters, buildHref } = list
  const { isAuthenticated } = useAuth()
  const savedJobs = useSavedJobs()

  return (
    <PageMain className="page-container page-section relative isolate">
      <Seo
        title={page > 1 ? `${t('jobs.list.seoTitlePage')}${t('common.pageSuffix', { page })}` : t('jobs.list.seoTitle')}
        description={t('jobs.list.seoDescription')}
        path={page > 1 ? `${paths.jobs}?page=${page}` : paths.jobs}
        robots={hasFilters ? 'noindex,follow' : 'index,follow'}
      />
      {/* Cuadrícula decorativa detrás de la cabecera, como en Noticias y en la portada. */}
      <span aria-hidden="true" className="bg-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-96" />
      <Breadcrumbs items={[{ label: t('jobs.breadcrumb'), to: paths.jobs }]} />
      <header className="mb-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <hgroup>
          <Eyebrow>{t('jobs.list.eyebrow')}</Eyebrow>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl">{t('jobs.list.title')}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">{t('jobs.list.description')}</p>
        </hgroup>
        <ActionMenu className="shrink-0">
          {isAuthenticated && (
            <ButtonLink to={paths.savedJobs} variant="secondary">
              <Icon name="bookmark" />
              {t('jobs.saved.link', { count: savedJobs.count })}
            </ButtonLink>
          )}
        </ActionMenu>
      </header>

      <JobFilters filters={filters} onChange={setFilters} buildHref={buildHref} />

      <section aria-label={t('common.results')} aria-busy={list.loading}>
        <QueryBoundary
          data={list.data}
          error={list.error}
          onRetry={list.reload}
          skeleton={<JobListSkeleton />}
          errorTitle={t('jobs.list.error')}
        >
          {(result) =>
            result.content.length === 0 ? (
              <EmptyState
                icon="briefcase"
                title={t('jobs.list.emptyTitle')}
                description={hasFilters ? t('jobs.list.emptyFiltered') : t('jobs.list.empty')}
                action={hasFilters ? <ClearFilters onClear={() => setFilters(CLEARED_FILTERS)} /> : null}
              />
            ) : (
              <>
                <header className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <p role="status" className="text-sm font-medium text-ink-muted">
                    {t('jobs.list.count', { count: result.totalElements })}
                  </p>
                  {hasFilters && <ClearFilters onClear={() => setFilters(CLEARED_FILTERS)} />}
                </header>
                <JobList items={result.content} headingLevel="h2" />
                <Pagination page={page} totalPages={result.totalPages} buildHref={buildHref} />
              </>
            )
          }
        </QueryBoundary>
      </section>

      <JobPortals />
    </PageMain>
  )
}
