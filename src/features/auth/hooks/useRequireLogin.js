import { useLocation } from 'react-router-dom'
import { loginPath } from '@/shared/config/paths'
import { useToast } from '@/shared/hooks/useToast'
import { useNavigate } from '@/shared/i18n/useNavigate'
import { useAuth } from './useAuth'

export function useRequireLogin() {
  const { isAuthenticated } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const { pathname, search } = useLocation()

  return (message) => {
    if (isAuthenticated) return false
    if (message) toast.info(message)
    navigate(loginPath(`${pathname}${search}`))
    return true
  }
}
