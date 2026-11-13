import { useParams } from 'react-router-dom'
import { Link, Navigate } from '@/shared/i18n/router'
import Alert from '@/shared/components/Alert'
import ArticleSkeleton from '@/shared/components/ArticleSkeleton'
import ActionMenu from '@/shared/components/ActionMenu'
import CopyLinkButton from '@/shared/components/CopyLinkButton'
import Eyebrow from '@/shared/components/Eyebrow'
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

      {/*
        Como en el detalle de noticia: el antetítulo (con su punto), el título y los datos de la oferta van encima; la
        tarjeta lleva solo la oferta. El artículo toma el nombre del título (aria-labelledby).
      */}
      <header className="mt-6 min-w-0 lg:col-start-1">
        <Eyebrow>{jobLevels.labelOf(job.level)}</Eyebrow>
        <h1
          id="job-title"
          className="mt-3 text-balance text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl"
        >
          {job.title}
        </h1>
        <p className="mt-5 flex items-center gap-3 text-ink-soft">
          <CompanyMonogram name={job.company} className="h-10 w-10 rounded-lg text-sm" />
          <span className="min-w-0">
            <span className="block truncate font-semibold text-ink">{job.company}</span>
            <span className="inline-flex items-center gap-1.5 text-sm text-ink-muted">
              <Icon name="pin" className="h-4 w-4" />
              {job.location}
            </span>
          </span>
        </p>
        {/* Modalidad y jornada: sobrias, con icono, como en la lista de ofertas (el nivel ya va en el antetítulo). */}
        <dl className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-soft">
          <dt className="sr-only">{t('jobs.detail.workMode')}</dt>
          <dd className="inline-flex items-center gap-2">
            <Icon name={MODE_ICONS[job.workMode] ?? 'building'} className="h-4 w-4 text-accent" />
            {workModes.labelOf(job.workMode)}
          </dd>
          {job.contractType && (
            <>
              <dt className="sr-only">{t('jobs.detail.contract')}</dt>
              <dd className="inline-flex items-center gap-2">
                <Icon name="clock" className="h-4 w-4 text-accent" />
                {contractTypes.labelOf(job.contractType)}
              </dd>
            </>
          )}
        </dl>
      </header>

      <article
        aria-labelledby="job-title"
        className="mt-8 min-w-0 rounded-3xl border border-slate-200 bg-surface p-6 shadow-card sm:p-8 lg:col-start-1"
      >
        {imported && job.source && (
          <p className="mb-8 flex items-start gap-3 rounded-2xl bg-accent-soft px-4 py-3 text-sm text-ink-soft">
            <Icon name="info" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span>
              {t('jobs.detail.importedStart')} <strong className="font-semibold text-ink">{job.source}</strong>.{' '}
              {t('jobs.detail.importedEnd')}
            </span>
          </p>
        )}

        {expired && (
          <Alert variant="warning" className="mb-8" title={t('jobs.detail.expiredTitle')}>
            {t('jobs.detail.expired')}
          </Alert>
        )}

        <section aria-labelledby="job-description">
          <h2 id="job-description" className="mb-4 text-xl font-bold tracking-tight text-ink">
            {t('jobs.detail.description')}
          </h2>
          <UserText className="leading-7 text-ink-soft">{job.description}</UserText>
        </section>

        {job.tags?.length > 0 && (
          <section aria-labelledby="job-tags" className="mt-10">
            <h2 id="job-tags" className="mb-4 text-xl font-bold tracking-tight text-ink">
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

        <footer className="mt-10 flex flex-wrap items-center justify-end gap-3 border-t border-slate-200 pt-5">
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

      {/* Resumen: antetítulo y título fuera, como siempre; el recuadro lleva los datos y los botones. */}
      <aside
        aria-labelledby="job-summary"
        className="mt-12 lg:sticky lg:top-24 lg:col-start-2 lg:row-span-2 lg:row-start-2 lg:mt-6 lg:self-start"
      >
        <hgroup>
          <Eyebrow>{t('jobs.detail.summaryEyebrow')}</Eyebrow>
          <h2 id="job-summary" className="mt-3 text-2xl font-bold tracking-tight text-ink">
            {t('jobs.detail.summary')}
          </h2>
        </hgroup>
        <dl className="mt-5 grid grid-cols-[auto_minmax(0,1fr)] rounded-t-3xl border border-b-0 border-slate-200 bg-surface px-6 pt-2 shadow-card [&>*:nth-last-child(-n+2)]:border-b-0">
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
        {/* Los botones cierran el mismo recuadro que los datos (la lista y el menú comparten el borde). */}
        <ActionMenu className="flex-col gap-3 rounded-b-3xl border border-t-0 border-slate-200 bg-surface px-6 pb-6 pt-4 shadow-card">
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
