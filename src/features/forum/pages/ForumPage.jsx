import { Link } from '@/shared/i18n/router'
import Breadcrumbs from '@/shared/components/Breadcrumbs'
import ButtonLink from '@/shared/components/ButtonLink'
import EmptyState from '@/shared/components/EmptyState'
import Icon from '@/shared/components/Icon'
import ListSkeleton from '@/shared/components/ListSkeleton'
import ActionMenu from '@/shared/components/ActionMenu'
import Illustration from '@/shared/components/Illustration'
import { illustrations } from '@/shared/config/illustrations'
import Eyebrow from '@/shared/components/Eyebrow'
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
    <PageMain className="page-container page-section relative isolate grid grid-cols-1 content-start gap-x-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:grid-rows-[auto_auto_auto_1fr]">
      <Seo
        title={`${category ? heading : t('forum.list.seoTitle')}${page > 1 ? t('common.pageSuffix', { page }) : ''}`}
        description={t('forum.list.seoDescription')}
        path={page > 1 ? `${paths.forum}?page=${page}` : paths.forum}
        robots={hasFilters ? 'noindex,follow' : 'index,follow'}
      />
      <span aria-hidden="true" className="bg-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-96" />
      <Breadcrumbs className="col-span-full" items={[{ label: t('forum.breadcrumb'), to: paths.forum }]} />
      <header className="col-span-full mb-8 grid items-end gap-x-10 lg:grid-cols-[minmax(0,1fr)_20rem] xl:grid-cols-[minmax(0,1fr)_24rem]">
        <hgroup>
          <Eyebrow>{t('forum.list.eyebrow')}</Eyebrow>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl">{heading}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">{t('forum.list.description')}</p>
        </hgroup>
        <Illustration {...illustrations.forum} className="-mt-20 hidden lg:block" />
      </header>

      <ActionMenu className="mb-6 lg:col-start-2 lg:row-start-3 lg:self-end lg:[&>li]:w-full">
        <ButtonLink to={paths.forumNew} size="lg" className="shadow-pop lg:w-full">
          <Icon name="plus" className="h-5 w-5" />
          {t('forum.list.newDiscussion')}
        </ButtonLink>
      </ActionMenu>

      <search className="mb-6 grid min-w-0 lg:col-start-1 lg:row-start-3 grid-cols-1 items-center gap-3 border-y border-slate-200 py-3 xl:grid-cols-[minmax(0,1fr)_12rem]">
        <DiscussionCategoryFilter category={category} buildHref={buildHref} />
        <SearchBar
          compact
          value={search}
          onSearch={(value) => setFilters({ q: value }, { replace: true })}
          label={t('forum.list.searchLabel')}
          placeholder={t('forum.list.searchPlaceholder')}
        />
      </search>

      <section
        aria-label={t('forum.list.region')}
        aria-busy={list.loading}
        className="min-w-0 lg:col-start-1 lg:row-start-4"
      >
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
                <p role="status" className="mb-4 text-sm font-medium text-ink-muted">
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

      <ForumRules className="mt-12 lg:sticky lg:top-24 lg:col-start-2 lg:row-start-4 lg:mt-0 lg:self-start" />
    </PageMain>
  )
}
