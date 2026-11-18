import { useSearchParams } from 'react-router-dom'
import Breadcrumbs from '@/shared/components/Breadcrumbs'
import ButtonLink from '@/shared/components/ButtonLink'
import Eyebrow from '@/shared/components/Eyebrow'
import FilterLinks from '@/shared/components/FilterLinks'
import Icon from '@/shared/components/Icon'
import PageMain from '@/shared/components/PageMain'
import Seo from '@/shared/components/Seo'
import { paths } from '@/shared/config/paths'
import { siteConfig } from '@/shared/config/site'
import { useI18n } from '@/shared/i18n/useI18n'
import EventSection from '../components/EventSection'

/** Modalidad elegida en la dirección («?modalidad=online»), para poder compartirla y volver atrás. */
const MODES = { online: 'ONLINE', presencial: 'PRESENCIAL' }

const STEPS = [
  { key: 'find', icon: 'search' },
  { key: 'join', icon: 'calendar' },
  { key: 'give', icon: 'users' },
]

/**
 * Agenda de eventos que construye la comunidad: arriba se explica que la hace todo el mundo y cómo funciona; después,
 * dos bloques (para todo el mundo y por y para mujeres) y, al final, otra invitación a compartir.
 */
export default function EventsPage() {
  const { t } = useI18n()
  const [searchParams] = useSearchParams()
  const modeSlug = searchParams.get('modalidad') ?? ''
  const mode = MODES[modeSlug] ?? ''
  const hrefFor = (slug) => (slug ? `${paths.events}?modalidad=${slug}` : paths.events)

  return (
    <PageMain className="page-container page-section relative isolate">
      <Seo
        title={t('events.seoTitle')}
        description={t('events.seoDescription', { name: siteConfig.name })}
        path={paths.events}
        robots={mode ? 'noindex,follow' : 'index,follow'}
      />
      <span aria-hidden="true" className="bg-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-96" />
      <Breadcrumbs items={[{ label: t('events.breadcrumb'), to: paths.events }]} />

      <header className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <hgroup className="max-w-3xl">
          <Eyebrow>{t('events.eyebrow')}</Eyebrow>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl">{t('events.title')}</h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">{t('events.intro')}</p>
        </hgroup>
        <ButtonLink to={paths.eventsNew} size="lg" className="shrink-0 rounded-full shadow-pop">
          <Icon name="plus" className="h-5 w-5" />
          {t('events.share')}
        </ButtonLink>
      </header>

      {/* Tres pasos: deja claro que la agenda es de todo el mundo. */}
      <section aria-labelledby="events-how" className="mt-12">
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

      <FilterLinks
        className="mt-10 border-y border-slate-200 py-4"
        label={t('events.filter.label')}
        options={[
          { key: 'all', label: t('events.filter.all'), href: hrefFor(''), active: !mode },
          { key: 'online', label: t('events.filter.online'), href: hrefFor('online'), active: mode === 'ONLINE' },
          {
            key: 'presencial',
            label: t('events.filter.inPerson'),
            href: hrefFor('presencial'),
            active: mode === 'PRESENCIAL',
          },
        ]}
      />

      <EventSection id="eventos-generales" forWomen={false} mode={mode} className="mt-12" />
      <EventSection
        id="eventos-mujeres"
        forWomen
        mode={mode}
        className="mt-20 rounded-3xl bg-pink-50/60 p-5 sm:p-8 dark:bg-pink-500/5"
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
