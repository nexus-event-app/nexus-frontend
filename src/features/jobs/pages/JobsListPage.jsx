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
import { useJobsList } from '../hooks/useJobsList'

const CLEARED_FILTERS = { nivel: '', modalidad: '', contrato: '', q: '' }

export default function JobsListPage() {
  const list = useJobsList()
  const { page, filters, hasFilters, setFilters, buildHref } = list

  return (
    <div className="page-container page-section">
      <Seo
        title={page > 1 ? `Ofertas de empleo junior (página ${page})` : 'Ofertas de empleo junior y prácticas'}
        description="Ofertas de trabajo y prácticas en tecnología para perfiles junior: filtra por nivel, modalidad y tipo de contrato."
        path={page > 1 ? `${paths.jobs}?page=${page}` : paths.jobs}
        robots={hasFilters ? 'noindex,follow' : 'index,follow'}
      />
      <Breadcrumbs items={[{ label: 'Empleo', to: paths.jobs }]} />
      <PageHeader
        title="Ofertas de empleo para juniors"
        description="Prácticas y primeros empleos en tecnología, seleccionados para quienes están empezando."
      />

      <JobFilters
        filters={filters}
        hasFilters={hasFilters}
        onChange={setFilters}
        onClear={() => setFilters(CLEARED_FILTERS)}
      />

      <section aria-label="Resultados" aria-busy={list.loading}>
        <QueryBoundary
          data={list.data}
          error={list.error}
          onRetry={list.reload}
          skeleton={<CardGridSkeleton withImage={false} />}
          errorTitle="No hemos podido cargar las ofertas"
        >
          {(result) =>
            result.content.length === 0 ? (
              <EmptyState
                icon="briefcase"
                title="No hay ofertas con estos criterios"
                description={
                  hasFilters
                    ? 'Prueba a cambiar la búsqueda o a quitar algún filtro.'
                    : 'Ahora mismo no hay ofertas publicadas. Vuelve pronto.'
                }
              />
            ) : (
              <>
                <p role="status" className="mb-4 text-sm text-ink-muted">
                  {result.totalElements} {result.totalElements === 1 ? 'oferta' : 'ofertas'}
                </p>
                <JobGrid items={result.content} headingLevel="h2" />
                <Pagination page={page} totalPages={result.totalPages} buildHref={buildHref} />
              </>
            )
          }
        </QueryBoundary>
      </section>
    </div>
  )
}
