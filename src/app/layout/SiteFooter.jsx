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
      className="group inline-flex min-h-[2.75rem] items-center gap-1.5 text-brand-100 transition-colors hover:text-white sm:min-h-0 sm:py-1.5"
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
    <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white">
      <span aria-hidden="true" className="flex h-4 w-4 items-center justify-center rounded-full bg-white/15">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-200" />
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
      className="group inline-flex min-h-[2.75rem] items-center gap-2 rounded-full border border-white/25 bg-white/10 py-1.5 pl-4 pr-1.5 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-white/15"
    >
      {t('common.footer.backToTop')}
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-brand-700 transition-transform group-hover:-translate-y-0.5">
        <Icon name="arrow-right" className="h-4 w-4 -rotate-90" />
      </span>
    </button>
  )
}

/**
 * Pie de la web, en el morado de la portada: presentación con una invitación a empezar por las rutas, enlaces en tres columnas y, al final,
 * el nombre del proyecto en grande como remate visual (decorativo) y la barra con el copyright y «Volver arriba».
 */
export default function SiteFooter() {
  const { isAuthenticated, user } = useAuth()
  const { t } = useI18n()

  return (
    <footer className="page-gutter relative isolate grid gap-x-10 gap-y-12 overflow-hidden bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 pt-16 text-white sm:grid-cols-2 lg:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))]">
      {/* Mismo degradado y luz que la portada, para cerrar la página con el color de la marca. Decorativo. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-32 -z-10 h-[30rem] w-[30rem] animate-drift-slow rounded-full bg-brand-500/30 blur-3xl"
      />

      <section aria-labelledby="footer-start" className="sm:col-span-2 lg:col-span-1">
        <Logo inverse />
        <p className="mt-4 max-w-sm text-brand-100">
          {t('seo.tagline')}. {t('common.footer.description')}
        </p>
        <article className="group relative mt-6 max-w-sm rounded-3xl bg-white/10 p-5 ring-1 ring-inset ring-white/20 backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white/15 has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-white">
          <h2 id="footer-start" className="flex items-center gap-2 font-bold text-white">
            <Icon name="academic" className="h-5 w-5 text-brand-200" />
            {t('common.footer.startTitle')}
          </h2>
          <p className="mt-1 text-sm text-brand-100">{t('common.footer.startText')}</p>
          <Link
            to={paths.learning}
            className="mt-3 inline-flex text-sm font-semibold text-white underline decoration-white/40 underline-offset-4 after:absolute after:inset-0 after:rounded-3xl group-hover:decoration-white focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            {t('common.footer.startLink')}
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
        className="col-span-full -mb-[0.28em] select-none whitespace-nowrap bg-gradient-to-b from-white/50 via-white/20 to-transparent bg-clip-text text-center text-[clamp(3rem,12.5vw,10.5rem)] font-bold leading-none tracking-tighter text-transparent"
      >
        {siteConfig.name}
      </p>

      <p className="relative col-span-full -mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/15 py-6 text-sm text-brand-100 sm:flex-row">
        <span className="text-center sm:text-left">
          {t('common.footer.copyright', { year: new Date().getFullYear(), name: siteConfig.name })}
        </span>
        <BackToTop />
      </p>
    </footer>
  )
}
