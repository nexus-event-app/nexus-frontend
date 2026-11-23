import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '@/test/render'
import OwnProfileRedirect from './OwnProfileRedirect'

describe('OwnProfileRedirect', () => {
  it('lleva a la persona a su propio perfil', () => {
    const { current } = renderWithProviders(<OwnProfileRedirect />, {
      route: '/perfil',
      auth: { user: { id: 7, name: 'Lucía Pérez', role: 'USER' } },
    })
    expect(current.location.pathname).toBe('/perfil/7-lucia-perez')
  })
})
