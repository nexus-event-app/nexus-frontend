import { useAuth } from '@/features/auth/hooks/useAuth'
import ButtonLink from '@/shared/components/ButtonLink'
import Icon from '@/shared/components/Icon'
import { paths } from '@/shared/config/paths'
import { siteConfig } from '@/shared/config/site'
import { Link } from '@/shared/i18n/router'
import { useI18n } from '@/shared/i18n/useI18n'

const HIGHLIGHTS = [
  { key: 'news', icon: 'newspaper', to: paths.news, delay: '[animation-delay:320ms]' },
  { key: 'jobs', icon: 'briefcase', to: paths.jobs, delay: '[animation-delay:400ms]' },
  { key: 'forum', icon: 'chat', to: paths.forum, delay: '[animation-delay:480ms]' },
]

/**
 * Portada: mensaje principal centrado sobre un degradado índigo con dos luces que se mueven muy despacio, y tres
 * tarjetas que llevan a las secciones principales. Todo entra subiendo un poco al cargar, una sola vez; con
 * «reducir movimiento» activado en el dispositivo no hay animaciones (index.css).
 */
export default function HeroSection() {
  const { t } = useI18n()
  const { isAuthenticated } = useAuth()

  return (
    <section
      aria-labelledby="hero-heading"
      className="page-gutter relative isolate overflow-hidden bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 pb-16 pt-16 text-white sm:pb-20 sm:pt-24"
    >
      {/* Luces decorativas del fondo: no aportan contenido, solo profundidad. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-40 -z-10 h-[32rem] w-[32rem] animate-drift rounded-full bg-brand-500/40 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/3 -z-10 h-[28rem] w-[28rem] animate-drift-slow rounded-full bg-violet-500/25 blur-3xl"
      />

      <header className="mx-auto max-w-4xl text-center">
        <p className="inline-flex animate-rise-in items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-brand-200">
          <span aria-hidden="true" className="h-1.5 w-1.5 animate-soft-pulse rounded-full bg-brand-200" />
          {t('home.hero.eyebrow')}
        </p>
        <h1
          id="hero-heading"
          className="mt-5 animate-rise-in text-4xl font-bold leading-[1.1] tracking-tight [animation-delay:80ms] sm:text-5xl lg:text-6xl"
        >
          <span className="block">{t('home.hero.titleStart')}</span>{' '}
          <span className="block text-brand-200">{t('home.hero.titleEnd')}</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl animate-rise-in text-lg leading-relaxed text-brand-100 [animation-delay:160ms]">
          {t('home.hero.text', { name: siteConfig.name })}
        </p>
        <menu className="mt-9 flex animate-rise-in flex-col justify-center gap-3 [animation-delay:240ms] sm:flex-row">
          <li>
            <ButtonLink
              to={isAuthenticated ? paths.forum : paths.register}
              variant="inverse"
              className="w-full px-6 transition-all hover:-translate-y-0.5 hover:shadow-lg sm:w-auto"
            >
              {isAuthenticated ? t('home.hero.goForum') : t('home.hero.register')}
            </ButtonLink>
          </li>
          <li>
            <ButtonLink to={paths.jobs} variant="outlineInverse" className="w-full px-6 sm:w-auto">
              {t('home.hero.seeJobs')}
            </ButtonLink>
          </li>
        </menu>
      </header>

      <ul className="mx-auto mt-14 grid max-w-page gap-5 md:grid-cols-3">
        {HIGHLIGHTS.map((item) => (
          <li key={item.key} className={`animate-rise-in ${item.delay}`}>
            {/* Toda la tarjeta lleva a la sección; al pasar por encima o enfocarla se ilumina en lavanda. */}
            <article className="group relative flex h-full flex-col rounded-2xl bg-surface p-6 text-ink shadow-xl shadow-brand-950/20 transition-all duration-300 hover:-translate-y-1 hover:bg-accent-soft hover:shadow-2xl has-[a:focus-visible]:-translate-y-1 has-[a:focus-visible]:bg-accent-soft has-[a:focus-visible]:ring-4 has-[a:focus-visible]:ring-white/80">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white group-has-[a:focus-visible]:bg-brand-600 group-has-[a:focus-visible]:text-white">
                <Icon name={item.icon} className="h-6 w-6" />
              </span>
              <h2 className="mt-5 text-xl font-bold">{t(`home.hero.${item.key}Title`)}</h2>
              <p className="mt-2 text-ink-muted">{t(`home.hero.${item.key}Text`)}</p>
              <p className="mt-auto flex items-center justify-between gap-3 pt-6 text-sm font-medium text-accent">
                <Link
                  to={item.to}
                  className="after:absolute after:inset-0 after:rounded-2xl focus-visible:ring-0 focus-visible:ring-offset-0"
                >
                  {t(`home.hero.${item.key}Link`)}
                </Link>
                <Icon
                  name="arrow-right"
                  className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-has-[a:focus-visible]:translate-x-1"
                />
              </p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}
