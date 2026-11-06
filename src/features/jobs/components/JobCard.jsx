import { Link } from 'react-router-dom'
import Badge from '@/shared/components/Badge'
import Icon from '@/shared/components/Icon'
import Time from '@/shared/components/Time'
import { contractTypes, jobLevels, workModes } from '@/shared/config/catalogs'
import { paths } from '@/shared/config/paths'
import { postedAt } from '../utils/jobHelpers'

export default function JobCard({ job, headingLevel = 'h3' }) {
  const Heading = headingLevel

  return (
    <article className="card relative flex h-full flex-col p-5 transition-shadow hover:shadow-pop has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-600">
      <div className="flex flex-wrap gap-2">
        <Badge tone={jobLevels.toneOf(job.level)}>{jobLevels.labelOf(job.level)}</Badge>
        <Badge tone={workModes.toneOf(job.workMode)}>{workModes.labelOf(job.workMode)}</Badge>
      </div>
      <Heading className="mt-3 text-lg font-bold leading-snug text-ink">
        <Link
          to={paths.jobDetail(job)}
          className="after:absolute after:inset-0 hover:text-brand-700 focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          {job.title}
        </Link>
      </Heading>
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
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tecnologías">
          {job.tags.slice(0, 5).map((tag) => (
            <li key={tag} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-ink-soft">
              {tag}
            </li>
          ))}
        </ul>
      )}
      <p className="mt-auto pt-4 text-sm text-ink-muted">
        Publicada el <Time value={postedAt(job)} format="short" />
        {job.imported && job.source && <> · vía {job.source}</>}
      </p>
    </article>
  )
}
