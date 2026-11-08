import DiscussionCard from '@/features/forum/components/DiscussionCard'
import { useLatestDiscussions } from '@/features/forum/hooks/useLatestDiscussions'
import ButtonLink from '@/shared/components/ButtonLink'
import EmptyState from '@/shared/components/EmptyState'
import ListSkeleton from '@/shared/components/ListSkeleton'
import QueryBoundary from '@/shared/components/QueryBoundary'
import { paths } from '@/shared/config/paths'
import HomeSection from './HomeSection'
import { useI18n } from '@/shared/i18n/useI18n'

export default function ForumSection() {
  const { t } = useI18n()
  const request = useLatestDiscussions(3)

  return (
    <HomeSection
      id="home-forum"
      title={t('home.forum.title')}
      description={t('home.forum.description')}
      linkTo={paths.forum}
      linkLabel={t('home.forum.link')}
    >
      <QueryBoundary
        data={request.data}
        error={request.error}
        onRetry={request.reload}
        skeleton={<ListSkeleton rows={3} />}
        errorTitle={t('home.forum.error')}
      >
        {(items) =>
          items.length === 0 ? (
            <EmptyState
              icon="chat"
              title={t('home.forum.emptyTitle')}
              description={t('home.forum.emptyText')}
              action={<ButtonLink to={paths.forumNew}>{t('home.forum.create')}</ButtonLink>}
            />
          ) : (
            <ul className="grid gap-4 lg:grid-cols-3">
              {items.map((discussion) => (
                <li key={discussion.id}>
                  <DiscussionCard discussion={discussion} />
                </li>
              ))}
            </ul>
          )
        }
      </QueryBoundary>
    </HomeSection>
  )
}
