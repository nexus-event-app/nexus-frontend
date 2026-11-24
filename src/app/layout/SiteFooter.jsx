import { Link } from '@/shared/i18n/router'
import { useAuth } from '@/features/auth/hooks/useAuth'
import Icon from '@/shared/components/Icon'
import Logo from '@/shared/components/Logo'
import Illustration from '@/shared/components/Illustration'
import { illustrations } from '@/shared/config/illustrations'
import { paths } from '@/shared/config/paths'
import { siteConfig } from '@/shared/config/site'
import { useI18n } from '@/shared/i18n/useI18n'
import { mainNavigation } from './navigation'

const LEGAL_LINKS = [
  { labelKey: 'common.footer.legalNotice', to: paths.legalNotice },
  { labelKey: 'common.footer.privacy', to: paths.privacy },
  { labelKey: 'common.footer.cookies', to: paths.cookies },
]

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

export default function SiteFooter() {
  const { isAuthenticated, user } = useAuth()
  const { t } = useI18n()

  return (
    <footer className="page-gutter relative isolate grid gap-x-10 gap-y-8 overflow-hidden bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 pt-10 text-white sm:grid-cols-2 lg:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))]">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-32 -z-10 h-[30rem] w-[30rem] animate-drift-slow rounded-full bg-brand-500/30 blur-3xl"
      />

      <section aria-labelledby="footer-about" className="relative sm:col-span-2 lg:col-span-1">
        <h2 id="footer-about" className="sr-only">
          {siteConfig.name}
        </h2>
        <Logo inverse />
        <p className="mt-4 max-w-sm text-brand-100">
          {t('seo.tagline')}. {t('common.footer.description')}
        </p>
        <Illustration
          {...illustrations.footer}
          className="absolute bottom-0 left-0 hidden w-[16.5rem] lg:block xl:w-[19rem]"
        />
      </section>

      <nav aria-label={t('common.footer.exploreLabel')}>
        <ColumnTitle>{t('common.footer.explore')}</ColumnTitle>
        <ul className="mt-4">
          {mainNavigation.map((item) => (
            <li key={item.to}>
              <FooterLink to={item.to}>{t(item.labelKey)}</FooterLink>
            </li>
          ))}
          <li>
            <FooterLink to={paths.guides}>{t('common.nav.guides')}</FooterLink>
          </li>
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

      <p className="relative col-span-full flex flex-col items-center justify-between gap-4 border-t border-white/15 py-4 text-sm text-brand-100 sm:flex-row">
        <span className="text-center sm:text-left">
          {t('common.footer.copyright', { year: new Date().getFullYear(), name: siteConfig.name })}
        </span>
        <BackToTop />
      </p>
    </footer>
  )
}
