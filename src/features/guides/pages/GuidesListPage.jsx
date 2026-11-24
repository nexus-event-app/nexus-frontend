import { Link } from '@/shared/i18n/router'
import Breadcrumbs from '@/shared/components/Breadcrumbs'
import ButtonLink from '@/shared/components/ButtonLink'
import EmptyState from '@/shared/components/EmptyState'
import ErrorState from '@/shared/components/ErrorState'
import Eyebrow from '@/shared/components/Eyebrow'
import Icon from '@/shared/components/Icon'
import PageMain from '@/shared/components/PageMain'
import Seo from '@/shared/components/Seo'
import Time from '@/shared/components/Time'
import { paths } from '@/shared/config/paths'
import { useRequest } from '@/shared/hooks/useRequest'
import { useI18n } from '@/shared/i18n/useI18n'
import { guidesService } from '../services/guidesService'

function GuideCard({ guide }) {
  const { t } = useI18n()
  return (
    <article className="group relative flex h-full flex-col rounded-3xl border border-slate-200 bg-surface p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent-line hover:shadow-pop">
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-soft text-accent">
        <Icon name="document" className="h-5 w-5" />
      </span>
      <h2 className="mt-4 text-xl font-bold leading-snug text-ink">
        <Link
          to={paths.guideDetail(guide)}
          className="after:absolute after:inset-0 after:rounded-3xl after:content-[''] group-hover:text-accent"
        >
          {guide.title}
        </Link>
      </h2>
      <p className="mt-3 leading-relaxed text-ink-muted">{guide.description}</p>
      <footer className="mt-auto flex items-center justify-between gap-3 pt-6 text-sm">
        <Time value={guide.publishedAt} className="text-ink-muted" />
        <span
          aria-hidden="true"
          className="pointer-events-none inline-flex items-center gap-2 font-semibold text-accent"
        >
          {t('guides.read')}
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft transition-colors group-hover:bg-brand-600 group-hover:text-white">
            <Icon name="arrow-right" className="h-4 w-4" />
          </span>
        </span>
      </footer>
    </article>
  )
}

export default function GuidesListPage() {
  const { t } = useI18n()
  const request = useRequest('guides:list', ({ signal }) => guidesService.list({ signal }))
  const guides = request.data ?? []

  return (
    <PageMain loading={request.loading} className="page-container page-section relative isolate">
      <Seo title={t('guides.seoTitle')} description={t('guides.seoDescription')} path={paths.guides} />
      <span aria-hidden="true" className="bg-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-96" />
      <Breadcrumbs items={[{ label: t('guides.breadcrumb'), to: paths.guides }]} />

      <hgroup className="mt-6 max-w-3xl">
        <Eyebrow>{t('guides.eyebrow')}</Eyebrow>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl">{t('guides.title')}</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-muted">{t('guides.intro')}</p>
      </hgroup>

      {request.error ? (
        <ErrorState className="mt-10" error={request.error} title={t('guides.listError')} onRetry={request.reload} />
      ) : request.loading && !request.data ? null : guides.length === 0 ? (
        <section aria-label={t('guides.listLabel')} className="mt-10">
          <EmptyState
            icon="document"
            title={t('guides.emptyTitle')}
            description={t('guides.emptyText')}
            action={<ButtonLink to={paths.forum}>{t('guides.goToForum')}</ButtonLink>}
          />
        </section>
      ) : (
        <ul aria-label={t('guides.listLabel')} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <li key={guide.id}>
              <GuideCard guide={guide} />
            </li>
          ))}
        </ul>
      )}
    </PageMain>
  )
}
