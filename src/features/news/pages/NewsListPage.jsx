import { Link } from '@/shared/i18n/router'
import Breadcrumbs from '@/shared/components/Breadcrumbs'
import CardGridSkeleton from '@/shared/components/CardGridSkeleton'
import EmptyState from '@/shared/components/EmptyState'
import Eyebrow from '@/shared/components/Eyebrow'
import PageMain from '@/shared/components/PageMain'
import Pagination from '@/shared/components/Pagination'
import QueryBoundary from '@/shared/components/QueryBoundary'
import SearchBar from '@/shared/components/SearchBar'
import Seo from '@/shared/components/Seo'
import { newsCategories } from '@/shared/config/catalogs'
import { paths } from '@/shared/config/paths'
import NewsCategoryFilter from '../components/NewsCategoryFilter'
import NewsLanguageFilter from '../components/NewsLanguageFilter'
import NewsGrid from '../components/NewsGrid'
import { useNewsList } from '../hooks/useNewsList'
import { useI18n } from '@/shared/i18n/useI18n'

export default function NewsListPage() {
  const { t } = useI18n()
  const list = useNewsList()
  const { page, category, search, language, hasFilters, setFilters, buildHref } = list

  const heading = category
    ? t('news.list.categoryHeading', { category: newsCategories.labelOf(category).toLowerCase() })
    : t('news.list.heading')
  const pageSuffix = page > 1 ? t('common.pageSuffix', { page }) : ''

  return (
    <PageMain className="page-container page-section relative isolate">
      <Seo
        title={`${heading}${pageSuffix}`}
        description={t('news.list.seoDescription')}
        path={page > 1 ? `${paths.news}?page=${page}` : paths.news}
        robots={hasFilters ? 'noindex,follow' : 'index,follow'}
      />
      {/* Cuadrícula decorativa detrás de la cabecera, como en las secciones de la portada. */}
      <span aria-hidden="true" className="bg-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-96" />
      <Breadcrumbs items={[{ label: t('news.breadcrumb'), to: paths.news }]} />

      <header className="mb-8">
        <hgroup>
          <Eyebrow>{t('news.list.eyebrow')}</Eyebrow>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl">{heading}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">{t('news.list.description')}</p>
        </hgroup>
      </header>

      {/*
        Barra de filtros discreta: categorías a la izquierda; idioma y buscador a la derecha. En móvil, las categorías
        ocupan su fila y debajo van el idioma y el buscador.
      */}
      <search className="mb-8 grid grid-cols-1 items-center gap-3 border-y border-slate-200 py-3 sm:grid-cols-[auto_minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_auto_16rem]">
        <NewsCategoryFilter category={category} buildHref={buildHref} className="sm:col-span-full lg:col-span-1" />
        <NewsLanguageFilter language={language} buildHref={buildHref} />
        <SearchBar
          compact
          value={search}
          onSearch={(value) => setFilters({ q: value }, { replace: true })}
          label={t('news.list.searchLabel')}
          placeholder={t('news.list.searchPlaceholder')}
        />
      </search>

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
                description={hasFilters ? t('news.list.emptyFiltered') : t('news.list.empty')}
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
                <p role="status" className="mb-5 text-sm font-medium text-ink-muted">
                  {t('news.list.count', { count: result.totalElements })}
                </p>
                {/* Rejilla variada: unas con la imagen arriba y otras, anchas, con la imagen al lado. */}
                <NewsGrid items={result.content} headingLevel="h2" varied />
                <Pagination page={page} totalPages={result.totalPages} buildHref={buildHref} />
              </>
            )
          }
        </QueryBoundary>
      </section>
    </PageMain>
  )
}
