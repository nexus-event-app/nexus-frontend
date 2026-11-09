import Breadcrumbs from '@/shared/components/Breadcrumbs'
import CardGridSkeleton from '@/shared/components/CardGridSkeleton'
import EmptyState from '@/shared/components/EmptyState'
import PageHeader from '@/shared/components/PageHeader'
import Pagination from '@/shared/components/Pagination'
import QueryBoundary from '@/shared/components/QueryBoundary'
import Seo from '@/shared/components/Seo'
import { paths } from '@/shared/config/paths'
import JobFilters from '../components/JobFilters'
import JobGrid from '../components/JobGrid'
import JobPortals from '../components/JobPortals'
import { useJobsList } from '../hooks/useJobsList'
import { useI18n } from '@/shared/i18n/useI18n'

const CLEARED_FILTERS = { nivel: '', modalidad: '', contrato: '', q: '' }

export default function JobsListPage() {
  const { t } = useI18n()
  const list = useJobsList()
  const { page, filters, hasFilters, setFilters, buildHref } = list

  return (
    <div className="page-container page-section">
      <Seo
        title={page > 1 ? `${t('jobs.list.seoTitlePage')}${t('common.pageSuffix', { page })}` : t('jobs.list.seoTitle')}
        description={t('jobs.list.seoDescription')}
        path={page > 1 ? `${paths.jobs}?page=${page}` : paths.jobs}
        robots={hasFilters ? 'noindex,follow' : 'index,follow'}
      />
      <Breadcrumbs items={[{ label: t('jobs.breadcrumb'), to: paths.jobs }]} />
      <PageHeader
        title={t('jobs.list.title')}
        description={t('jobs.list.description')}
      />

      <JobFilters
        filters={filters}
        hasFilters={hasFilters}
        onChange={setFilters}
        onClear={() => setFilters(CLEARED_FILTERS)}
      />

      <section aria-label={t('common.results')} aria-busy={list.loading}>
        <QueryBoundary
          data={list.data}
          error={list.error}
          onRetry={list.reload}
          skeleton={<CardGridSkeleton withImage={false} />}
          errorTitle={t('jobs.list.error')}
        >
          {(result) =>
            result.content.length === 0 ? (
              <EmptyState
                icon="briefcase"
                title={t('jobs.list.emptyTitle')}
                description={
                  hasFilters ? t('jobs.list.emptyFiltered') : t('jobs.list.empty')
                }
              />
            ) : (
              <>
                <p role="status" className="mb-4 text-sm text-ink-muted">
                  {t('jobs.list.count', { count: result.totalElements })}
                </p>
                <JobGrid items={result.content} headingLevel="h2" />
                <Pagination page={page} totalPages={result.totalPages} buildHref={buildHref} />
              </>
            )
          }
        </QueryBoundary>
      </section>

      <JobPortals />
    </div>
  )
}
