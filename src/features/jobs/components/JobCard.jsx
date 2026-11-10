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
        <Heading className="col-span-2 mt-1 text-lg font-bold leading-snug text-ink">
          <Link
            to={paths.jobDetail(job)}
            className="after:absolute after:inset-0 hover:text-accent focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            {job.title}
          </Link>
        </Heading>
      </header>
      <p className="mt-2 flex items-center gap-2 font-medium text-ink-soft">
        <Icon name="building" className="h-4 w-4 text-ink-muted" />
        {job.company}
      </p>
      <p className="mt-1 flex items-center gap-2 text-ink-muted">
        <Icon name="pin" className="h-4 w-4" />
        {job.location}
      </p>
      <p className="mt-1 text-sm text-ink-muted">{contractTypes.labelOf(job.contractType)}</p>
      {job.tags?.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={t('jobs.card.technologies')}>
          {job.tags.slice(0, 5).map((tag) => (
            <li key={tag} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-ink-soft">
              {tag}
            </li>
          ))}
        </ul>
      )}
      <p className="mt-auto pt-4 text-sm text-ink-muted">
        {t('jobs.card.postedOn')} <Time value={postedAt(job)} format="short" />
        {job.imported && job.source && <> · {t('jobs.card.via', { source: job.source })}</>}
      </p>
    </article>
  )
}
