import { useSearchParams } from 'react-router-dom'
import { Link, Navigate } from '@/shared/i18n/router'
import PageLoader from '@/shared/components/PageLoader'
import Seo from '@/shared/components/Seo'
import { loginPath, paths } from '@/shared/config/paths'
import { safeRedirect } from '@/shared/utils/url'
import AuthCard from '../components/AuthCard'
import RegisterForm from '../components/RegisterForm'
import { useAuth } from '../hooks/useAuth'
import { siteConfig } from '@/shared/config/site'
import { useI18n } from '@/shared/i18n/useI18n'

export default function RegisterPage() {
  const { t } = useI18n()
  const { isAuthenticated, loading } = useAuth()
  const [searchParams] = useSearchParams()
  const redirectTo = safeRedirect(searchParams.get('redirect'), paths.home)

  if (loading) return <PageLoader />
  if (isAuthenticated) return <Navigate to={redirectTo} replace />

  return (
    <>
      <Seo title={t('auth.register.seoTitle')} description={t('auth.register.seoDescription', { name: siteConfig.name })} path={paths.register} robots="noindex,nofollow" />
      <AuthCard
        title={t('auth.register.title')}
        subtitle={t('auth.register.subtitle')}
        footer={
          <>
            {t('auth.register.haveAccount')}{' '}
            <Link to={loginPath(redirectTo)} className="link">
              {t('auth.register.login')}
            </Link>
          </>
        }
      >
        <RegisterForm />
      </AuthCard>
    </>
  )
}
