import { Link } from '@/shared/i18n/router'
import { useAuth } from '@/features/auth/hooks/useAuth'
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

const LINK_CLASSES = 'inline-flex min-h-[2.75rem] items-center text-ink-soft hover:text-accent hover:underline sm:min-h-0 sm:py-1'

export default function SiteFooter() {
  const { isAuthenticated } = useAuth()
  const { t } = useI18n()

  return (
    <footer className="border-t border-slate-200 bg-surface">
      <div className="page-container grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-ink-muted">
            {t('seo.tagline')}. {t('common.footer.description')}
          </p>
        </div>

        <nav aria-label={t('common.footer.exploreLabel')}>
          <h2 className="text-sm font-bold uppercase tracking-wide text-ink">{t('common.footer.explore')}</h2>
          <ul className="mt-3">
            {mainNavigation.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={LINK_CLASSES}>
                  {t(item.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t('common.footer.accountLabel')}>
          <h2 className="text-sm font-bold uppercase tracking-wide text-ink">{t('common.footer.account')}</h2>
          <ul className="mt-3">
            {isAuthenticated ? (
              <li>
                <Link to={paths.forumNew} className={LINK_CLASSES}>
                  {t('common.footer.newDiscussion')}
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link to={paths.login} className={LINK_CLASSES}>
                    {t('common.account.login')}
                  </Link>
                </li>
                <li>
                  <Link to={paths.register} className={LINK_CLASSES}>
                    {t('common.account.register')}
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        <nav aria-label={t('common.footer.legalLabel')}>
          <h2 className="text-sm font-bold uppercase tracking-wide text-ink">{t('common.footer.legal')}</h2>
          <ul className="mt-3">
            {LEGAL_LINKS.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={LINK_CLASSES}>
                  {t(item.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-slate-200">
        <p className="page-container py-5 text-center text-sm text-ink-muted">
          {t('common.footer.copyright', { year: new Date().getFullYear(), name: siteConfig.name })}
        </p>
      </div>
    </footer>
  )
}
