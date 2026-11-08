import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import EmailVerificationBanner from '@/features/auth/components/EmailVerificationBanner'
import ErrorBoundary from '@/shared/components/ErrorBoundary'
import PageLoader from '@/shared/components/PageLoader'
import { useI18n } from '@/shared/i18n/useI18n'
import SiteFooter from './SiteFooter'
import SiteHeader from './SiteHeader'

export default function RootLayout() {
  const { pathname } = useLocation()
  const { t } = useI18n()

  return (
    <div className="flex min-h-dvh flex-col">
      <a href="#contenido" className="skip-link">
        {t('common.skipLink')}
      </a>
      <SiteHeader />
      <EmailVerificationBanner />
      <main id="contenido" tabIndex={-1} className="flex-1 focus:outline-none">
        <ErrorBoundary resetKey={pathname}>
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
      <SiteFooter />
    </div>
  )
}
