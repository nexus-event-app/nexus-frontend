import { useCallback } from 'react'
import { paths } from '@/shared/config/paths'
import { useToast } from '@/shared/hooks/useToast'
import { useNavigate } from '@/shared/i18n/useNavigate'
import { useI18n } from '@/shared/i18n/useI18n'
import { useAuth } from './useAuth'

/**
 * Cerrar sesión desde cualquier sitio: se cierra, se avisa y se va a la portada (en el idioma de la página). Si se
 * quedara en la misma página, en algunas (como tu perfil) parecería que la sesión sigue abierta.
 */
export function useLogout() {
  const { logout } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const { t } = useI18n()

  return useCallback(() => {
    logout()
    navigate(paths.home, { replace: true })
    toast.info(t('common.account.loggedOut'))
  }, [logout, navigate, toast, t])
}
