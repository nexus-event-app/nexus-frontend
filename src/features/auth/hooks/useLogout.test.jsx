import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '@/test/render'
import { useLogout } from './useLogout'

function LogoutButton() {
  const logout = useLogout()
  return (
    <button type="button" onClick={logout}>
      Cerrar sesión
    </button>
  )
}

const user = { id: 7, name: 'Lucía Prueba', role: 'USER' }

describe('useLogout', () => {
  it('cierra la sesión, avisa y lleva a la portada desde cualquier página (también desde tu perfil)', async () => {
    const { auth, toast, current } = renderWithProviders(<LogoutButton />, {
      route: '/perfil/7-lucia-prueba',
      auth: { user },
    })
    await userEvent.click(screen.getByRole('button', { name: 'Cerrar sesión' }))

    expect(auth.logout).toHaveBeenCalledTimes(1)
    expect(toast.info).toHaveBeenCalledWith('Has cerrado sesión.')
    expect(current.location.pathname).toBe('/')
  })

  it('mantiene el idioma de la página al volver a la portada', async () => {
    const { current } = renderWithProviders(<LogoutButton />, { route: '/en/notifications', auth: { user } })
    await userEvent.click(screen.getByRole('button', { name: 'Cerrar sesión' }))
    expect(current.location.pathname).toBe('/en')
  })
})
