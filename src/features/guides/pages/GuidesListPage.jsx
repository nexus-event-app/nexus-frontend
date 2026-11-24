import { Link } from '@/shared/i18n/router'
import Breadcrumbs from '@/shared/components/Breadcrumbs'
import ButtonLink from '@/shared/components/ButtonLink'
import EmptyState from '@/shared/components/EmptyState'
import ErrorState from '@/shared/components/ErrorState'
import Eyebrow from '@/shared/components/Eyebrow'
import Icon from '@/shared/components/Icon'
import Illustration from '@/shared/components/Illustration'
import PageMain from '@/shared/components/PageMain'
import Seo from '@/shared/components/Seo'
import Time from '@/shared/components/Time'
import { illustrations } from '@/shared/config/illustrations'
import { paths } from '@/shared/config/paths'
import { useRequest } from '@/shared/hooks/useRequest'
import { useI18n } from '@/shared/i18n/useI18n'
import { guidesService } from '../services/guidesService'

function GuideCard({ guide, number }) {
  const { t } = useI18n()
  const label = String(number).padStart(2, '0')
  return (
    <article className="group relative isolate flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent-line hover:shadow-pop">
      <header className="flex items-center gap-3 bg-gradient-to-r from-brand-600 via-brand-700 to-violet-700 px-5 py-3 text-white">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/90" />
        </span>
        <span aria-hidden="true" className="font-mono text-xs text-white/90">
          guia-{label}.md
        </span>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold">
          <Icon name="clock" className="h-3.5 w-3.5" />
          {t('guides.readingTime', { count: guide.readingMinutes ?? 1 })}
        </span>
      </header>
      <span
        aria-hidden="true"
        data-number={label}
        className="pointer-events-none absolute -bottom-6 right-3 -z-10 select-none font-mono text-[7rem] font-bold leading-none text-accent/10 transition-colors before:content-[attr(data-number)] group-hover:text-accent/15"
      />
      <section className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-2 font-mono text-xs text-ink-muted">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-gradient-to-br from-brand-500 to-violet-500" />
          <Time value={guide.publishedAt} />
        </p>
        <h2 className="mt-3 text-xl font-bold leading-snug text-ink">
          <Link
            to={paths.guideDetail(guide)}
            className="after:absolute after:inset-0 after:rounded-3xl after:content-[''] group-hover:text-accent"
          >
            {guide.title}
          </Link>
        </h2>
        <p className="mt-3 leading-relaxed text-ink-muted">{guide.description}</p>
        <p
          aria-hidden="true"
          className="pointer-events-none mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-accent"
        >
          {t('guides.read')}
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft transition-all duration-300 group-hover:translate-x-1 group-hover:bg-brand-600 group-hover:text-white">
            <Icon name="arrow-right" className="h-4 w-4" />
          </span>
        </p>
      </section>
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

      <header className="mt-6 grid items-center gap-x-10 gap-y-8 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <hgroup className="max-w-3xl">
          <Eyebrow>{t('guides.eyebrow')}</Eyebrow>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl">{t('guides.title')}</h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">{t('guides.intro')}</p>
        </hgroup>
        <Illustration {...illustrations.guides} className="hidden lg:block" />
      </header>

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
          {guides.map((guide, index) => (
            <li key={guide.id}>
              <GuideCard guide={guide} number={guides.length - index} />
            </li>
          ))}
        </ul>
      )}
    </PageMain>
  )
}
