import { render } from '@testing-library/react'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'
import { vi } from 'vitest'
import { AuthContext } from '@/features/auth/hooks/authContext'
import { ToastContext } from '@/shared/components/toast/toastContext'
import I18nProvider from '@/shared/i18n/I18nProvider'

/** Sesión de prueba: sin iniciar sesión salvo que la prueba pase otro usuario. */
export function authValue(overrides = {}) {
  const user = overrides.user ?? null
  return {
    user,
    token: user ? 'token-de-prueba' : null,
    isAuthenticated: Boolean(user),
    isAdmin: user?.role === 'ADMIN',
    login: vi.fn(),
    register: vi.fn(),
    logout: vi.fn(),
    refreshUser: vi.fn(),
    loading: false,
    ...overrides,
  }
}

export function toastValue() {
  return { success: vi.fn(), error: vi.fn(), info: vi.fn(), show: vi.fn(), dismiss: vi.fn() }
}

/** Guarda la dirección actual para que las pruebas puedan comprobar a dónde se ha navegado. */
function LocationProbe({ onChange }) {
  const location = useLocation()
  onChange(location)
  return null
}

/**
 * Pinta un componente con todo lo que necesita la web (router, idioma, sesión y avisos). Devuelve además la sesión,
 * los avisos y la dirección actual para hacer comprobaciones.
 */
export function renderWithProviders(ui, { route = '/', auth, toast } = {}) {
  const session = authValue(auth)
  const toasts = toast ?? toastValue()
  const current = { location: null }
  const result = render(
    <MemoryRouter initialEntries={[route]}>
      <AuthContext.Provider value={session}>
        <ToastContext.Provider value={toasts}>
          <I18nProvider>
            <Routes>
              <Route path="*" element={ui} />
            </Routes>
            <LocationProbe onChange={(location) => (current.location = location)} />
          </I18nProvider>
        </ToastContext.Provider>
      </AuthContext.Provider>
    </MemoryRouter>,
  )
  return { ...result, auth: session, toast: toasts, current }
}
