import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import EmailVerificationBanner from '@/features/auth/components/EmailVerificationBanner'
import ErrorBoundary from '@/shared/components/ErrorBoundary'
import PageLoader from '@/shared/components/PageLoader'
import PageMain from '@/shared/components/PageMain'
import { useI18n } from '@/shared/i18n/useI18n'
import SiteFooter from './SiteFooter'
import SiteHeader from './SiteHeader'

/**
 * Estructura de las páginas públicas. Cada página renderiza su propio <main> (PageMain); #root (index.css)
 * las apila en columna con el pie siempre abajo.
 */
export default function RootLayout() {
  const { pathname } = useLocation()
  const { t } = useI18n()

  return (
    <>
      <a href="#contenido" className="skip-link">
        {t('common.skipLink')}
      </a>
      <SiteHeader />
      <EmailVerificationBanner />
      <ErrorBoundary resetKey={pathname}>
        <Suspense
          fallback={
            <PageMain loading>
              <PageLoader />
            </PageMain>
          }
        >
          <Outlet />
        </Suspense>
      </ErrorBoundary>
      <SiteFooter />
    </>
  )
}
