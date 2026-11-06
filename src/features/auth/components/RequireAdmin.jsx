import { Navigate, Outlet, useLocation } from 'react-router-dom'
import PageLoader from '@/shared/components/PageLoader'
import { loginPath, paths } from '@/shared/config/paths'
import { useAuth } from '../hooks/useAuth'

export default function RequireAdmin({ children }) {
  const { isAuthenticated, isAdmin, loading } = useAuth()
  const location = useLocation()

  if (loading) return <PageLoader />
  if (!isAuthenticated) {
    return <Navigate to={loginPath(`${location.pathname}${location.search}`)} replace />
  }
  if (!isAdmin) return <Navigate to={paths.home} replace />
  return children ?? <Outlet />
}
