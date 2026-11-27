import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '@/test/render'
import HomeJoinBanner from './HomeJoinBanner'

describe('HomeJoinBanner', () => {
  it('sin sesión invita a crear una cuenta con lo que se gana y un acceso para quien ya la tiene', () => {
    renderWithProviders(<HomeJoinBanner />)
    const banner = screen.getByRole('complementary', { name: '¿Te animas a participar? Únete gratis' })
    expect(
      within(banner)
        .getAllByRole('listitem')
        .map((item) => item.textContent),
    ).toEqual([
      'Comparte eventos',
      'Guarda ofertas para revisarlas luego',
      'Pregunta y responde en el foro',
      'Guarda tu progreso en las rutas',
      'Crear mi cuenta gratis',
      'Ya tengo cuenta',
    ])
    expect(within(banner).getByRole('link', { name: 'Crear mi cuenta gratis' })).toHaveAttribute('href', '/registro')
    expect(within(banner).getByRole('link', { name: 'Ya tengo cuenta' })).toHaveAttribute('href', '/login')
  })

  it('con sesión no se muestra', () => {
    renderWithProviders(<HomeJoinBanner />, { auth: { user: { id: 7, name: 'Lucía' } } })
    expect(screen.queryByRole('complementary')).not.toBeInTheDocument()
  })
})
