import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { NotificationsContext } from '../hooks/notificationsContext'
import { notificationService } from '../services/notificationService'

export const POLL_INTERVAL = 60_000

export default function NotificationsProvider({ children }) {
  const { user } = useAuth()
  const userId = user?.id ?? null
  const { pathname } = useLocation()
  const [state, setState] = useState({ userId: null, count: 0 })

  const refresh = useCallback(() => {
    if (userId === null) return
    notificationService.unreadCount().then(
      (count) => setState({ userId, count }),
      () => {},
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
