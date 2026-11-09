import { useParams } from 'react-router-dom'
import { Navigate } from '@/shared/i18n/router'
import { useAuth } from '@/features/auth/hooks/useAuth'
import DiscussionCard from '@/features/forum/components/DiscussionCard'
import TestimonialGrid from '@/features/testimonials/components/TestimonialGrid'
import ArticleSkeleton from '@/shared/components/ArticleSkeleton'
import Breadcrumbs from '@/shared/components/Breadcrumbs'
import ButtonLink from '@/shared/components/ButtonLink'
import EmptyState from '@/shared/components/EmptyState'
import ErrorState from '@/shared/components/ErrorState'
import ListSkeleton from '@/shared/components/ListSkeleton'
import NotFound from '@/shared/components/NotFound'
import Pagination from '@/shared/components/Pagination'
import QueryBoundary from '@/shared/components/QueryBoundary'
import Seo from '@/shared/components/Seo'
import { DEFAULT_PAGE_SIZE } from '@/shared/api/params'
import { paths } from '@/shared/config/paths'
import { useListQuery } from '@/shared/hooks/useListQuery'
import { useRequest } from '@/shared/hooks/useRequest'
import { useI18n } from '@/shared/i18n/useI18n'
import { parseIdSlug } from '@/shared/utils/slug'
import { excerpt } from '@/shared/utils/text'
import ProfileHeader from '../components/ProfileHeader'
import { profileService } from '../services/profileService'

function isIncomplete(profile) {
  return !profile.avatarUrl && !profile.bio && !profile.headline && profile.technologies.length === 0
}

function Discussions({ profile, isOwn }) {
  const { t } = useI18n()
  const { page, buildHref } = useListQuery()
  const request = useRequest(`profile:${profile.id}:discussions:${page}`, ({ signal }) =>
    profileService.discussions(profile.id, { page: page - 1, size: DEFAULT_PAGE_SIZE }, { signal }),
  )
  return (
    <section aria-labelledby="profile-discussions" aria-busy={request.loading}>
      <h2 id="profile-discussions" className="mb-4 text-2xl font-bold text-ink">
        {t('profile.view.discussionsTitle')}
      </h2>
      <QueryBoundary data={request.data} error={request.error} onRetry={request.reload} skeleton={<ListSkeleton />}>
        {(result) =>
          result.content.length === 0 ? (
            <EmptyState
              icon="chat"
              title={isOwn ? t('profile.view.noDiscussionsOwn') : t('profile.view.noDiscussions', { name: profile.name })}
              action={isOwn && <ButtonLink to={paths.forumNew}>{t('profile.view.startDiscussion')}</ButtonLink>}
            />
          ) : (
            <>
              <ul className="space-y-4">
                {result.content.map((discussion) => (
                  <li key={discussion.id}>
                    <DiscussionCard discussion={discussion} />
                  </li>
                ))}
              </ul>
              <Pagination page={page} totalPages={result.totalPages} buildHref={buildHref} />
            </>
          )
        }
      </QueryBoundary>
    </section>
  )
}

function Testimonials({ profile, isOwn }) {
  const { t } = useI18n()
  const request = useRequest(`profile:${profile.id}:testimonials`, ({ signal }) =>
    profileService.testimonials(profile.id, { signal }),
  )
  if (!isOwn && request.data?.length === 0) return null
  return (
    <section aria-labelledby="profile-testimonials" aria-busy={request.loading}>
      <h2 id="profile-testimonials" className="mb-4 text-2xl font-bold text-ink">
        {t('profile.view.testimonialsTitle')}
      </h2>
      <QueryBoundary data={request.data} error={request.error} onRetry={request.reload} skeleton={<ListSkeleton />}>
        {(items) =>
          items.length === 0 ? (
            <EmptyState
              icon="star"
              title={t('profile.view.noTestimonialsOwn')}
              action={<ButtonLink to={paths.testimonials} variant="secondary">{t('profile.view.shareTestimonial')}</ButtonLink>}
            />
          ) : (
            <TestimonialGrid items={items} linkAuthors={false} />
          )
        }
      </QueryBoundary>
    </section>
  )
}

export default function ProfilePage() {
  const { t } = useI18n()
  const { idSlug } = useParams()
  const { id, slug } = parseIdSlug(idSlug)
  const { user } = useAuth()
  const request = useRequest(`profile:${id}`, ({ signal }) => profileService.getPublic(id, { signal }), {
    enabled: id !== null,
  })
  const profile = request.data

  if (id === null || request.error?.status === 404) return <NotFound />
  if (request.error) {
    return (
      <div className="page-container page-section">
        <ErrorState error={request.error} title={t('profile.view.error')} onRetry={request.reload} />
      </div>
    )
  }
  if (!profile) {
    return (
      <div className="page-container page-section">
        <ArticleSkeleton />
      </div>
    )
  }
  if (slug !== profile.slug) return <Navigate to={paths.profile(profile)} replace />

  const isOwn = user?.id === profile.id
  const path = paths.profile(profile)

  return (
    <div className="page-container page-section">
      {/* Los perfiles son de personas: no se indexan en buscadores. */}
      <Seo
        title={t('profile.view.seoTitle', { name: profile.name })}
        description={profile.headline || excerpt(profile.bio ?? '', 150) || t('profile.view.seoDescription', { name: profile.name })}
        path={path}
        type="profile"
        robots="noindex,follow"
        translated={false}
      />
      <Breadcrumbs
        items={[
          { label: t('forum.breadcrumb'), to: paths.forum },
          { label: profile.name, to: path },
        ]}
      />
      <div className="mx-auto max-w-4xl space-y-12">
        <ProfileHeader profile={profile} isOwn={isOwn} />
        {isOwn && isIncomplete(profile) && (
          <div className="flex flex-col gap-4 rounded-card border border-dashed border-accent-line bg-accent-soft/60 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-ink">{t('profile.view.completeTitle')}</p>
              <p className="mt-1 text-sm text-ink-soft">{t('profile.view.completeText')}</p>
            </div>
            <ButtonLink to={paths.profileEdit} className="shrink-0">
              {t('profile.view.completeAction')}
            </ButtonLink>
          </div>
        )}
        <Discussions profile={profile} isOwn={isOwn} />
        <Testimonials profile={profile} isOwn={isOwn} />
      </div>
    </div>
  )
}
