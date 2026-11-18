import { useSearchParams } from 'react-router-dom'
import Breadcrumbs from '@/shared/components/Breadcrumbs'
import ButtonLink from '@/shared/components/ButtonLink'
import Eyebrow from '@/shared/components/Eyebrow'
import Icon from '@/shared/components/Icon'
import PageMain from '@/shared/components/PageMain'
import Seo from '@/shared/components/Seo'
import { paths } from '@/shared/config/paths'
import { siteConfig } from '@/shared/config/site'
import { useI18n } from '@/shared/i18n/useI18n'
import { useNavigate } from '@/shared/i18n/useNavigate'
import EventFilters from '../components/EventFilters'
import EventSection from '../components/EventSection'
import EventsCalendar from '../components/EventsCalendar'

/** Filtros y páginas en la dirección, para poder compartirlos y volver atrás. */
const MODES = { online: 'ONLINE', presencial: 'PRESENCIAL' }
const DAY = /^\d{4}-\d{2}-\d{2}$/

const STEPS = [
  { key: 'find', icon: 'search' },
  { key: 'join', icon: 'calendar' },
  { key: 'give', icon: 'users' },
]

function pageOf(value) {
  const page = Number.parseInt(value ?? '1', 10)
  return Number.isFinite(page) && page > 0 ? page : 1
}

/**
 * Agenda de eventos que construye la comunidad: título y calendario arriba; debajo, cómo funciona, los filtros
 * (modalidad, ciudad y el día elegido en el calendario) y dos bloques, cada uno con su paginación.
 */
export default function EventsPage() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const modeSlug = searchParams.get('modalidad') ?? ''
  const mode = MODES[modeSlug] ?? ''
  const city = searchParams.get('ciudad') ?? ''
  const day = DAY.test(searchParams.get('dia') ?? '') ? searchParams.get('dia') : ''
  const filters = { mode, city, day, active: Boolean(mode || city || day) }

  /** Dirección con unos parámetros cambiados; al cambiar un filtro, los dos bloques vuelven a la página 1. */
  const hrefWith = (changes, { keepPages = false } = {}) => {
    const next = new URLSearchParams(searchParams)
    if (!keepPages) {
      next.delete('pg')
      next.delete('pm')
    }
    Object.entries(changes).forEach(([key, value]) => (value ? next.set(key, value) : next.delete(key)))
    const query = next.toString()
    return query ? `${paths.events}?${query}` : paths.events
  }

  const selectDay = (value) => {
    navigate(hrefWith({ dia: value }), { replace: false, preventScrollReset: true })
    // Después de elegir un día, a la agenda.
    requestAnimationFrame(() =>
      document.getElementById('agenda')?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
    )
  }

  return (
    <PageMain className="page-container page-section relative isolate">
      <Seo
        title={t('events.seoTitle')}
        description={t('events.seoDescription', { name: siteConfig.name })}
        path={paths.events}
        robots={filters.active ? 'noindex,follow' : 'index,follow'}
      />
      <span aria-hidden="true" className="bg-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-96" />
      <Breadcrumbs items={[{ label: t('events.breadcrumb'), to: paths.events }]} />

      {/* Título a la izquierda y calendario a la derecha (debajo en el móvil). */}
      <header className="mt-6 grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <hgroup className="max-w-3xl">
          <Eyebrow>{t('events.eyebrow')}</Eyebrow>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl">{t('events.title')}</h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">{t('events.intro')}</p>
          <ButtonLink to={paths.eventsNew} size="lg" className="mt-8 rounded-full shadow-pop">
            <Icon name="plus" className="h-5 w-5" />
            {t('events.share')}
          </ButtonLink>
        </hgroup>
        <EventsCalendar selectedDay={day || null} onSelectDay={selectDay} />
      </header>

      {/* Tres pasos: deja claro que la agenda es de todo el mundo. */}
      <section aria-labelledby="events-how" className="mt-14">
        <h2 id="events-how" className="sr-only">
          {t('events.how.title')}
        </h2>
        <ol className="grid gap-4 sm:grid-cols-3">
          {STEPS.map((step, index) => (
            <li
              key={step.key}
              className="flex items-start gap-4 rounded-3xl border border-slate-200 bg-surface p-5 shadow-card"
            >
              <span
                aria-hidden="true"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent"
              >
                <Icon name={step.icon} className="h-5 w-5" />
              </span>
              <p className="text-sm leading-relaxed text-ink-soft">
                <strong className="block text-base font-semibold text-ink">
                  {index + 1}. {t(`events.how.${step.key}`)}
                </strong>
                {t(`events.how.${step.key}Text`)}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <EventFilters
        id="agenda"
        className="mt-12"
        filters={filters}
        modeSlug={modeSlug}
        hrefWith={hrefWith}
        onCityChange={(value) => navigate(hrefWith({ ciudad: value }), { preventScrollReset: true })}
      />

      <EventSection
        id="eventos-generales"
        forWomen={false}
        filters={filters}
        page={pageOf(searchParams.get('pg'))}
        pageHref={(page) => hrefWith({ pg: page > 1 ? String(page) : '' }, { keepPages: true })}
        className="mt-10"
      />
      <EventSection
        id="eventos-mujeres"
        forWomen
        filters={filters}
        page={pageOf(searchParams.get('pm'))}
        pageHref={(page) => hrefWith({ pm: page > 1 ? String(page) : '' }, { keepPages: true })}
        className="mt-16 rounded-3xl bg-pink-50/60 p-5 sm:p-8 dark:bg-pink-500/5"
      />

      <aside
        aria-labelledby="events-cta"
        className="mt-20 flex flex-col gap-5 rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 p-6 text-white shadow-pop sm:flex-row sm:items-center sm:justify-between sm:p-10"
      >
        <hgroup className="max-w-2xl">
          <h2 id="events-cta" className="text-2xl font-bold tracking-tight">
            {t('events.cta.title')}
          </h2>
          <p className="mt-2 text-brand-100">{t('events.cta.text')}</p>
        </hgroup>
        <ButtonLink to={paths.eventsNew} variant="inverse" size="lg" className="shrink-0 rounded-full">
          <Icon name="plus" className="h-5 w-5" />
          {t('events.share')}
        </ButtonLink>
      </aside>
    </PageMain>
  )
}
