import { Link } from 'react-router-dom'
import Breadcrumbs from '@/shared/components/Breadcrumbs'
import ButtonLink from '@/shared/components/ButtonLink'
import EmptyState from '@/shared/components/EmptyState'
import ListSkeleton from '@/shared/components/ListSkeleton'
import PageHeader from '@/shared/components/PageHeader'
import Pagination from '@/shared/components/Pagination'
import QueryBoundary from '@/shared/components/QueryBoundary'
import SearchBar from '@/shared/components/SearchBar'
import Seo from '@/shared/components/Seo'
import { discussionCategories } from '@/shared/config/catalogs'
import { paths } from '@/shared/config/paths'
import DiscussionCard from '../components/DiscussionCard'
import DiscussionCategoryFilter from '../components/DiscussionCategoryFilter'
import ForumRules from '../components/ForumRules'
import { useDiscussionsList } from '../hooks/useDiscussionsList'

export default function ForumPage() {
  const list = useDiscussionsList()
  const { page, category, search, hasFilters, setFilters, buildHref } = list

  const heading = category ? `Foro: ${discussionCategories.labelOf(category).toLowerCase()}` : 'Foro de la comunidad'

  return (
    <div className="page-container page-section">
      <Seo
        title={page > 1 ? `${heading} (página ${page})` : heading}
        description="Preguntas, recursos y experiencias de la comunidad tech junior. Pregunta sin miedo y ayuda a otras personas a crecer."
        path={page > 1 ? `${paths.forum}?page=${page}` : paths.forum}
        robots={hasFilters ? 'noindex,follow' : 'index,follow'}
      />
      <Breadcrumbs items={[{ label: 'Foro', to: paths.forum }]} />
      <PageHeader
        title={heading}
        description="Pregunta sin miedo, comparte lo que aprendes y ayuda a otras personas que empiezan como tú."
        actions={<ButtonLink to={paths.forumNew}>Nueva discusión</ButtonLink>}
      />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="min-w-0">
          <div className="mb-8 space-y-4">
            <SearchBar
              value={search}
              onSearch={(value) => setFilters({ q: value }, { replace: true })}
              label="Buscar discusiones"
              placeholder="Buscar en el foro…"
            />
            <DiscussionCategoryFilter category={category} buildHref={buildHref} />
          </div>

          <section aria-label="Discusiones" aria-busy={list.loading}>
            <QueryBoundary
              data={list.data}
              error={list.error}
              onRetry={list.reload}
              skeleton={<ListSkeleton />}
              errorTitle="No hemos podido cargar las discusiones"
            >
              {(result) =>
                result.content.length === 0 ? (
                  <EmptyState
                    icon="chat"
                    title="No hay discusiones que mostrar"
                    description={
                      hasFilters
                        ? 'Prueba con otra búsqueda o quita los filtros.'
                        : 'Todavía nadie ha abierto una discusión. ¡Empieza tú!'
                    }
                    action={
                      hasFilters || page > 1 ? (
                        <Link to={paths.forum} className="btn btn-secondary">
                          Ver todas las discusiones
                        </Link>
                      ) : (
                        <ButtonLink to={paths.forumNew}>Crear la primera discusión</ButtonLink>
                      )
                    }
                  />
                ) : (
                  <>
                    <p role="status" className="mb-4 text-sm text-ink-muted">
                      {result.totalElements} {result.totalElements === 1 ? 'discusión' : 'discusiones'}
                    </p>
                    <ul className="space-y-4">
                      {result.content.map((discussion) => (
                        <li key={discussion.id}>
                          <DiscussionCard discussion={discussion} headingLevel="h2" />
                        </li>
                      ))}
                    </ul>
                    <Pagination page={page} totalPages={result.totalPages} buildHref={buildHref} />
                  </>
                )
              }
            </QueryBoundary>
          </section>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <ForumRules />
        </div>
      </div>
    </div>
  )
}
