import { Link } from '@/shared/i18n/router'
import Breadcrumbs from '@/shared/components/Breadcrumbs'
import ButtonLink from '@/shared/components/ButtonLink'
import EmptyState from '@/shared/components/EmptyState'
import ListSkeleton from '@/shared/components/ListSkeleton'
import PageHeader from '@/shared/components/PageHeader'
import PageMain from '@/shared/components/PageMain'
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
import { useI18n } from '@/shared/i18n/useI18n'

export default function ForumPage() {
  const { t } = useI18n()
  const list = useDiscussionsList()
  const { page, category, search, hasFilters, setFilters, buildHref } = list

  const heading = category
    ? t('forum.list.categoryHeading', { category: discussionCategories.labelOf(category).toLowerCase() })
    : t('forum.list.heading')

  return (
    // Rejilla del <main>: migas y cabecera arriba; búsqueda y discusiones a la izquierda, normas a la derecha.
    <PageMain className="page-container page-section grid grid-cols-1 content-start gap-x-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:grid-rows-[auto_auto_auto_1fr]">
      <Seo
        title={page > 1 ? `${heading}${t('common.pageSuffix', { page })}` : heading}
        description={t('forum.list.seoDescription')}
        path={page > 1 ? `${paths.forum}?page=${page}` : paths.forum}
        robots={hasFilters ? 'noindex,follow' : 'index,follow'}
      />
      <Breadcrumbs className="col-span-full" items={[{ label: t('forum.breadcrumb'), to: paths.forum }]} />
      <PageHeader
        className="col-span-full"
        title={heading}
        description={t('forum.list.description')}
        actions={<ButtonLink to={paths.forumNew}>{t('forum.list.newDiscussion')}</ButtonLink>}
      />

      <search className="mb-8 block min-w-0 space-y-4">
        <SearchBar
          value={search}
          onSearch={(value) => setFilters({ q: value }, { replace: true })}
          label={t('forum.list.searchLabel')}
          placeholder={t('forum.list.searchPlaceholder')}
        />
        <DiscussionCategoryFilter category={category} buildHref={buildHref} />
      </search>

      <section aria-label={t('forum.list.region')} aria-busy={list.loading} className="min-w-0">
        <QueryBoundary
          data={list.data}
          error={list.error}
          onRetry={list.reload}
          skeleton={<ListSkeleton />}
          errorTitle={t('forum.list.error')}
        >
          {(result) =>
            result.content.length === 0 ? (
              <EmptyState
                icon="chat"
                title={t('forum.list.emptyTitle')}
                description={hasFilters ? t('forum.list.emptyFiltered') : t('forum.list.empty')}
                action={
                  hasFilters || page > 1 ? (
                    <Link to={paths.forum} className="btn btn-secondary">
                      {t('forum.list.seeAll')}
                    </Link>
                  ) : (
                    <ButtonLink to={paths.forumNew}>{t('forum.list.createFirst')}</ButtonLink>
                  )
                }
              />
            ) : (
              <>
                <p role="status" className="mb-4 text-sm text-ink-muted">
                  {t('forum.list.count', { count: result.totalElements })}
                </p>
                <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
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

      <ForumRules className="mt-10 lg:sticky lg:top-24 lg:col-start-2 lg:row-span-2 lg:row-start-3 lg:mt-0 lg:self-start" />
    </PageMain>
  )
}
