import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Navigate } from '@/shared/i18n/router'
import PageLoader from '@/shared/components/PageLoader'
import { loginPath, paths, registerPath } from '@/shared/config/paths'
import { useToast } from '@/shared/hooks/useToast'
import { useI18n } from '@/shared/i18n/useI18n'
import { useAuth } from '../hooks/useAuth'

function SignUpRedirect({ to, reason }) {
  const toast = useToast()
  const { t } = useI18n()
  useEffect(() => {
    toast.info(t(reason))
  }, [toast, t, reason])
  return <Navigate to={to} replace />
}

export default function RequireAuth({ children, signUpReason }) {
  const { isAuthenticated, loading, signedOut } = useAuth()
  const location = useLocation()

  if (loading) return <PageLoader />
  if (!isAuthenticated) {
    if (signedOut) return <Navigate to={paths.home} replace />
    const back = `${location.pathname}${location.search}`
    if (signUpReason) return <SignUpRedirect to={registerPath(back)} reason={signUpReason} />
    return <Navigate to={loginPath(back)} replace />
  }
  return children ?? <Outlet />
}
