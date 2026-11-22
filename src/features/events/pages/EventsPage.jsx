import { useSearchParams } from 'react-router-dom'
import Breadcrumbs from '@/shared/components/Breadcrumbs'
import ButtonLink from '@/shared/components/ButtonLink'
import Eyebrow from '@/shared/components/Eyebrow'
import Icon from '@/shared/components/Icon'
import PageMain from '@/shared/components/PageMain'
import Seo from '@/shared/components/Seo'
import { illustrations } from '@/shared/config/illustrations'
import { paths } from '@/shared/config/paths'
import { siteConfig } from '@/shared/config/site'
import { useI18n } from '@/shared/i18n/useI18n'
import { useNavigate } from '@/shared/i18n/useNavigate'
import EventFilters from '../components/EventFilters'
import EventSection from '../components/EventSection'
import EventsCalendar from '../components/EventsCalendar'
import ShareInvite from '../components/ShareInvite'

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

export default function EventsPage() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const modeSlug = searchParams.get('modalidad') ?? ''
  const mode = MODES[modeSlug] ?? ''
  const city = searchParams.get('ciudad') ?? ''
  const day = DAY.test(searchParams.get('dia') ?? '') ? searchParams.get('dia') : ''
  const filters = { mode, city, day, active: Boolean(mode || city || day) }

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

      <header className="mt-6 grid items-center gap-x-12 gap-y-8 lg:grid-cols-[minmax(0,1fr)_19rem]">
        <hgroup className="max-w-3xl lg:col-start-1 lg:row-start-1 lg:self-end">
          <Eyebrow>{t('events.eyebrow')}</Eyebrow>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl">{t('events.title')}</h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">{t('events.intro')}</p>
          <ShareInvite className="mt-5 max-w-xl" />
        </hgroup>

        <section aria-labelledby="events-how" className="lg:col-start-1 lg:row-span-2 lg:row-start-2 lg:self-stretch">
          <h2 id="events-how" className="sr-only">
            {t('events.how.title')}
          </h2>
          <ol className="grid gap-4 sm:grid-cols-3 lg:h-full">
            {STEPS.map((step, index) => (
              <li
                key={step.key}
                className="group flex items-start gap-3 rounded-3xl border border-slate-200 bg-surface p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-pop sm:flex-col sm:gap-4 lg:h-full"
              >
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
                >
                  <Icon name={step.icon} className="h-6 w-6" />
                </span>
                <p className="text-sm leading-relaxed text-ink-soft lg:text-[0.95rem]">
                  <strong className="mb-1 block text-base font-semibold text-ink">
                    {index + 1}. {t(`events.how.${step.key}`)}
                  </strong>
                  {t(`events.how.${step.key}Text`)}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <EventsCalendar
          selectedDay={day || null}
          onSelectDay={selectDay}
          className="lg:col-start-2 lg:row-span-2 lg:row-start-1"
        />
        <ButtonLink
          to={paths.eventsNew}
          size="lg"
          className="min-h-[3.5rem] w-full justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 text-base shadow-pop transition-transform hover:-translate-y-0.5 hover:from-brand-700 hover:to-brand-900 lg:col-start-2 lg:row-start-3 lg:-mt-4"
        >
          <Icon name="plus" className="h-5 w-5" />
          {t('events.share')}
        </ButtonLink>
      </header>

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
        illustration={illustrations.events}
        filters={filters}
        page={pageOf(searchParams.get('pg'))}
        pageHref={(page) => hrefWith({ pg: page > 1 ? String(page) : '' }, { keepPages: true })}
        className="mt-10"
      />
      <EventSection
        id="eventos-mujeres"
        forWomen
        illustration={illustrations.women}
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
