import { useParams } from 'react-router-dom'
import { Navigate } from '@/shared/i18n/router'
import Alert from '@/shared/components/Alert'
import ArticleSkeleton from '@/shared/components/ArticleSkeleton'
import Badge from '@/shared/components/Badge'
import Breadcrumbs from '@/shared/components/Breadcrumbs'
import ErrorState from '@/shared/components/ErrorState'
import Icon from '@/shared/components/Icon'
import JsonLd from '@/shared/components/JsonLd'
import NotFound from '@/shared/components/NotFound'
import Seo from '@/shared/components/Seo'
import Time from '@/shared/components/Time'
import UserText from '@/shared/components/UserText'
import { contractTypes, jobLevels, workModes } from '@/shared/config/catalogs'
import { paths } from '@/shared/config/paths'
import { parseIdSlug } from '@/shared/utils/slug'
import { excerpt } from '@/shared/utils/text'
import { isHttpUrl } from '@/shared/utils/url'
import SaveJobButton from '../components/SaveJobButton'
import { useJob } from '../hooks/useJob'
import { isExpired, postedAt } from '../utils/jobHelpers'
import { buildJobPostingData } from '../utils/structuredData'
import { useI18n } from '@/shared/i18n/useI18n'

function SummaryRow({ label, children }) {
  return (
    <div className="flex justify-between gap-4 border-b border-slate-100 py-3 last:border-b-0">
      <dt className="text-ink-muted">{label}</dt>
      <dd className="text-right font-medium text-ink">{children}</dd>
    </div>
  )
}

export default function JobDetailPage() {
  const { t } = useI18n()
  const { idSlug } = useParams()
  const { id, slug } = parseIdSlug(idSlug)
  const request = useJob(id)
  const job = request.data

  if (id === null || request.error?.status === 404) return <NotFound />
  if (request.error) {
    return (
      <div className="page-container page-section">
        <ErrorState error={request.error} title={t('jobs.detail.error')} onRetry={request.reload} />
      </div>
    )
  }
  if (!job) {
    return (
      <div className="page-container page-section">
        <ArticleSkeleton />
      </div>
    )
  }
  if (slug !== job.slug) return <Navigate to={paths.jobDetail(job)} replace />

  const path = paths.jobDetail(job)
  const expired = isExpired(job)
  const canApply = isHttpUrl(job.applyUrl)
  // Las ofertas importadas pertenecen a otra bolsa de empleo: no se indexan ni se marcan como JobPosting.
  const imported = Boolean(job.imported)

  return (
    <div className="page-container page-section">
      <Seo
        title={t('jobs.detail.seoTitle', { title: job.title, company: job.company })}
        description={t('jobs.detail.seoDescription', { title: job.title, company: job.company, location: job.location, summary: excerpt(job.description, 110) })}
        path={path}
        type="article"
        publishedTime={postedAt(job)}
        modifiedTime={job.updatedAt}
        robots={expired || imported ? 'noindex,follow' : 'index,follow'}
        translated={false}
      />
      {!expired && !imported && <JsonLd data={buildJobPostingData(job)} />}
      <Breadcrumbs
        items={[
          { label: t('jobs.breadcrumb'), to: paths.jobs },
          { label: excerpt(job.title, 60), to: path },
        ]}
      />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <article className="min-w-0 max-w-prose">
          <header>
            <div className="flex flex-wrap gap-2">
              <Badge tone={jobLevels.toneOf(job.level)}>{jobLevels.labelOf(job.level)}</Badge>
              <Badge tone={workModes.toneOf(job.workMode)}>{workModes.labelOf(job.workMode)}</Badge>
            </div>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
              {job.title}
            </h1>
            <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-lg text-ink-soft">
              <span className="inline-flex items-center gap-2">
                <Icon name="building" className="h-5 w-5 text-ink-muted" />
                {job.company}
              </span>
              <span className="inline-flex items-center gap-2">
                <Icon name="pin" className="h-5 w-5 text-ink-muted" />
                {job.location}
              </span>
            </p>
          </header>

          {imported && job.source && (
            <p className="mt-4 text-sm text-ink-muted">
              {t('jobs.detail.importedStart')}{' '}
              <strong className="font-semibold text-ink-soft">{job.source}</strong>. {t('jobs.detail.importedEnd')}
            </p>
          )}

          {expired && (
            <Alert variant="warning" className="mt-6" title={t('jobs.detail.expiredTitle')}>
              {t('jobs.detail.expired')}
            </Alert>
          )}

          <section aria-labelledby="job-description" className="mt-8">
            <h2 id="job-description" className="mb-4 text-xl font-bold text-ink">
              {t('jobs.detail.description')}
            </h2>
            <UserText className="text-lg leading-relaxed text-ink-soft">{job.description}</UserText>
          </section>

          {job.tags?.length > 0 && (
            <section aria-labelledby="job-tags" className="mt-8">
              <h2 id="job-tags" className="mb-3 text-xl font-bold text-ink">
                {t('jobs.detail.tags')}
              </h2>
              <ul className="flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <li key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-ink-soft">
                    {tag}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </article>

        <aside aria-labelledby="job-summary" className="lg:sticky lg:top-24 lg:self-start">
          <div className="card p-5">
            <h2 id="job-summary" className="text-lg font-bold text-ink">
              {t('jobs.detail.summary')}
            </h2>
            <dl className="mt-2">
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
            {canApply && !expired && (
              <a
                href={job.applyUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="btn btn-primary mt-4 w-full"
              >
                {imported ? t('jobs.detail.viewOriginal') : t('jobs.detail.apply')}
                <Icon name="external" className="h-4 w-4" />
                <span className="sr-only">{t('common.newTab')}</span>
              </a>
            )}
            <SaveJobButton job={job} className="mt-3" />
          </div>
        </aside>
      </div>
    </div>
  )
}
