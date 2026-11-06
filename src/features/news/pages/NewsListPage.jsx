import { Link } from 'react-router-dom'
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

export default function NewsListPage() {
  const list = useNewsList()
  const { page, category, search, hasFilters, setFilters, buildHref } = list

  const heading = category ? `Noticias de ${newsCategories.labelOf(category).toLowerCase()}` : 'Noticias tech para juniors'
  const pageSuffix = page > 1 ? ` (página ${page})` : ''

  return (
    <div className="page-container page-section">
      <Seo
        title={`${heading}${pageSuffix}`}
        description="Las noticias tech más útiles para quienes empiezan: desarrollo, entrevistas, networking y recursos, en español."
        path={page > 1 ? `${paths.news}?page=${page}` : paths.news}
        robots={hasFilters ? 'noindex,follow' : 'index,follow'}
      />
      <Breadcrumbs items={[{ label: 'Noticias', to: paths.news }]} />
      <PageHeader
        title={heading}
        description="Desarrollo, entrevistas, networking y recursos explicados sin ruido y pensados para perfiles junior."
      />

      <div className="mb-8 space-y-4">
        <SearchBar
          value={search}
          onSearch={(value) => setFilters({ q: value }, { replace: true })}
          label="Buscar noticias"
          placeholder="Buscar por título o contenido…"
        />
        <NewsCategoryFilter category={category} buildHref={buildHref} />
      </div>

      <section aria-label="Resultados" aria-busy={list.loading}>
        <QueryBoundary
          data={list.data}
          error={list.error}
          onRetry={list.reload}
          skeleton={<CardGridSkeleton />}
          errorTitle="No hemos podido cargar las noticias"
        >
          {(result) =>
            result.content.length === 0 ? (
              <EmptyState
                icon="newspaper"
                title="No hay noticias que mostrar"
                description={
                  hasFilters
                    ? 'Prueba con otra búsqueda o quita los filtros para ver todas las noticias.'
                    : 'Aún no hemos publicado noticias. Vuelve pronto.'
                }
                action={
                  hasFilters || page > 1 ? (
                    <Link to={paths.news} className="btn btn-secondary">
                      Ver todas las noticias
                    </Link>
                  ) : null
                }
              />
            ) : (
              <>
                <p role="status" className="mb-4 text-sm text-ink-muted">
                  {result.totalElements} {result.totalElements === 1 ? 'noticia' : 'noticias'}
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
