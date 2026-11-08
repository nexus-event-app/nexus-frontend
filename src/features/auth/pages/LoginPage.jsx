import { useSearchParams } from 'react-router-dom'
import { Link, Navigate } from '@/shared/i18n/router'
import PageLoader from '@/shared/components/PageLoader'
import Seo from '@/shared/components/Seo'
import { paths, registerPath } from '@/shared/config/paths'
import { safeRedirect } from '@/shared/utils/url'
import AuthCard from '../components/AuthCard'
import LoginForm from '../components/LoginForm'
import { useAuth } from '../hooks/useAuth'
import { siteConfig } from '@/shared/config/site'
import { useI18n } from '@/shared/i18n/useI18n'

export default function LoginPage() {
  const { t } = useI18n()
  const { isAuthenticated, loading } = useAuth()
  const [searchParams] = useSearchParams()
  const redirectTo = safeRedirect(searchParams.get('redirect'), paths.home)

  if (loading) return <PageLoader />
  if (isAuthenticated) return <Navigate to={redirectTo} replace />

  return (
    <>
      <Seo title={t('auth.login.seoTitle')} description={t('auth.login.seoDescription', { name: siteConfig.name })} path={paths.login} robots="noindex,nofollow" />
      <AuthCard
        title={t('auth.login.title')}
        subtitle={t('auth.login.subtitle')}
        footer={
          <>
            {t('auth.login.noAccount')}{' '}
            <Link to={registerPath(redirectTo)} className="link">
              {t('auth.login.createAccount')}
            </Link>
          </>
        }
      >
        <LoginForm />
      </AuthCard>
    </>
  )
}
