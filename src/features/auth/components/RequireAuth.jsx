import { Outlet, useLocation } from 'react-router-dom'
import { Navigate } from '@/shared/i18n/router'
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
