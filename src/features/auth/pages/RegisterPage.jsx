import { Link, Navigate, useSearchParams } from 'react-router-dom'
import PageLoader from '@/shared/components/PageLoader'
import Seo from '@/shared/components/Seo'
import { loginPath, paths } from '@/shared/config/paths'
import { safeRedirect } from '@/shared/utils/url'
import AuthCard from '../components/AuthCard'
import RegisterForm from '../components/RegisterForm'
import { useAuth } from '../hooks/useAuth'

export default function RegisterPage() {
  const { isAuthenticated, loading } = useAuth()
  const [searchParams] = useSearchParams()
  const redirectTo = safeRedirect(searchParams.get('redirect'), paths.home)

  if (loading) return <PageLoader />
  if (isAuthenticated) return <Navigate to={redirectTo} replace />

  return (
    <>
      <Seo title="Crear cuenta" description="Crea tu cuenta gratuita en StartDev." path={paths.register} robots="noindex,nofollow" />
      <AuthCard
        title="Crear cuenta"
        subtitle="Únete a la comunidad: participa en el foro y cuéntanos tu experiencia."
        footer={
          <>
            ¿Ya tienes cuenta?{' '}
            <Link to={loginPath(redirectTo)} className="link">
              Inicia sesión
            </Link>
          </>
        }
      >
        <RegisterForm />
      </AuthCard>
    </>
  )
}
