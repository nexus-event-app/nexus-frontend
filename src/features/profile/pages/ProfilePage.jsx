import { useParams } from 'react-router-dom'
import { Navigate } from '@/shared/i18n/router'
import { useAuth } from '@/features/auth/hooks/useAuth'
import DiscussionCard from '@/features/forum/components/DiscussionCard'
import TestimonialGrid from '@/features/testimonials/components/TestimonialGrid'
import ArticleSkeleton from '@/shared/components/ArticleSkeleton'
import Breadcrumbs from '@/shared/components/Breadcrumbs'
import Eyebrow from '@/shared/components/Eyebrow'
import ButtonLink from '@/shared/components/ButtonLink'
import EmptyState from '@/shared/components/EmptyState'
import ErrorState from '@/shared/components/ErrorState'
import ListSkeleton from '@/shared/components/ListSkeleton'
import NotFound from '@/shared/components/NotFound'
import PageMain from '@/shared/components/PageMain'
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
import { cx } from '@/shared/utils/classNames'
import ProfileAbout from '../components/ProfileAbout'
import ProfileHeader from '../components/ProfileHeader'
import { profileService } from '../services/profileService'

function isIncomplete(profile) {
  return !profile.avatarUrl && !profile.bio && !profile.headline && profile.technologies.length === 0
}

function Discussions({ profile, isOwn, className }) {
  const { t } = useI18n()
  const { page, buildHref } = useListQuery()
  const request = useRequest(`profile:${profile.id}:discussions:${page}`, ({ signal }) =>
    profileService.discussions(profile.id, { page: page - 1, size: DEFAULT_PAGE_SIZE }, { signal }),
  )
  return (
    <section aria-labelledby="profile-discussions" aria-busy={request.loading} className={className}>
      <hgroup className="mb-6">
        <Eyebrow>{t('profile.view.discussionsEyebrow')}</Eyebrow>
        <h2 id="profile-discussions" className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          {t('profile.view.discussionsTitle')}
        </h2>
      </hgroup>
      <QueryBoundary data={request.data} error={request.error} onRetry={request.reload} skeleton={<ListSkeleton />}>
        {(result) =>
          result.content.length === 0 ? (
            <EmptyState
              icon="chat"
              title={
                isOwn ? t('profile.view.noDiscussionsOwn') : t('profile.view.noDiscussions', { name: profile.name })
              }
              action={isOwn && <ButtonLink to={paths.forumNew}>{t('profile.view.startDiscussion')}</ButtonLink>}
            />
          ) : (
            <>
              <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
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

function Testimonials({ profile, isOwn, className }) {
  const { t } = useI18n()
  const request = useRequest(`profile:${profile.id}:testimonials`, ({ signal }) =>
    profileService.testimonials(profile.id, { signal }),
  )
  if (!isOwn && request.data?.length === 0) return null
  return (
    <section aria-labelledby="profile-testimonials" aria-busy={request.loading} className={className}>
      <hgroup className="mb-6">
        <Eyebrow>{t('profile.view.testimonialsEyebrow')}</Eyebrow>
        <h2 id="profile-testimonials" className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          {t('profile.view.testimonialsTitle')}
        </h2>
      </hgroup>
      <QueryBoundary data={request.data} error={request.error} onRetry={request.reload} skeleton={<ListSkeleton />}>
        {(items) =>
          items.length === 0 ? (
            <EmptyState
              icon="star"
              title={t('profile.view.noTestimonialsOwn')}
              action={
                <ButtonLink to={paths.testimonials} variant="secondary">
                  {t('profile.view.shareTestimonial')}
                </ButtonLink>
              }
            />
          ) : (
            <TestimonialGrid items={items} linkAuthors={false} compact columns={2} />
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
      <PageMain className="page-container page-section">
        <ErrorState error={request.error} title={t('profile.view.error')} onRetry={request.reload} />
      </PageMain>
    )
  }
  if (!profile) {
    return (
      <PageMain className="page-container page-section" loading>
        <ArticleSkeleton />
      </PageMain>
    )
  }
  if (slug !== profile.slug) return <Navigate to={paths.profile(profile)} replace />

  const isOwn = user?.id === profile.id
  // Filas de la rejilla: migas, cabecera, aviso de completar el perfil (si toca) y, después, los apartados.
  const showComplete = isOwn && isIncomplete(profile)
  const path = paths.profile(profile)

  return (
    // Como en el resto de páginas: la cabecera arriba; a la izquierda, sus discusiones y testimonios; a la derecha,
    // «Sobre…». Detrás, la cuadrícula suave de la web.
    <PageMain className="page-container page-section relative isolate grid grid-cols-1 content-start gap-x-12 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <span aria-hidden="true" className="bg-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-96" />
      {/* Los perfiles son de personas: no se indexan en buscadores. */}
      <Seo
        title={t('profile.view.seoTitle', { name: profile.name })}
        description={
          profile.headline ||
          excerpt(profile.bio ?? '', 150) ||
          t('profile.view.seoDescription', { name: profile.name })
        }
        path={path}
        type="profile"
        robots="noindex,follow"
        translated={false}
      />
      <Breadcrumbs
        className="col-span-full"
        items={[
          { label: t('forum.breadcrumb'), to: paths.forum },
          { label: profile.name, to: path },
        ]}
      />
      <ProfileHeader
        profile={profile}
        isOwn={isOwn}
        className="col-span-full mt-6 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-6 gap-y-4 sm:grid-cols-[auto_minmax(0,1fr)_auto]"
      />
      {showComplete && (
        <p className="col-span-full mt-8 flex flex-col gap-4 rounded-3xl border border-dashed border-accent-line bg-accent-soft px-6 py-5 text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <span>
            <strong className="block font-semibold text-ink">{t('profile.view.completeTitle')}</strong>
            <span className="mt-1 block text-sm">{t('profile.view.completeText')}</span>
          </span>
          <ButtonLink to={paths.profileEdit} className="shrink-0 rounded-full">
            {t('profile.view.completeAction')}
          </ButtonLink>
        </p>
      )}
      <ProfileAbout
        profile={profile}
        isOwn={isOwn}
        headingClassName={cx('mt-14 lg:col-start-2', showComplete ? 'lg:row-start-4' : 'lg:row-start-3')}
        className="mt-5 lg:col-start-2"
      />
      <Discussions
        profile={profile}
        isOwn={isOwn}
        className={cx('mt-14 lg:col-start-1 lg:row-span-2', showComplete ? 'lg:row-start-4' : 'lg:row-start-3')}
      />
      <Testimonials profile={profile} isOwn={isOwn} className="mt-14 lg:col-start-1" />
    </PageMain>
  )
}
