import { useParams } from 'react-router-dom'
import { Link, Navigate } from '@/shared/i18n/router'
import Alert from '@/shared/components/Alert'
import ArticleSkeleton from '@/shared/components/ArticleSkeleton'
import ActionMenu from '@/shared/components/ActionMenu'
import CopyLinkButton from '@/shared/components/CopyLinkButton'
import Breadcrumbs from '@/shared/components/Breadcrumbs'
import ErrorState from '@/shared/components/ErrorState'
import Icon from '@/shared/components/Icon'
import JsonLd from '@/shared/components/JsonLd'
import NotFound from '@/shared/components/NotFound'
import PageMain from '@/shared/components/PageMain'
import Seo from '@/shared/components/Seo'
import Time from '@/shared/components/Time'
import UserText from '@/shared/components/UserText'
import { contractTypes, jobLevels, workModes } from '@/shared/config/catalogs'
import { paths } from '@/shared/config/paths'
import { parseIdSlug } from '@/shared/utils/slug'
import { excerpt } from '@/shared/utils/text'
import { isHttpUrl } from '@/shared/utils/url'
import CompanyMonogram from '../components/CompanyMonogram'
import SaveJobButton from '../components/SaveJobButton'
import { useJob } from '../hooks/useJob'
import { isExpired, postedAt } from '../utils/jobHelpers'
import { buildJobPostingData } from '../utils/structuredData'
import { useI18n } from '@/shared/i18n/useI18n'

/** Un dato del resumen: término y valor de la lista de definiciones (la rejilla de <dl> los pone en fila). */
function SummaryRow({ label, children }) {
  return (
    <>
      <dt className="border-b border-slate-200 py-3 text-sm text-ink-muted">{label}</dt>
      <dd className="border-b border-slate-200 py-3 pl-4 text-right text-sm font-medium text-ink">{children}</dd>
    </>
  )
}

const LEVEL_ICONS = { INTERN: 'academic', JUNIOR: 'sparkles', MID: 'chart' }
const MODE_ICONS = { REMOTE: 'computer', HYBRID: 'refresh', ONSITE: 'building' }

