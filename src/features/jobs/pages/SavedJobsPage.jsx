import { Navigate } from '@/shared/i18n/router'
import Breadcrumbs from '@/shared/components/Breadcrumbs'
import ButtonLink from '@/shared/components/ButtonLink'
import JobListSkeleton from '../components/JobListSkeleton'
import EmptyState from '@/shared/components/EmptyState'
import Eyebrow from '@/shared/components/Eyebrow'
import Icon from '@/shared/components/Icon'
import PageMain from '@/shared/components/PageMain'
import Pagination from '@/shared/components/Pagination'
import QueryBoundary from '@/shared/components/QueryBoundary'
import Seo from '@/shared/components/Seo'
import Time from '@/shared/components/Time'
import { DEFAULT_PAGE_SIZE } from '@/shared/api/params'
import { paths } from '@/shared/config/paths'
import { useListQuery } from '@/shared/hooks/useListQuery'
import { useRequest } from '@/shared/hooks/useRequest'
import { useI18n } from '@/shared/i18n/useI18n'
import CompanyMonogram from '../components/CompanyMonogram'
import JobCard from '../components/JobCard'
import { JOB_LIST_CLASSES } from '../components/JobList'
import SaveJobButton from '../components/SaveJobButton'
import { useSavedJobs } from '../hooks/useSavedJobs'
import { savedJobsService } from '../services/savedJobsService'

/** Oferta guardada que ya no está publicada: misma fila, apagada y sin enlace; solo se puede quitar de guardadas. */
function UnavailableJob({ job, note }) {
  const { t } = useI18n()
  return (
    <article className="job-row gap-y-1.5 px-5 py-5 sm:px-6">
      <CompanyMonogram name={job.company} muted className="[grid-area:logo]" />
      <h3 className="self-center text-base font-bold leading-snug text-ink-soft [grid-area:title] sm:text-lg">
        {job.title}
      </h3>
      <p className="truncate text-sm text-ink-muted [grid-area:company]">{job.company}</p>
      <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-ink-muted [grid-area:facts]">
        <Icon name="info" className="h-4 w-4" />
        {t('jobs.saved.unavailable')}
      </p>
      <SaveJobButton job={job} compact className="-mr-2 justify-self-end [grid-area:save]" />
      <p className="mt-2 text-xs text-ink-muted [grid-area:time] lg:mt-0 lg:self-start lg:text-right">{note}</p>
    </article>
  )
}

const TIPS = ['Read', 'Cv', 'Show', 'Ask']

/** Al lado de la lista: consejos breves para preparar la candidatura y un enlace para seguir buscando. */
function ApplyTips({ className }) {
  const { t } = useI18n()
  return (
    <aside aria-labelledby="saved-tips" className={className}>
      <hgroup>
        <Eyebrow>{t('jobs.saved.tipsEyebrow')}</Eyebrow>
        <h2 id="saved-tips" className="mt-3 text-2xl font-bold tracking-tight text-ink">
          {t('jobs.saved.tipsTitle')}
        </h2>
      </hgroup>
      <ul className="mt-5 space-y-4 rounded-3xl border border-slate-200 bg-surface p-6 shadow-card">
        {TIPS.map((tip) => (
          <li key={tip} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3">
            <Icon name="check" className="mt-0.5 h-5 w-5 text-accent" />
            <p className="text-sm leading-relaxed text-ink-soft">
              <strong className="block font-semibold text-ink">{t(`jobs.saved.tip${tip}Title`)}</strong>
              {t(`jobs.saved.tip${tip}Text`)}
            </p>
          </li>
        ))}
      </ul>
      <ButtonLink to={paths.jobs} size="lg" className="mt-5 w-full shadow-pop">
        {t('jobs.saved.more')}
        <Icon name="arrow-right" className="h-4 w-4" />
      </ButtonLink>
    </aside>
  )
}

export default function SavedJobsPage() {
  const { t } = useI18n()
  const { page, buildHref } = useListQuery()
  const { ready, isSaved } = useSavedJobs()
  const request = useRequest(`saved-jobs:${page}`, ({ signal }) =>
    savedJobsService.list({ page: page - 1, size: DEFAULT_PAGE_SIZE }, { signal }),
  )

  return (
    // Como el resto de páginas: cabecera arriba; a la izquierda, las ofertas; a la derecha, consejos para aplicar.
    <PageMain className="page-container page-section relative isolate grid grid-cols-1 content-start gap-x-12 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <span aria-hidden="true" className="bg-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-96" />
      <Seo title={t('jobs.saved.title')} path={paths.savedJobs} robots="noindex,nofollow" />
      <Breadcrumbs
        className="col-span-full"
        items={[
          { label: t('jobs.breadcrumb'), to: paths.jobs },
          { label: t('jobs.saved.title'), to: paths.savedJobs },
        ]}
      />
      <hgroup className="col-span-full mt-6 max-w-3xl">
        <Eyebrow>{t('jobs.saved.eyebrow')}</Eyebrow>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{t('jobs.saved.title')}</h1>
        <p className="mt-3 text-lg text-ink-muted">{t('jobs.saved.description')}</p>
      </hgroup>

      <section
        aria-labelledby="saved-list"
        aria-busy={request.loading}
        className="mt-10 min-w-0 lg:col-start-1 lg:row-start-3"
      >
        <hgroup className="mb-5">
          <Eyebrow>{t('jobs.saved.listEyebrow')}</Eyebrow>
          <h2 id="saved-list" className="mt-3 text-2xl font-bold tracking-tight text-ink">
            {t('jobs.saved.listTitle')}
          </h2>
        </hgroup>
        <QueryBoundary
          data={request.data}
          error={request.error}
          onRetry={request.reload}
          skeleton={<JobListSkeleton />}
          errorTitle={t('jobs.saved.error')}
        >
          {(result) => {
            if (result.totalPages > 0 && page > result.totalPages) {
              return <Navigate to={buildHref(result.totalPages)} replace />
            }
            // Las que el usuario quita en esta página desaparecen al momento; al volver se recarga la lista.
            const items = ready ? result.content.filter((item) => isSaved(item.job.id)) : result.content
            if (items.length === 0) {
              return (
                <EmptyState
                  icon="bookmark"
                  title={t('jobs.saved.emptyTitle')}
                  description={t('jobs.saved.empty')}
                  action={<ButtonLink to={paths.jobs}>{t('jobs.saved.browse')}</ButtonLink>}
                />
              )
            }
            return (
              <>
                <p role="status" className="mb-4 text-sm text-ink-muted">
                  {t('jobs.saved.count', { count: result.totalElements - (result.content.length - items.length) })}
                </p>
                <ul className={JOB_LIST_CLASSES}>
                  {items.map(({ job, available, savedAt }) => {
                    const note = (
                      <span>
                        {t('jobs.saved.savedOn')} <Time value={savedAt} format="short" />
                      </span>
                    )
                    return (
                      <li key={job.id}>
                        {available ? <JobCard job={job} note={note} /> : <UnavailableJob job={job} note={note} />}
                      </li>
                    )
                  })}
                </ul>
                <Pagination page={page} totalPages={result.totalPages} buildHref={buildHref} />
              </>
            )
          }}
        </QueryBoundary>
      </section>
      <ApplyTips className="mt-14 lg:sticky lg:top-24 lg:col-start-2 lg:row-start-3 lg:mt-10 lg:self-start" />
    </PageMain>
  )
}
