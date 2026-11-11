import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { NotificationsContext } from '../hooks/notificationsContext'
import { notificationService } from '../services/notificationService'

/** Cada cuánto se pregunta al servidor por avisos nuevos mientras la pestaña está a la vista. */
export const POLL_INTERVAL = 60_000

/**
 * Número de avisos sin leer para la campanita de la cabecera. Se actualiza al iniciar sesión, al cambiar de página,
 * al volver a la pestaña y cada minuto mientras está a la vista (con la pestaña oculta no se pregunta).
 */
export default function NotificationsProvider({ children }) {
  const { user } = useAuth()
  const userId = user?.id ?? null
  const { pathname } = useLocation()
  const [state, setState] = useState({ userId: null, count: 0 })

  const refresh = useCallback(() => {
    if (userId === null) return
    notificationService.unreadCount().then(
      (count) => setState({ userId, count }),
      () => {
        // Sin conexión o con la sesión caducada la campanita conserva el último número.
      },
    )
  }, [userId])

  useEffect(() => {
    refresh()
  }, [refresh, pathname])

  useEffect(() => {
    if (userId === null) return undefined
    const whenVisible = () => document.visibilityState === 'visible' && refresh()
    const timer = window.setInterval(whenVisible, POLL_INTERVAL)
    document.addEventListener('visibilitychange', whenVisible)
    return () => {
      window.clearInterval(timer)
      document.removeEventListener('visibilitychange', whenVisible)
    }
  }, [userId, refresh])

  /** Ajuste inmediato al leer avisos, sin esperar a la siguiente consulta. */
  const adjust = useCallback(
    (update) =>
      setState((current) => ({ userId, count: Math.max(0, update(current.userId === userId ? current.count : 0)) })),
    [userId],
  )

  const value = useMemo(
    () => ({ unread: state.userId === userId && userId !== null ? state.count : 0, refresh, adjust }),
    [state, userId, refresh, adjust],
  )

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>
}
