import { useCallback, useEffect, useMemo, useState } from 'react'
import { clearSession, onUnauthorized, readSession, saveSession, SESSION_STORAGE_KEY } from '@/shared/api/session'
import { useToast } from '@/shared/hooks/useToast'
import { AuthContext } from '../hooks/authContext'
import { authService } from '../services/authService'

function isSessionRejected(error) {
  return error.status >= 400 && error.status < 500
}

export default function AuthProvider({ children }) {
  const toast = useToast()
  const [session, setSession] = useState(readSession)
  const [loading, setLoading] = useState(() => readSession() !== null)

  useEffect(() => {
    const stored = readSession()
    if (!stored) return undefined

    const controller = new AbortController()
    authService
      .me({ signal: controller.signal })
      .then(
        (user) => {
          const refreshed = { token: stored.token, user }
          saveSession(refreshed)
          setSession(refreshed)
        },
        (error) => {
          if (controller.signal.aborted || !isSessionRejected(error)) return
          clearSession()
          setSession(null)
        },
      )
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [])

  useEffect(
    () =>
      onUnauthorized(() => {
        setSession(null)
        toast.info('Tu sesión ha caducado. Inicia sesión de nuevo.')
      }),
    [toast],
  )

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === null || event.key === SESSION_STORAGE_KEY) {
        setSession(readSession())
      }
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const startSession = useCallback(async (request) => {
    const { token, user } = await request()
    const next = { token, user }
    saveSession(next)
    setSession(next)
    return user
  }, [])

  const login = useCallback((credentials) => startSession(() => authService.login(credentials)), [startSession])
  const register = useCallback((payload) => startSession(() => authService.register(payload)), [startSession])

  const logout = useCallback(() => {
    clearSession()
    setSession(null)
  }, [])

  const value = useMemo(
    () => ({
      user: session?.user ?? null,
      token: session?.token ?? null,
      isAuthenticated: session !== null,
      isAdmin: session?.user?.role === 'ADMIN',
      login,
      register,
      logout,
      loading,
    }),
    [session, login, register, logout, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
