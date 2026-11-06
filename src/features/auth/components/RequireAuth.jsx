import { Navigate, Outlet, useLocation } from 'react-router-dom'
import PageLoader from '@/shared/components/PageLoader'
import { loginPath } from '@/shared/config/paths'
import { useAuth } from '../hooks/useAuth'

export default function RequireAuth({ children }) {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) return <PageLoader />
  if (!isAuthenticated) {
    return <Navigate to={loginPath(`${location.pathname}${location.search}`)} replace />
  }
  return children ?? <Outlet />
}
