import { Link } from '@/shared/i18n/router'
import { useAuth } from '@/features/auth/hooks/useAuth'
import Icon from '@/shared/components/Icon'
import Logo from '@/shared/components/Logo'
import { paths } from '@/shared/config/paths'
import { siteConfig } from '@/shared/config/site'
import { useI18n } from '@/shared/i18n/useI18n'
import { mainNavigation } from './navigation'

const LEGAL_LINKS = [
  { labelKey: 'common.footer.legalNotice', to: paths.legalNotice },
  { labelKey: 'common.footer.privacy', to: paths.privacy },
  { labelKey: 'common.footer.cookies', to: paths.cookies },
]

/** Enlace del pie: al pasar por encima se colorea y asoma una flecha. */
function FooterLink({ to, children }) {
  return (
    <Link
      to={to}
      className="group inline-flex min-h-[2.75rem] items-center gap-1.5 text-ink-soft transition-colors hover:text-accent sm:min-h-0 sm:py-1.5"
    >
      {children}
      <Icon
        name="arrow-right"
        className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
      />
    </Link>
  )
}

/** Título de una columna del pie, con el mismo punto que los antetítulos de la portada (sin animación). */
function ColumnTitle({ children }) {
  return (
    <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent">
      <span aria-hidden="true" className="flex h-4 w-4 items-center justify-center rounded-full bg-accent-soft">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-500 dark:bg-brand-400" />
      </span>
      {children}
    </h2>
  )
}

/** Vuelve al principio de la página y deja el foco en el enlace de inicio de la cabecera. */
function BackToTop() {
  const { t } = useI18n()
  const handleClick = () => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
    document.querySelector('header a[href]')?.focus({ preventScroll: true })
  }
  return (
    <button
      type="button"
      onClick={handleClick}
      className="group inline-flex min-h-[2.75rem] items-center gap-2 rounded-full border border-slate-200 bg-surface py-1.5 pl-4 pr-1.5 text-sm font-medium text-ink-soft transition-all hover:-translate-y-0.5 hover:border-accent-line hover:text-accent"
    >
      {t('common.footer.backToTop')}
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-accent transition-transform group-hover:-translate-y-0.5">
        <Icon name="arrow-right" className="h-4 w-4 -rotate-90" />
      </span>
    </button>
  )
}

/**
 * Pie de la web: presentación con una invitación a empezar por las rutas, enlaces en tres columnas y, al final,
 * el nombre del proyecto en grande como remate visual (decorativo) y la barra con el copyright y «Volver arriba».
 */
export default function SiteFooter() {
  const { isAuthenticated, user } = useAuth()
  const { t } = useI18n()

  return (
    <footer className="page-gutter relative isolate grid gap-x-10 gap-y-12 overflow-hidden border-t border-slate-200 bg-surface pt-16 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))]">
      {/* Línea de luz arriba y cuadrícula suave detrás: decoración. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500 to-transparent"
      />
      <span aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 -z-10" />

      <section aria-labelledby="footer-start" className="sm:col-span-2 lg:col-span-1">
        <Logo />
        <p className="mt-4 max-w-sm text-ink-muted">
          {t('seo.tagline')}. {t('common.footer.description')}
        </p>
        <article className="group relative mt-6 max-w-sm rounded-3xl border border-accent-line bg-gradient-to-br from-accent-soft to-surface p-5 transition-all hover:-translate-y-0.5 hover:shadow-pop has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-brand-600">
          <h2 id="footer-start" className="flex items-center gap-2 font-bold text-ink">
            <Icon name="academic" className="h-5 w-5 text-accent" />
            {t('common.footer.startTitle')}
          </h2>
          <p className="mt-1 text-sm text-ink-muted">{t('common.footer.startText')}</p>
          <Link
            to={paths.learning}
            className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-accent after:absolute after:inset-0 after:rounded-3xl focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            {t('common.footer.startLink')}
            <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </article>
      </section>

      <nav aria-label={t('common.footer.exploreLabel')}>
        <ColumnTitle>{t('common.footer.explore')}</ColumnTitle>
        <ul className="mt-4">
          {mainNavigation.map((item) => (
            <li key={item.to}>
              <FooterLink to={item.to}>{t(item.labelKey)}</FooterLink>
            </li>
          ))}
        </ul>
      </nav>

      <nav aria-label={t('common.footer.accountLabel')}>
        <ColumnTitle>{t('common.footer.account')}</ColumnTitle>
        <ul className="mt-4">
          {isAuthenticated ? (
            <>
              <li>
                <FooterLink to={paths.profile(user)}>{t('common.account.profile')}</FooterLink>
              </li>
              <li>
                <FooterLink to={paths.savedJobs}>{t('common.account.savedJobs')}</FooterLink>
              </li>
              <li>
                <FooterLink to={paths.notifications}>{t('notifications.title')}</FooterLink>
              </li>
              <li>
                <FooterLink to={paths.forumNew}>{t('common.footer.newDiscussion')}</FooterLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <FooterLink to={paths.login}>{t('common.account.login')}</FooterLink>
              </li>
              <li>
                <FooterLink to={paths.register}>{t('common.account.register')}</FooterLink>
              </li>
            </>
          )}
        </ul>
      </nav>

      <nav aria-label={t('common.footer.legalLabel')}>
        <ColumnTitle>{t('common.footer.legal')}</ColumnTitle>
        <ul className="mt-4">
          {LEGAL_LINKS.map((item) => (
            <li key={item.to}>
              <FooterLink to={item.to}>{t(item.labelKey)}</FooterLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* El nombre en grande, cortado por abajo y desvaneciéndose: remate visual; el nombre ya está en el logo. */}
      <p
        aria-hidden="true"
        className="col-span-full -mb-[0.28em] select-none whitespace-nowrap bg-gradient-to-b from-brand-300 via-accent-tint to-transparent bg-clip-text text-center text-[clamp(3rem,12.5vw,10.5rem)] font-bold leading-none tracking-tighter text-transparent dark:from-brand-700"
      >
        {siteConfig.name}
      </p>

      <p className="relative col-span-full -mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 bg-surface/80 py-6 text-sm text-ink-muted backdrop-blur sm:flex-row">
        <span className="text-center sm:text-left">
          {t('common.footer.copyright', { year: new Date().getFullYear(), name: siteConfig.name })}
        </span>
        <BackToTop />
      </p>
    </footer>
  )
}
