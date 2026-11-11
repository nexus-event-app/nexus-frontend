import { Link } from '@/shared/i18n/router'
import Badge from '@/shared/components/Badge'
import Icon from '@/shared/components/Icon'
import Time from '@/shared/components/Time'
import { contractTypes, jobLevels, workModes } from '@/shared/config/catalogs'
import { paths } from '@/shared/config/paths'
import { useInView } from '@/shared/hooks/useInView'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'
import { daysSince } from '@/shared/utils/date'
import { postedAt } from '../utils/jobHelpers'
import CompanyMonogram from './CompanyMonogram'
import SaveJobButton from './SaveJobButton'

/** Color de la franja superior según el nivel: prácticas cálido, junior verde, intermedio azul. */
const LEVEL_STRIPES = {
  INTERN: 'from-amber-400 via-orange-400 to-pink-500',
  JUNIOR: 'from-emerald-400 via-teal-400 to-cyan-500',
  MID: 'from-sky-400 via-indigo-500 to-violet-500',
}
const LEVEL_ICONS = { INTERN: 'academic', JUNIOR: 'sparkles', MID: 'chart' }
const MODE_ICONS = { REMOTE: 'computer', HYBRID: 'refresh', ONSITE: 'building' }
/** Una oferta se marca como «Nueva» durante sus tres primeros días. */
const NEW_DAYS = 3

/**
 * Tarjeta de una oferta: «logo» y empresa arriba, título, chips con nivel, modalidad y jornada, tecnologías y, al
 * pie, cuándo se publicó y «Ver oferta». Toda la tarjeta lleva a la oferta (salvo el botón de guardar). Todas miden
 * lo mismo: el título reserva dos líneas y las tecnologías dos filas. Aparece subiendo al entrar en pantalla.
 */
export default function JobCard({ job, headingLevel = 'h3' }) {
  const { t } = useI18n()
  const Heading = headingLevel
  const [ref, inView] = useInView()
  const posted = postedAt(job)
  const isNew = (daysSince(posted) ?? NEW_DAYS) < NEW_DAYS

  return (
    <article
      ref={ref}
      className={cx(
        'group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-surface p-6 shadow-card transition-all duration-500 ease-out hover:-translate-y-1 hover:border-accent-line hover:shadow-pop has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-brand-600',
        inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0 print:translate-y-0 print:opacity-100',
      )}
    >
      {/* Franja de color del nivel: crece al pasar por encima. Decorativa (el nivel va en texto en los chips). */}
      <span
        aria-hidden="true"
        className={cx(
          'absolute inset-x-0 top-0 h-1 bg-gradient-to-r transition-all duration-300 group-hover:h-1.5',
          LEVEL_STRIPES[job.level] ?? LEVEL_STRIPES.JUNIOR,
        )}
      />
      <header className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3">
        <CompanyMonogram name={job.company} />
        <p className="min-w-0">
          <span className="block truncate font-semibold text-ink">{job.company}</span>
          <span className="flex items-center gap-1 text-sm text-ink-muted">
            <Icon name="pin" className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{job.location}</span>
          </span>
        </p>
        <SaveJobButton job={job} compact className="relative z-10 -mr-2 self-start" />
      </header>

      <Heading className="mt-5 line-clamp-2 min-h-[2lh] text-lg font-bold leading-snug text-ink">
        <Link
          to={paths.jobDetail(job)}
          className="after:absolute after:inset-0 group-hover:text-accent focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          {job.title}
        </Link>
      </Heading>

      <p className="mt-4 flex flex-wrap gap-2">
        {isNew && (
          <Badge tone="pink">
            <span aria-hidden="true" className="h-1.5 w-1.5 animate-soft-pulse rounded-full bg-current" />
            {t('jobs.card.new')}
          </Badge>
        )}
        <Badge tone={jobLevels.toneOf(job.level)}>
          <Icon name={LEVEL_ICONS[job.level] ?? 'sparkles'} className="h-3.5 w-3.5" />
          {jobLevels.labelOf(job.level)}
        </Badge>
        <Badge tone={workModes.toneOf(job.workMode)}>
          <Icon name={MODE_ICONS[job.workMode] ?? 'building'} className="h-3.5 w-3.5" />
          {workModes.labelOf(job.workMode)}
        </Badge>
        {/* En prácticas, «Prácticas» ya aparece como nivel: no se repite como jornada. */}
        {job.contractType && !(job.level === 'INTERN' && job.contractType === 'INTERNSHIP') && (
          <Badge>
            <Icon name="clock" className="h-3.5 w-3.5" />
            {contractTypes.labelOf(job.contractType)}
          </Badge>
        )}
      </p>

      {/* Siempre dos filas de tecnologías (aunque haya menos), para que todas las tarjetas midan lo mismo. */}
      <ul
        className="mt-4 flex h-[3.5rem] flex-wrap content-start gap-1.5 overflow-hidden"
        aria-label={job.tags?.length ? t('jobs.card.technologies') : undefined}
        aria-hidden={job.tags?.length ? undefined : true}
      >
        {(job.tags ?? []).slice(0, 5).map((tag) => (
          <li
            key={tag}
            className="rounded-lg border border-slate-200 bg-canvas px-2 py-0.5 font-mono text-xs text-ink-soft transition-colors group-hover:border-accent-line"
          >
            <span aria-hidden="true" className="text-accent">
              #
            </span>
            {tag}
          </li>
        ))}
      </ul>

      <footer className="mt-auto flex items-center justify-between gap-3 border-t border-slate-200 pt-4 text-sm">
        <p className="min-w-0 truncate text-ink-muted">
          <Time value={posted} format="relative" />
          {job.imported && job.source && <> · {t('jobs.card.via', { source: job.source })}</>}
        </p>
        <span aria-hidden="true" className="inline-flex shrink-0 items-center gap-2 font-semibold text-accent">
          {t('jobs.card.view')}
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft transition-all duration-300 group-hover:translate-x-1 group-hover:bg-brand-600 group-hover:text-white">
            <Icon name="arrow-right" className="h-4 w-4" />
          </span>
        </span>
      </footer>
    </article>
  )
}
