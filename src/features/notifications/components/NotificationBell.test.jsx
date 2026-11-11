import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { renderWithProviders } from '@/test/render'
import { NotificationsContext } from '../hooks/notificationsContext'
import NotificationBell from './NotificationBell'

function renderBell(unread, route = '/') {
  return renderWithProviders(
    <NotificationsContext.Provider value={{ unread, refresh: vi.fn(), adjust: vi.fn() }}>
      <NotificationBell />
    </NotificationsContext.Provider>,
    { route },
  )
}

describe('NotificationBell', () => {
  it('sin avisos solo dice «Notificaciones»', () => {
    renderBell(0)
    expect(screen.getByRole('link', { name: 'Notificaciones' })).toHaveAttribute('href', '/notificaciones')
  })

  it('anuncia cuántos avisos hay sin leer y abrevia los números grandes', () => {
    const { container, unmount } = renderBell(3)
    expect(screen.getByRole('link', { name: 'Notificaciones: 3 sin leer' })).toBeInTheDocument()
    expect(container).toHaveTextContent('3')
    unmount()

    renderBell(27, '/en')
    const link = screen.getByRole('link', { name: 'Notifications: 27 unread' })
    expect(link).toHaveAttribute('href', '/en/notifications')
    expect(link).toHaveTextContent('9+')
  })

  it('se marca como página actual en la página de avisos', () => {
    renderBell(0, '/notificaciones')
    expect(screen.getByRole('link', { name: 'Notificaciones' })).toHaveAttribute('aria-current', 'page')
  })
})
