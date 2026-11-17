import { Outlet, useLocation } from 'react-router-dom'
import { Navigate } from '@/shared/i18n/router'
import PageLoader from '@/shared/components/PageLoader'
import { loginPath, paths } from '@/shared/config/paths'
import { useAuth } from '../hooks/useAuth'

export default function RequireAuth({ children }) {
  const { isAuthenticated, loading, signedOut } = useAuth()
  const location = useLocation()

  if (loading) return <PageLoader />
  if (!isAuthenticated) {
    // Si acaba de cerrar sesión (o de eliminar su cuenta) estando aquí, a la portada: pedirle que inicie sesión para
    // volver a la página que acaba de dejar no tendría sentido.
    if (signedOut) return <Navigate to={paths.home} replace />
    return <Navigate to={loginPath(`${location.pathname}${location.search}`)} replace />
  }
  return children ?? <Outlet />
}
