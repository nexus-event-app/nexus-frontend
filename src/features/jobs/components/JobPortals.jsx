import Icon from '@/shared/components/Icon'
import SectionHeader from '@/shared/components/SectionHeader'
import { useI18n } from '@/shared/i18n/useI18n'
import { JOB_PORTALS } from '../config/jobPortals'

/** Enlace externo a un portal: pestaña nueva y sin transmitir autoridad SEO ni datos de origen. */
function PortalLink({ portal, className, children }) {
  const { t } = useI18n()
  return (
    <a href={portal.url} target="_blank" rel="noopener noreferrer nofollow" className={className}>
      {children}
      <span className="sr-only"> {t('jobs.portals.external', { name: portal.name })}</span>
    </a>
  )
}

/**
 * Búsquedas ya filtradas (tecnología, junior, España) en los principales portales de empleo.
 * `compact` muestra solo una línea de enlaces, para la portada.
 */
export default function JobPortals({ compact = false }) {
  const { t } = useI18n()

  if (compact) {
    return (
      <nav aria-label={t('jobs.portals.title')} className="mt-6 text-sm text-ink-soft">
        <span className="font-semibold text-ink">{t('jobs.portals.compact')}</span>{' '}
        {JOB_PORTALS.map((portal, index) => (
          <span key={portal.id}>
            {index > 0 && <span aria-hidden="true"> · </span>}
            <PortalLink portal={portal} className="link inline-flex items-center gap-1">
              {portal.name}
            </PortalLink>
          </span>
        ))}
      </nav>
    )
  }

  return (
    <section aria-labelledby="job-portals" className="mt-14">
      <SectionHeader id="job-portals" title={t('jobs.portals.title')} description={t('jobs.portals.description')} />
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {JOB_PORTALS.map((portal) => (
          <li key={portal.id}>
            <PortalLink
              portal={portal}
              className="card group flex h-full items-start justify-between gap-3 p-4 transition-shadow hover:shadow-pop"
            >
              <span>
                <span className="block font-bold text-ink group-hover:text-accent">{portal.name}</span>
                <span className="mt-1 block text-sm text-ink-muted">{t(`jobs.portals.${portal.id}`)}</span>
              </span>
              <Icon name="external" className="mt-1 h-4 w-4 shrink-0 text-ink-muted group-hover:text-accent" />
            </PortalLink>
          </li>
        ))}
      </ul>
    </section>
  )
}
