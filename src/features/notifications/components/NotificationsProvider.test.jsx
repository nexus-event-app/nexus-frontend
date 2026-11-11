import { act, renderHook, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { AuthContext } from '@/features/auth/hooks/authContext'
import { authValue } from '@/test/render'
import { useNotifications } from '../hooks/useNotifications'
import { notificationService } from '../services/notificationService'
import NotificationsProvider, { POLL_INTERVAL } from './NotificationsProvider'

function renderProvider(user) {
  const auth = authValue({ user })
  return renderHook(() => useNotifications(), {
    wrapper: ({ children }) => (
      <MemoryRouter>
        <AuthContext.Provider value={auth}>
          <NotificationsProvider>{children}</NotificationsProvider>
        </AuthContext.Provider>
      </MemoryRouter>
    ),
  })
}

beforeEach(() => vi.spyOn(notificationService, 'unreadCount').mockResolvedValue(2))
afterEach(() => vi.useRealTimers())

describe('NotificationsProvider', () => {
  it('sin sesión no pregunta al servidor', () => {
    const { result } = renderProvider(null)
    expect(result.current.unread).toBe(0)
    expect(notificationService.unreadCount).not.toHaveBeenCalled()
  })

  it('con sesión carga los avisos sin leer y permite ajustarlos al momento', async () => {
    const { result } = renderProvider({ id: 7, name: 'Lucía' })
    await waitFor(() => expect(result.current.unread).toBe(2))

    act(() => result.current.adjust((count) => count - 1))
    expect(result.current.unread).toBe(1)
    act(() => result.current.adjust(() => -5))
    expect(result.current.unread).toBe(0)
  })

  it('vuelve a preguntar cada minuto mientras la pestaña está a la vista', async () => {
    vi.useFakeTimers()
    renderProvider({ id: 7, name: 'Lucía' })
    expect(notificationService.unreadCount).toHaveBeenCalledTimes(1)

    await act(() => vi.advanceTimersByTimeAsync(POLL_INTERVAL))
    expect(notificationService.unreadCount).toHaveBeenCalledTimes(2)
  })
})
