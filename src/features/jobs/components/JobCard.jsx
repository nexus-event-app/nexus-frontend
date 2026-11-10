import { Link } from '@/shared/i18n/router'
import Badge from '@/shared/components/Badge'
import Icon from '@/shared/components/Icon'
import Time from '@/shared/components/Time'
import { contractTypes, jobLevels, workModes } from '@/shared/config/catalogs'
import { paths } from '@/shared/config/paths'
import { postedAt } from '../utils/jobHelpers'
import SaveJobButton from './SaveJobButton'
import { useI18n } from '@/shared/i18n/useI18n'

export default function JobCard({ job, headingLevel = 'h3' }) {
  const { t } = useI18n()
  const Heading = headingLevel

  return (
    <article className="card relative flex h-full flex-col p-5 transition-shadow hover:shadow-pop has-[a:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-600">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-x-3">
        <p className="flex flex-wrap gap-2">
          <Badge tone={jobLevels.toneOf(job.level)}>{jobLevels.labelOf(job.level)}</Badge>
          <Badge tone={workModes.toneOf(job.workMode)}>{workModes.labelOf(job.workMode)}</Badge>
        </p>
        <SaveJobButton job={job} compact className="-mr-2 -mt-2" />
        <Heading className="col-span-2 mt-1 line-clamp-2 min-h-[2lh] text-lg font-bold leading-snug text-ink">
          <Link
            to={paths.jobDetail(job)}
            className="after:absolute after:inset-0 hover:text-accent focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            {job.title}
          </Link>
        </Heading>
      </header>
      <p className="mt-2 flex items-center gap-2 font-medium text-ink-soft">
        <Icon name="building" className="h-4 w-4 shrink-0 text-ink-muted" />
        <span className="truncate">{job.company}</span>
      </p>
      <p className="mt-1 flex items-center gap-2 text-ink-muted">
        <Icon name="pin" className="h-4 w-4 shrink-0" />
        <span className="truncate">{job.location}</span>
      </p>
      <p className="mt-1 text-sm text-ink-muted">{contractTypes.labelOf(job.contractType)}</p>
      {/* Siempre dos filas de etiquetas (aunque haya menos), para que todas las tarjetas midan lo mismo. */}
      <ul
        className="mt-4 flex h-[2.875rem] flex-wrap content-start gap-1.5 overflow-hidden"
        aria-label={job.tags?.length ? t('jobs.card.technologies') : undefined}
        aria-hidden={job.tags?.length ? undefined : true}
      >
        {(job.tags ?? []).slice(0, 5).map((tag) => (
          <li key={tag} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-ink-soft">
            {tag}
          </li>
        ))}
      </ul>
      <p className="mt-auto line-clamp-2 min-h-[calc(2lh+1rem)] pt-4 text-sm text-ink-muted">
        {t('jobs.card.postedOn')} <Time value={postedAt(job)} format="short" />
        {job.imported && job.source && <> · {t('jobs.card.via', { source: job.source })}</>}
      </p>
    </article>
  )
}
