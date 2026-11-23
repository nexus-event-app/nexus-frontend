import { Navigate } from '@/shared/i18n/router'
import { paths } from '@/shared/config/paths'
import { useAuth } from '@/features/auth/hooks/useAuth'

export default function OwnProfileRedirect() {
  const { user } = useAuth()
  return <Navigate to={paths.profile(user)} replace />
}
