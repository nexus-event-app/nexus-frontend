import { render } from '@testing-library/react'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'
import { vi } from 'vitest'
import { AuthContext } from '@/features/auth/hooks/authContext'
import { ToastContext } from '@/shared/components/toast/toastContext'
import I18nProvider from '@/shared/i18n/I18nProvider'

export function authValue(overrides = {}) {
  const user = overrides.user ?? null
  return {
    user,
    token: user ? 'token-de-prueba' : null,
    isAuthenticated: Boolean(user),
    isAdmin: user?.role === 'ADMIN',
    login: vi.fn(),
    register: vi.fn(),
    loginWithGoogle: vi.fn(),
    completeGoogleSignup: vi.fn(),
    logout: vi.fn(),
    refreshUser: vi.fn(),
    loading: false,
    signedOut: false,
    ...overrides,
  }
}

export function toastValue() {
  return { success: vi.fn(), error: vi.fn(), info: vi.fn(), show: vi.fn(), dismiss: vi.fn() }
}

function LocationProbe({ onChange }) {
  const location = useLocation()
  onChange(location)
  return null
}

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
