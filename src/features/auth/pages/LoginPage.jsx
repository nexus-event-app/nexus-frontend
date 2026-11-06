import { Link, Navigate, useSearchParams } from 'react-router-dom'
import PageLoader from '@/shared/components/PageLoader'
import Seo from '@/shared/components/Seo'
import { paths, registerPath } from '@/shared/config/paths'
import { safeRedirect } from '@/shared/utils/url'
import AuthCard from '../components/AuthCard'
import LoginForm from '../components/LoginForm'
import { useAuth } from '../hooks/useAuth'
import { siteConfig } from '@/shared/config/site'

export default function LoginPage() {
  const { isAuthenticated, loading } = useAuth()
  const [searchParams] = useSearchParams()
  const redirectTo = safeRedirect(searchParams.get('redirect'), paths.home)

  if (loading) return <PageLoader />
  if (isAuthenticated) return <Navigate to={redirectTo} replace />

  return (
    <>
      <Seo title="Iniciar sesión" description={`Accede a tu cuenta de ${siteConfig.name}.`} path={paths.login} robots="noindex,nofollow" />
      <AuthCard
        title="Iniciar sesión"
        subtitle="Accede para participar en el foro y compartir tu testimonio."
        footer={
          <>
            ¿Aún no tienes cuenta?{' '}
            <Link to={registerPath(redirectTo)} className="link">
              Crea una cuenta
            </Link>
          </>
        }
      >
        <LoginForm />
      </AuthCard>
    </>
  )
}
