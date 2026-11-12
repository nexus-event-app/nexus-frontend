import Icon from '@/shared/components/Icon'
import Eyebrow from '@/shared/components/Eyebrow'
import { useI18n } from '@/shared/i18n/useI18n'
import { JOB_PORTALS } from '../config/jobPortals'
import CompanyMonogram from './CompanyMonogram'

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
 * `compact` muestra los portales como pastillas en un recuadro, para la portada.
 */
export default function JobPortals({ compact = false }) {
  const { t } = useI18n()

  if (compact) {
    return (
      <nav
        aria-label={t('jobs.portals.title')}
        className="mt-8 flex flex-col gap-3 rounded-3xl border border-dashed border-slate-300 p-5 sm:flex-row sm:items-center"
      >
        <p className="shrink-0 font-semibold text-ink">{t('jobs.portals.compact')}</p>
        <ul className="flex flex-wrap gap-2">
          {JOB_PORTALS.map((portal) => (
            <li key={portal.id}>
              <PortalLink
                portal={portal}
                className="inline-flex min-h-[2.75rem] items-center gap-1.5 rounded-full border border-slate-200 bg-surface px-3.5 text-sm font-medium text-ink-soft transition-all hover:-translate-y-0.5 hover:border-accent-line hover:text-accent sm:min-h-[2.25rem]"
              >
                {portal.name}
                <Icon name="external" className="h-3.5 w-3.5" />
              </PortalLink>
            </li>
          ))}
        </ul>
      </nav>
    )
  }

  // Apartado propio, como las secciones de la portada: antetítulo que se escribe solo, título grande y una tarjeta
  // por portal con sus iniciales, para qué sirve y «Ver ofertas». Un halo suave detrás lo separa de la lista.
  return (
    <section
      aria-labelledby="job-portals"
      className="relative isolate mt-20 overflow-hidden rounded-[2rem] border border-slate-200 bg-surface p-6 shadow-card sm:p-10"
    >
      <span aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 -z-10" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-accent-soft blur-3xl"
      />
      <header className="mb-8 max-w-2xl">
        <hgroup>
          <Eyebrow>{t('jobs.portals.eyebrow')}</Eyebrow>
          <h2 id="job-portals" className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {t('jobs.portals.title')}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">{t('jobs.portals.description')}</p>
        </hgroup>
      </header>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {JOB_PORTALS.map((portal) => (
          <li key={portal.id}>
            <PortalLink
              portal={portal}
              className="group grid h-full grid-cols-[auto_minmax(0,1fr)] grid-rows-[auto_1fr_auto] gap-x-3 gap-y-3 rounded-2xl border border-slate-200 bg-canvas p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent-line hover:bg-surface hover:shadow-pop"
            >
              <CompanyMonogram name={portal.name} className="h-10 w-10 rounded-lg text-sm" />
              <span className="self-center font-bold text-ink group-hover:text-accent">{portal.name}</span>
              <span className="col-span-full text-sm leading-relaxed text-ink-muted">
                {t(`jobs.portals.${portal.id}`)}
              </span>
              <span
                aria-hidden="true"
                className="col-span-full inline-flex items-center gap-2 text-sm font-semibold text-accent"
              >
                {t('jobs.portals.cta')}
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-soft transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
                  <Icon name="external" className="h-3.5 w-3.5" />
                </span>
              </span>
            </PortalLink>
          </li>
        ))}
      </ul>
    </section>
  )
}
