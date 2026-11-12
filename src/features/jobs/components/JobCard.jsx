import { Link } from '@/shared/i18n/router'
import Icon from '@/shared/components/Icon'
import Time from '@/shared/components/Time'
import { contractTypes, jobLevels, workModes } from '@/shared/config/catalogs'
import { paths } from '@/shared/config/paths'
import { useI18n } from '@/shared/i18n/useI18n'
import { daysSince } from '@/shared/utils/date'
import { postedAt } from '../utils/jobHelpers'
import CompanyMonogram from './CompanyMonogram'
import SaveJobButton from './SaveJobButton'

const LEVEL_ICONS = { INTERN: 'academic', JUNIOR: 'sparkles', MID: 'chart' }
const MODE_ICONS = { REMOTE: 'computer', HYBRID: 'refresh', ONSITE: 'building' }
/** Una oferta se marca como «Nueva» durante sus tres primeros días. */
const NEW_DAYS = 3
/** En la fila caben tres tecnologías; si hay más, se indica cuántas quedan («+2»). */
const VISIBLE_TAGS = 3

/**
 * Una oferta en forma de fila, para comparar de un vistazo: logo y puesto, empresa y ciudad, nivel, modalidad y
 * jornada, tecnologías y cuándo se publicó. Sobria a propósito: grises y el morado de la marca solo al señalarla.
 * Toda la fila lleva a la oferta (salvo el botón de guardar). La rejilla de zonas está en `.job-row` (index.css).
 * `note`: un dato más bajo la fecha (p. ej. cuándo se guardó, en «Ofertas guardadas»).
 */
export default function JobCard({ job, headingLevel = 'h3', note }) {
  const { t } = useI18n()
  const Heading = headingLevel
  const posted = postedAt(job)
  const isNew = (daysSince(posted) ?? NEW_DAYS) < NEW_DAYS
  const tags = job.tags ?? []
  // En prácticas, «Prácticas» ya aparece como nivel: no se repite como jornada.
  const showContract = job.contractType && !(job.level === 'INTERN' && job.contractType === 'INTERNSHIP')

  return (
    <article className="job-row group relative isolate gap-y-1.5 px-5 py-5 transition-colors hover:bg-canvas has-[a:focus-visible]:bg-canvas sm:px-6">
      {/* Barra morada a la izquierda al señalar la fila (decorativa). */}
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1 origin-center scale-y-0 bg-brand-600 transition-transform duration-300 group-hover:scale-y-100 group-has-[a:focus-visible]:scale-y-100 dark:bg-brand-400"
      />
      <CompanyMonogram name={job.company} className="[grid-area:logo]" />

      <Heading className="line-clamp-2 self-center text-base font-bold leading-snug text-ink [grid-area:title] sm:text-lg">
        <Link
          to={paths.jobDetail(job)}
          className="after:absolute after:inset-0 group-hover:text-accent focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          {job.title}
        </Link>
      </Heading>

      <p className="min-w-0 truncate text-sm text-ink-soft [grid-area:company]">
        <span className="font-medium">{job.company}</span>
        <span aria-hidden="true" className="text-ink-muted">
          {' · '}
        </span>
        <span className="text-ink-muted">{job.location}</span>
      </p>

      {/* Nivel, modalidad y jornada: el nombre de cada dato solo lo oye el lector de pantalla. */}
      <dl className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-muted [grid-area:facts]">
        <dt className="sr-only">{t('jobs.filters.level')}</dt>
        <dd className="inline-flex items-center gap-1.5">
          <Icon name={LEVEL_ICONS[job.level] ?? 'sparkles'} className="h-4 w-4 text-ink-soft" />
          {jobLevels.labelOf(job.level)}
        </dd>
        <dt className="sr-only">{t('jobs.filters.workMode')}</dt>
        <dd className="inline-flex items-center gap-1.5">
          <Icon name={MODE_ICONS[job.workMode] ?? 'building'} className="h-4 w-4 text-ink-soft" />
          {workModes.labelOf(job.workMode)}
        </dd>
        {showContract && (
          <>
            <dt className="sr-only">{t('jobs.filters.contract')}</dt>
            <dd className="inline-flex items-center gap-1.5">
              <Icon name="clock" className="h-4 w-4 text-ink-soft" />
              {contractTypes.labelOf(job.contractType)}
            </dd>
          </>
        )}
      </dl>

      {tags.length > 0 && (
        <ul
          aria-label={t('jobs.card.technologies')}
          className="mt-2 flex flex-wrap content-center items-center gap-1.5 [grid-area:tags] lg:mt-0 lg:justify-end"
        >
          {tags.slice(0, VISIBLE_TAGS).map((tag) => (
            <li
              key={tag}
              className="rounded-md border border-slate-200 bg-surface px-2 py-0.5 text-xs font-medium text-ink-soft"
            >
              {tag}
            </li>
          ))}
          {tags.length > VISIBLE_TAGS && (
            <li className="px-1 text-xs font-medium text-ink-muted">
              <span aria-hidden="true">+{tags.length - VISIBLE_TAGS}</span>
              <span className="sr-only">{t('jobs.card.moreTags', { count: tags.length - VISIBLE_TAGS })}</span>
            </li>
          )}
        </ul>
      )}

      <SaveJobButton job={job} compact className="relative z-10 -mr-2 justify-self-end [grid-area:save]" />

      <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-muted [grid-area:time] lg:mt-0 lg:flex-col lg:items-end lg:gap-y-1 lg:self-start lg:text-right">
        {isNew && (
          <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-400">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
            {t('jobs.card.new')}
          </span>
        )}
        <Time value={posted} format="relative" />
        {job.imported && job.source && <span>{t('jobs.card.via', { source: job.source })}</span>}
        {note}
      </p>
    </article>
  )
}
