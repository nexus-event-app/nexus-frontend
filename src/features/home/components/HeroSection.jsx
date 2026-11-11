import { useAuth } from '@/features/auth/hooks/useAuth'
import ButtonLink from '@/shared/components/ButtonLink'
import Eyebrow from '@/shared/components/Eyebrow'
import Icon from '@/shared/components/Icon'
import { paths } from '@/shared/config/paths'
import { siteConfig } from '@/shared/config/site'
import { Link } from '@/shared/i18n/router'
import { useI18n } from '@/shared/i18n/useI18n'
import HeroIllustration from './HeroIllustration'

/** Lo que ofrece la web, en cuatro bloques informativos (no son enlaces: las secciones están en el menú). */
const FEATURES = [
  { key: 'news', icon: 'newspaper' },
  { key: 'jobs', icon: 'briefcase' },
  { key: 'forum', icon: 'chat' },
  { key: 'learn', icon: 'academic' },
]

/**
 * Portada: qué es Primer Commit y una sola llamada a la acción, unirse (o, con sesión, seguir con tu ruta). A la
 * derecha, una ilustración con mini pantallas de la web; abajo, lo que encontrarás, en bloques informativos con un
 * estilo translúcido distinto del de las tarjetas que se pueden pulsar.
 */
export default function HeroSection() {
  const { t } = useI18n()
  const { isAuthenticated, user } = useAuth()
  const name = siteConfig.name

  return (
    <section
      aria-labelledby="hero-heading"
      className="page-gutter relative isolate grid items-center gap-x-12 gap-y-14 overflow-hidden bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 pb-16 pt-14 text-white sm:pt-20 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-40 -z-10 h-[32rem] w-[32rem] animate-drift rounded-full bg-brand-500/40 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/3 -z-10 h-[28rem] w-[28rem] animate-drift-slow rounded-full bg-violet-500/25 blur-3xl"
      />

      <header className="text-center lg:text-left">
        <Eyebrow tone="dark" className="animate-rise-in">
          {t('home.hero.eyebrow')}
        </Eyebrow>
        <h1
          id="hero-heading"
          className="mt-5 animate-rise-in text-4xl font-bold leading-[1.08] tracking-tight [animation-delay:80ms] sm:text-5xl xl:text-[3.4rem]"
        >
          <span className="block">{t('home.hero.titleStart')}</span>{' '}
          <span className="block bg-gradient-to-r from-brand-200 via-violet-200 to-brand-200 bg-clip-text text-transparent">
            {t('home.hero.titleEnd')}
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl animate-rise-in text-lg leading-relaxed text-brand-100 [animation-delay:160ms] lg:mx-0">
          {t('home.hero.text', { name })}
        </p>

        {isAuthenticated ? (
          <section aria-label={t('home.hero.continue')} className="mt-9 animate-rise-in [animation-delay:240ms]">
            <p className="text-lg font-semibold text-white">{t('home.hero.greeting', { name: user.name })}</p>
            <ButtonLink
              to={paths.learning}
              variant="inverse"
              className="mt-4 rounded-full px-7 py-3 text-base shadow-lg shadow-brand-950/30 transition-all hover:-translate-y-0.5"
            >
              {t('home.hero.continue')}
            </ButtonLink>
          </section>
        ) : (
          <menu className="mt-9 flex animate-rise-in flex-col items-center gap-4 [animation-delay:240ms] sm:flex-row lg:justify-start">
            <li>
              <ButtonLink
                to={paths.register}
                variant="inverse"
                className="rounded-full px-7 py-3 text-base shadow-lg shadow-brand-950/30 transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                {t('home.hero.join')}
              </ButtonLink>
            </li>
            <li>
              <Link
                to={paths.login}
                className="inline-flex min-h-[2.75rem] items-center font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
              >
                {t('home.hero.haveAccount')}
              </Link>
            </li>
          </menu>
        )}
      </header>

      <HeroIllustration className="relative hidden h-[27rem] animate-rise-in [animation-delay:200ms] lg:block" />

      <section aria-labelledby="hero-features" className="lg:col-span-2">
        <h2 id="hero-features" className="sr-only">
          {t('home.hero.featuresTitle', { name })}
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, index) => (
            <li
              key={feature.key}
              style={{ animationDelay: `${400 + index * 80}ms` }}
              className="animate-rise-in rounded-2xl bg-white/[0.07] p-5 ring-1 ring-inset ring-white/15"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white">
                <Icon name={feature.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-bold text-white">{t(`home.hero.${feature.key}Title`)}</h3>
              <p className="mt-1 text-sm leading-relaxed text-brand-100">{t(`home.hero.${feature.key}Text`)}</p>
            </li>
          ))}
        </ul>
      </section>
    </section>
  )
}
