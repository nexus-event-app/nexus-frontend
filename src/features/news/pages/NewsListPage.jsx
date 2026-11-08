import { Link } from '@/shared/i18n/router'
import Breadcrumbs from '@/shared/components/Breadcrumbs'
import CardGridSkeleton from '@/shared/components/CardGridSkeleton'
import EmptyState from '@/shared/components/EmptyState'
import PageHeader from '@/shared/components/PageHeader'
import Pagination from '@/shared/components/Pagination'
import QueryBoundary from '@/shared/components/QueryBoundary'
import SearchBar from '@/shared/components/SearchBar'
import Seo from '@/shared/components/Seo'
import { newsCategories } from '@/shared/config/catalogs'
import { paths } from '@/shared/config/paths'
import NewsCategoryFilter from '../components/NewsCategoryFilter'
import NewsGrid from '../components/NewsGrid'
import { useNewsList } from '../hooks/useNewsList'
import { useI18n } from '@/shared/i18n/useI18n'

export default function NewsListPage() {
  const { t } = useI18n()
  const list = useNewsList()
  const { page, category, search, hasFilters, setFilters, buildHref } = list

  const heading = category
    ? t('news.list.categoryHeading', { category: newsCategories.labelOf(category).toLowerCase() })
    : t('news.list.heading')
  const pageSuffix = page > 1 ? t('common.pageSuffix', { page }) : ''

  return (
    <div className="page-container page-section">
      <Seo
        title={`${heading}${pageSuffix}`}
        description={t('news.list.seoDescription')}
        path={page > 1 ? `${paths.news}?page=${page}` : paths.news}
        robots={hasFilters ? 'noindex,follow' : 'index,follow'}
      />
      <Breadcrumbs items={[{ label: t('news.breadcrumb'), to: paths.news }]} />
      <PageHeader
        title={heading}
        description={t('news.list.description')}
      />

      <div className="mb-8 space-y-4">
        <SearchBar
          value={search}
          onSearch={(value) => setFilters({ q: value }, { replace: true })}
          label={t('news.list.searchLabel')}
          placeholder={t('news.list.searchPlaceholder')}
        />
        <NewsCategoryFilter category={category} buildHref={buildHref} />
      </div>

      <section aria-label={t('common.results')} aria-busy={list.loading}>
        <QueryBoundary
          data={list.data}
          error={list.error}
          onRetry={list.reload}
          skeleton={<CardGridSkeleton />}
          errorTitle={t('news.list.error')}
        >
          {(result) =>
            result.content.length === 0 ? (
              <EmptyState
                icon="newspaper"
                title={t('news.list.emptyTitle')}
                description={
                  hasFilters ? t('news.list.emptyFiltered') : t('news.list.empty')
                }
                action={
                  hasFilters || page > 1 ? (
                    <Link to={paths.news} className="btn btn-secondary">
                      {t('news.list.seeAll')}
                    </Link>
                  ) : null
                }
              />
            ) : (
              <>
                <p role="status" className="mb-4 text-sm text-ink-muted">
                  {t('news.list.count', { count: result.totalElements })}
                </p>
                <NewsGrid items={result.content} headingLevel="h2" />
                <Pagination page={page} totalPages={result.totalPages} buildHref={buildHref} />
              </>
            )
          }
        </QueryBoundary>
      </section>
    </div>
  )
}
