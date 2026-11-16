import { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { Link, Navigate } from '@/shared/i18n/router'
import { useAuth } from '@/features/auth/hooks/useAuth'
import ArticleSkeleton from '@/shared/components/ArticleSkeleton'
import Breadcrumbs from '@/shared/components/Breadcrumbs'
import ButtonLink from '@/shared/components/ButtonLink'
import ErrorState from '@/shared/components/ErrorState'
import Eyebrow from '@/shared/components/Eyebrow'
import Icon from '@/shared/components/Icon'
import ListSkeleton from '@/shared/components/ListSkeleton'
import NotFound from '@/shared/components/NotFound'
import PageMain from '@/shared/components/PageMain'
import Pagination from '@/shared/components/Pagination'
import QueryBoundary from '@/shared/components/QueryBoundary'
import Seo from '@/shared/components/Seo'
import Time from '@/shared/components/Time'
import { DEFAULT_PAGE_SIZE } from '@/shared/api/params'
import { discussionCategories } from '@/shared/config/catalogs'
import { paths } from '@/shared/config/paths'
import { useListQuery } from '@/shared/hooks/useListQuery'
import { useRequest } from '@/shared/hooks/useRequest'
import { useI18n } from '@/shared/i18n/useI18n'
import { parseIdSlug } from '@/shared/utils/slug'
import { excerpt } from '@/shared/utils/text'
import ProfileCard from '../components/ProfileCard'
import { profileService } from '../services/profileService'

const LIST_BOX = 'divide-y divide-slate-200 overflow-hidden rounded-3xl border border-slate-200 bg-surface shadow-card'

/** Cuando no hay nada: una frase y la acción para empezar, dentro del mismo recuadro que tendría la lista. */
function EmptyRow({ text, action }) {
  return (
    <p className="flex flex-col items-start gap-4 rounded-3xl border border-dashed border-slate-300 bg-surface p-6 text-ink-muted sm:flex-row sm:items-center sm:justify-between">
      {text}
      {action}
    </p>
  )
}

function OwnDiscussions() {
  const { t } = useI18n()
  const { page, buildHref } = useListQuery()
  const request = useRequest(`profile:own:discussions:${page}`, ({ signal }) =>
    profileService.ownDiscussions({ page: page - 1, size: DEFAULT_PAGE_SIZE }, { signal }),
  )
  return (
    <section aria-labelledby="own-discussions" aria-busy={request.loading} className="mt-10">
      <h3 id="own-discussions" className="mb-4 text-lg font-bold text-ink">
        {t('profile.view.yourDiscussions')}
      </h3>
      <QueryBoundary data={request.data} error={request.error} onRetry={request.reload} skeleton={<ListSkeleton />}>
        {(result) =>
          result.content.length === 0 ? (
            <EmptyRow
              text={t('profile.view.noDiscussionsOwn')}
              action={
                <ButtonLink to={paths.forumNew} variant="secondary" className="shrink-0 rounded-full">
                  {t('profile.view.startDiscussion')}
                </ButtonLink>
              }
            />
          ) : (
            <>
              <ul className={LIST_BOX}>
                {result.content.map((discussion) => (
                  <li key={discussion.id} className="relative px-5 py-4 transition-colors hover:bg-canvas sm:px-6">
                    <Link
                      to={paths.discussionDetail(discussion)}
                      className="font-semibold text-ink after:absolute after:inset-0 hover:text-accent"
                    >
                      {discussion.title}
                    </Link>
                    <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-muted">
                      <span>{discussionCategories.labelOf(discussion.category)}</span>
                      <Time value={discussion.createdAt} />
                      <span className="inline-flex items-center gap-1">
                        <Icon name="chat" className="h-4 w-4" />
                        {t('profile.view.replies', { count: discussion.commentCount })}
                      </span>
                    </p>
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

function OwnTestimonials() {
  const { t } = useI18n()
  const request = useRequest('profile:own:testimonials', ({ signal }) => profileService.ownTestimonials({ signal }))
  return (
    <section aria-labelledby="own-testimonials" aria-busy={request.loading} className="mt-10">
      <h3 id="own-testimonials" className="mb-4 text-lg font-bold text-ink">
        {t('profile.view.yourTestimonials')}
      </h3>
      <QueryBoundary data={request.data} error={request.error} onRetry={request.reload} skeleton={<ListSkeleton />}>
        {(items) =>
          items.length === 0 ? (
            <EmptyRow
              text={t('profile.view.noTestimonialsOwn')}
              action={
                <ButtonLink to={paths.testimonials} variant="secondary" className="shrink-0 rounded-full">
                  {t('profile.view.shareTestimonial')}
                </ButtonLink>
              }
            />
          ) : (
            <ul className={LIST_BOX}>
              {items.map((testimonial) => (
                <li key={testimonial.id} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 px-5 py-4 sm:px-6">
                  <Icon name="star" className="mt-0.5 h-5 w-5 text-accent" />
                  <blockquote className="text-ink-soft">
                    <p>«{excerpt(testimonial.content, 180)}»</p>
                    {testimonial.isHighlighted && (
                      <footer className="mt-1 text-sm font-semibold text-accent">
                        {t('profile.view.highlighted')}
                      </footer>
                    )}
                  </blockquote>
                </li>
              ))}
            </ul>
          )
        }
      </QueryBoundary>
    </section>
  )
}

/** «Tu actividad»: solo existe en tu propio perfil. Nadie más puede ver lo que has hecho en la web. */
function OwnActivity({ profile, className }) {
  const { t } = useI18n()
  const stats = [
    { key: 'discussionCount', icon: 'chat' },
    { key: 'testimonialCount', icon: 'star' },
  ]
  return (
    <section aria-labelledby="own-activity" className={className}>
      <hgroup>
        <Eyebrow>{t('profile.view.activityEyebrow')}</Eyebrow>
        <h2 id="own-activity" className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          {t('profile.view.activityTitle')}
        </h2>
        <p className="mt-2 flex items-center gap-2 text-sm text-ink-muted">
          <Icon name="lock" className="h-4 w-4 shrink-0 text-accent" />
          {t('profile.view.activityNote')}
        </p>
      </hgroup>
      {/* Pares dato/valor: el nombre (oculto a la vista) y, en el recuadro, el número grande con su icono. */}
      <dl className="mt-6 grid grid-cols-2 gap-4">
        {stats.map((stat) => {
          const count = profile[stat.key] ?? 0
          const label = t(`profile.view.${stat.key}`, { count })
          return (
            <Fragment key={stat.key}>
              <dt className="sr-only">{label}</dt>
              <dd className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-surface p-5 shadow-card">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                  <Icon name={stat.icon} className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-2xl font-bold text-ink">{count}</span>
                  <span aria-hidden="true" className="text-sm text-ink-muted">
                    {label}
                  </span>
                </span>
              </dd>
            </Fragment>
          )
        })}
      </dl>
      <OwnDiscussions />
      <OwnTestimonials />
    </section>
  )
}

export default function ProfilePage() {
  const { t } = useI18n()
  const { idSlug } = useParams()
  const { id, slug } = parseIdSlug(idSlug)
  const { user } = useAuth()
  const isOwn = id !== null && user?.id === id
  // En tu perfil se pide el tuyo (con tus contadores de actividad); en el de otra persona, solo su perfil público.
  const request = useRequest(
    `profile:${id}:${isOwn ? 'own' : 'public'}`,
    ({ signal }) => (isOwn ? profileService.getOwn({ signal }) : profileService.getPublic(id, { signal })),
    { enabled: id !== null },
  )
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

  const path = paths.profile(profile)
  const card = (
    <ProfileCard
      profile={profile}
      headingId="profile-name"
      isOwn={isOwn}
      stacked={isOwn}
      action={
        isOwn && (
          <ButtonLink to={paths.profileEdit} variant="secondary" className="w-full rounded-full">
            <Icon name="pencil" className="h-4 w-4" />
            {t('profile.view.edit')}
          </ButtonLink>
        )
      }
      // En tu perfil, la tarjeta te acompaña al bajar por tu actividad.
      className={isOwn ? 'mt-4 lg:sticky lg:top-24 lg:col-start-1 lg:row-start-3 lg:self-start' : 'mt-4'}
    />
  )

  return (
    // Tu perfil: la tarjeta a la izquierda y tu actividad al lado. El de otra persona: solo su tarjeta, centrada.
    <PageMain
      className={
        isOwn
          ? 'page-container page-section relative isolate grid grid-cols-1 content-start items-start gap-x-12 lg:grid-cols-[24rem_minmax(0,1fr)] lg:grid-rows-[auto_auto_1fr]'
          : 'page-container page-section relative isolate mx-auto max-w-2xl'
      }
    >
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
      {isOwn ? (
        <>
          <Eyebrow className="mt-4 lg:col-start-1 lg:row-start-2">{t('profile.view.ownEyebrow')}</Eyebrow>
          {card}
          <OwnActivity profile={profile} className="mt-14 lg:col-start-2 lg:row-span-2 lg:row-start-2 lg:mt-4" />
        </>
      ) : (
        <>
          <Eyebrow className="mt-4">{t('profile.view.profileEyebrow')}</Eyebrow>
          {card}
        </>
      )}
    </PageMain>
  )
}
