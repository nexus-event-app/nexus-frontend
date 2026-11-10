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

const LINK_CLASSES =
  'inline-flex min-h-[2.75rem] items-center text-ink-soft hover:text-accent hover:underline sm:min-h-0 sm:py-1'

export default function SiteFooter() {
  const { isAuthenticated, user } = useAuth()
  const { t } = useI18n()

  return (
    <footer className="page-gutter grid gap-x-10 border-t border-slate-200 bg-surface pt-12 sm:grid-cols-2 lg:grid-cols-4">
      <p className="mb-10 max-w-sm text-ink-muted">
        <Logo />
        <span className="mt-4 block">
          {t('seo.tagline')}. {t('common.footer.description')}
        </span>
      </p>

      <nav aria-label={t('common.footer.exploreLabel')} className="mb-10">
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

      <nav aria-label={t('common.footer.accountLabel')} className="mb-10">
        <h2 className="text-sm font-bold uppercase tracking-wide text-ink">{t('common.footer.account')}</h2>
        <ul className="mt-3">
          {isAuthenticated ? (
            <>
              <li>
                <Link to={paths.profile(user)} className={LINK_CLASSES}>
                  {t('common.account.profile')}
                </Link>
              </li>
              <li>
                <Link to={paths.savedJobs} className={LINK_CLASSES}>
                  {t('common.account.savedJobs')}
                </Link>
              </li>
              <li>
                <Link to={paths.forumNew} className={LINK_CLASSES}>
                  {t('common.footer.newDiscussion')}
                </Link>
              </li>
            </>
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

      <nav aria-label={t('common.footer.legalLabel')} className="mb-10">
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
      <p className="col-span-full mt-2 border-t border-slate-200 py-5 text-center text-sm text-ink-muted">
        {t('common.footer.copyright', {
          year: new Date().getFullYear(),
          name: siteConfig.name,
        })}
      </p>
    </footer>
  )
}
