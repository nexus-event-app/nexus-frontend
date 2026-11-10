import { useSearchParams } from 'react-router-dom'
import DiscussionCard from '@/features/forum/components/DiscussionCard'
import JobGrid from '@/features/jobs/components/JobGrid'
import NewsGrid from '@/features/news/components/NewsGrid'
import { Link } from '@/shared/i18n/router'
import Avatar from '@/shared/components/Avatar'
import Breadcrumbs from '@/shared/components/Breadcrumbs'
import CardGridSkeleton from '@/shared/components/CardGridSkeleton'
import EmptyState from '@/shared/components/EmptyState'
import PageHeader from '@/shared/components/PageHeader'
import PageMain from '@/shared/components/PageMain'
import QueryBoundary from '@/shared/components/QueryBoundary'
import SearchBar from '@/shared/components/SearchBar'
import SectionHeader from '@/shared/components/SectionHeader'
import Seo from '@/shared/components/Seo'
import { paths, searchPath, withQuery } from '@/shared/config/paths'
import { useRequest } from '@/shared/hooks/useRequest'
import { useI18n } from '@/shared/i18n/useI18n'
import { MIN_QUERY_LENGTH, totalResults } from '../hooks/useSearch'
import { searchService } from '../services/searchService'

const PAGE_LIMIT = 6
/** Lista completa de cada grupo con la búsqueda aplicada (las personas no tienen una propia). */
const SECTION_PATHS = { news: paths.news, jobs: paths.jobs, discussions: paths.forum }

function ResultSection({ group, total, query, children }) {
  const { t } = useI18n()
  const id = `search-${group}`
  const listPath = SECTION_PATHS[group]
  return (
    <section aria-labelledby={id} className="mt-10">
      <SectionHeader
        id={id}
        title={t(`search.groups.${group}`)}
        description={t('search.resultCount', { count: total })}
        action={
          listPath &&
          total > PAGE_LIMIT && (
            <Link to={withQuery(listPath, query)} className="link inline-flex min-h-[2.75rem] shrink-0 items-center">
              {t(`search.seeAllIn.${group}`, { count: total })}
            </Link>
          )
        }
      />
      {children}
    </section>
  )
}

function PeopleList({ people }) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {people.map((person) => (
        <li key={person.id}>
          <Link
            to={paths.profile(person)}
            className="card flex h-full items-center gap-4 p-4 transition-shadow hover:shadow-pop"
          >
            <Avatar name={person.name} src={person.avatarUrl} size="lg" />
            <span className="min-w-0">
              <strong className="block truncate font-semibold text-ink">{person.name}</strong>
              {person.headline && <span className="block truncate text-sm text-ink-muted">{person.headline}</span>}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

/** Página de resultados de la búsqueda global: noticias, ofertas, discusiones y personas. */
export default function SearchPage() {
  const { t } = useI18n()
  const [searchParams, setSearchParams] = useSearchParams()
  const query = (searchParams.get('q') ?? '').trim()
  const enabled = query.length >= MIN_QUERY_LENGTH
  const request = useRequest(
    `search-page:${query}`,
    ({ signal }) => searchService.search(query, PAGE_LIMIT, { signal }),
    { enabled },
  )
  const title = enabled ? t('search.page.titleQuery', { query }) : t('search.page.title')

  return (
    <PageMain className="page-container page-section">
      {/* Los resultados de búsqueda no se indexan: son páginas infinitas y repetidas. */}
      <Seo title={title} description={t('search.page.description')} path={searchPath(query)} robots="noindex,follow" />
      <Breadcrumbs items={[{ label: t('search.page.title'), to: paths.search }]} />
      <PageHeader title={title} description={t('search.page.description')} />

      <search className="mb-10 block">
        <SearchBar
          value={query}
          label={t('search.inputLabel')}
          placeholder={t('search.placeholder')}
          onSearch={(value) => setSearchParams(value ? { q: value } : {}, { replace: true })}
        />
      </search>

      {!enabled ? (
        <EmptyState icon="search" title={t('search.page.emptyTitle')} description={t('search.page.empty')} />
      ) : (
        <section aria-label={t('common.results')} aria-busy={request.loading}>
          <QueryBoundary
            data={request.data}
            error={request.error}
            onRetry={request.reload}
            skeleton={<CardGridSkeleton withImage={false} count={3} />}
            errorTitle={t('search.page.error')}
          >
            {(result) => (
              <>
                <p role="status" className="text-sm text-ink-muted">
                  {t('search.resultCount', { count: totalResults(result) })}
                </p>
                {totalResults(result) === 0 ? (
                  <EmptyState
                    icon="search"
                    title={t('search.noResults', { query })}
                    description={t('search.noResultsHint')}
                  />
                ) : (
                  <>
                    {result.news.total > 0 && (
                      <ResultSection group="news" total={result.news.total} query={query}>
                        <NewsGrid items={result.news.items} />
                      </ResultSection>
                    )}
                    {result.jobs.total > 0 && (
                      <ResultSection group="jobs" total={result.jobs.total} query={query}>
                        <JobGrid items={result.jobs.items} />
                      </ResultSection>
                    )}
                    {result.discussions.total > 0 && (
                      <ResultSection group="discussions" total={result.discussions.total} query={query}>
                        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
                          {result.discussions.items.map((discussion) => (
                            <li key={discussion.id}>
                              <DiscussionCard discussion={discussion} />
                            </li>
                          ))}
                        </ul>
                      </ResultSection>
                    )}
                    {result.people.total > 0 && (
                      <ResultSection group="people" total={result.people.total} query={query}>
                        <PeopleList people={result.people.items} />
                      </ResultSection>
                    )}
                  </>
                )}
              </>
            )}
          </QueryBoundary>
        </section>
      )}
    </PageMain>
  )
}