export default function JobDetailPage() {
  const { t } = useI18n()
  const { idSlug } = useParams()
  const { id, slug } = parseIdSlug(idSlug)
  const request = useJob(id)
  const job = request.data

  if (id === null || request.error?.status === 404) return <NotFound />
  if (request.error) {
    return (
      <PageMain className="page-container page-section">
        <ErrorState error={request.error} title={t('jobs.detail.error')} onRetry={request.reload} />
      </PageMain>
    )
  }
  if (!job) {
    return (
      <PageMain className="page-container page-section" loading>
        <ArticleSkeleton />
      </PageMain>
    )
  }
  if (slug !== job.slug) return <Navigate to={paths.jobDetail(job)} replace />

  const path = paths.jobDetail(job)
  const expired = isExpired(job)
  const canApply = isHttpUrl(job.applyUrl)
  // Las ofertas importadas pertenecen a otra bolsa de empleo: no se indexan ni se marcan como JobPosting.
  const imported = Boolean(job.imported)

  // Rejilla del <main>: migas de pan arriba; la oferta y, al lado, su resumen (fijo al bajar en pantallas grandes).
  return (
    <PageMain className="page-container page-section relative isolate grid grid-cols-1 content-start gap-x-12 lg:grid-cols-[minmax(0,1fr)_22rem]">
      {/* Cuadrícula decorativa detrás de la cabecera, como en el resto de páginas. */}
      <span aria-hidden="true" className="bg-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-96" />
      <Seo
        title={t('jobs.detail.seoTitle', { title: job.title, company: job.company })}
        description={t('jobs.detail.seoDescription', {
          title: job.title,
          company: job.company,
          location: job.location,
          summary: excerpt(job.description, 110),
        })}
        path={path}
        type="article"
        publishedTime={postedAt(job)}
        modifiedTime={job.updatedAt}
        robots={expired || imported ? 'noindex,follow' : 'index,follow'}
        translated={false}
      />
      {!expired && !imported && <JsonLd data={buildJobPostingData(job)} />}
      <Breadcrumbs
        className="col-span-full"
        items={[
          { label: t('jobs.breadcrumb'), to: paths.jobs },
          { label: excerpt(job.title, 60), to: path },
        ]}
      />

      <article className="min-w-0 max-w-3xl">
        <header className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-5 gap-y-5">
          <CompanyMonogram name={job.company} className="h-16 w-16 rounded-2xl text-xl" />
          <p className="min-w-0 text-ink-soft">
            <span className="block truncate text-lg font-semibold text-ink">{job.company}</span>
            <span className="inline-flex items-center gap-1.5 text-sm text-ink-muted">
              <Icon name="pin" className="h-4 w-4" />
              {job.location}
            </span>
          </p>
          <h1 className="col-span-full text-balance text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl">
            {job.title}
          </h1>
          {/* Nivel, modalidad y jornada: sobrios, con icono, como en la lista de ofertas. */}
          <dl className="col-span-full flex flex-wrap items-center gap-x-5 gap-y-2 text-ink-soft">
            <dt className="sr-only">{t('jobs.detail.level')}</dt>
            <dd className="inline-flex items-center gap-2">
              <Icon name={LEVEL_ICONS[job.level] ?? 'sparkles'} className="h-5 w-5 text-accent" />
              {jobLevels.labelOf(job.level)}
            </dd>
            <dt className="sr-only">{t('jobs.detail.workMode')}</dt>
            <dd className="inline-flex items-center gap-2">
              <Icon name={MODE_ICONS[job.workMode] ?? 'building'} className="h-5 w-5 text-accent" />
              {workModes.labelOf(job.workMode)}
            </dd>
            {job.contractType && (
              <>
                <dt className="sr-only">{t('jobs.detail.contract')}</dt>
                <dd className="inline-flex items-center gap-2">
                  <Icon name="clock" className="h-5 w-5 text-accent" />
                  {contractTypes.labelOf(job.contractType)}
                </dd>
              </>
            )}
          </dl>
        </header>

        {imported && job.source && (
          <p className="mt-6 flex items-start gap-3 rounded-2xl bg-accent-soft px-4 py-3 text-sm text-ink-soft">
            <Icon name="info" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span>
              {t('jobs.detail.importedStart')} <strong className="font-semibold text-ink">{job.source}</strong>.{' '}
              {t('jobs.detail.importedEnd')}
            </span>
          </p>
        )}

        {expired && (
          <Alert variant="warning" className="mt-6" title={t('jobs.detail.expiredTitle')}>
            {t('jobs.detail.expired')}
          </Alert>
        )}

        <section aria-labelledby="job-description" className="mt-12">
          <h2 id="job-description" className="mb-5 text-2xl font-bold tracking-tight text-ink">
            {t('jobs.detail.description')}
          </h2>
          <UserText className="text-lg leading-8 text-ink-soft">{job.description}</UserText>
        </section>

        {job.tags?.length > 0 && (
          <section aria-labelledby="job-tags" className="mt-12">
            <h2 id="job-tags" className="mb-4 text-2xl font-bold tracking-tight text-ink">
              {t('jobs.detail.tags')}
            </h2>
            <ul className="flex flex-wrap gap-2">
              {job.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-lg border border-slate-200 bg-surface px-3 py-1.5 text-sm font-medium text-ink-soft"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </section>
        )}

        <footer className="mt-12 flex flex-wrap items-center justify-end gap-3 border-t border-slate-200 pt-6">
          <ActionMenu className="flex-wrap gap-3">
            <Link
              to={paths.jobs}
              className="inline-flex min-h-[2.75rem] items-center gap-2 rounded-full px-4 text-sm font-medium text-ink-soft transition-colors hover:bg-slate-100 hover:text-ink"
            >
              <Icon name="arrow-left" className="h-4 w-4" />
              {t('jobs.detail.back')}
            </Link>
            <CopyLinkButton />
          </ActionMenu>
        </footer>
      </article>

      {/* Resumen: cabecera con el degradado de la marca (como las normas del foro), los datos y el botón grande. */}
      <aside
        aria-labelledby="job-summary"
        className="mt-12 overflow-hidden rounded-3xl border border-slate-200 bg-surface shadow-card lg:sticky lg:top-24 lg:mt-0 lg:self-start"
      >
        <header className="relative isolate overflow-hidden bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 px-6 py-5 text-white">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -top-10 -z-10 h-32 w-32 rounded-full bg-brand-400/30 blur-2xl"
          />
          <h2 id="job-summary" className="text-lg font-bold">
            {t('jobs.detail.summary')}
          </h2>
        </header>
        <dl className="mx-6 mt-2 grid grid-cols-[auto_minmax(0,1fr)] [&>*:nth-last-child(-n+2)]:border-b-0">
          <SummaryRow label={t('jobs.detail.company')}>{job.company}</SummaryRow>
          <SummaryRow label={t('jobs.detail.location')}>{job.location}</SummaryRow>
          <SummaryRow label={t('jobs.detail.workMode')}>{workModes.labelOf(job.workMode)}</SummaryRow>
          <SummaryRow label={t('jobs.detail.level')}>{jobLevels.labelOf(job.level)}</SummaryRow>
          <SummaryRow label={t('jobs.detail.contract')}>{contractTypes.labelOf(job.contractType)}</SummaryRow>
          <SummaryRow label={t('jobs.detail.posted')}>
            <Time value={postedAt(job)} />
          </SummaryRow>
          {job.expiresAt && (
            <SummaryRow label={t('jobs.detail.validUntil')}>
              <Time value={job.expiresAt} />
            </SummaryRow>
          )}
          {job.source && <SummaryRow label={t('jobs.detail.source')}>{job.source}</SummaryRow>}
        </dl>
        <ActionMenu className="mx-6 mb-6 mt-4 flex-col gap-3">
          {canApply && !expired && (
            <a
              href={job.applyUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="btn btn-primary btn-lg w-full shadow-pop"
            >
              {imported ? t('jobs.detail.viewOriginal') : t('jobs.detail.apply')}
              <Icon name="external" className="h-4 w-4" />
              <span className="sr-only">{t('common.newTab')}</span>
            </a>
          )}
          <SaveJobButton job={job} className="w-full rounded-full" />
        </ActionMenu>
      </aside>
    </PageMain>
  )
}
