import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it } from 'vitest'
import { renderWithProviders } from '@/test/render'
import BetaBanner from './BetaBanner'

describe('BetaBanner', () => {
  afterEach(() => window.localStorage.clear())

  it('no sale si la web no es la beta', () => {
    renderWithProviders(<BetaBanner enabled={false} />)
    expect(screen.queryByRole('complementary', { name: 'Beta' })).not.toBeInTheDocument()
  })

  it('explica que es una beta y lleva al foro para contar fallos e ideas', () => {
    renderWithProviders(<BetaBanner enabled />)
    const banner = screen.getByRole('complementary', { name: 'Beta' })
    expect(banner).toHaveTextContent('Estás probando la primera versión de Primer Commit')
    expect(screen.getByRole('link', { name: 'Cuéntanoslo en el foro' })).toHaveAttribute('href', '/foro')
  })

  it('se puede cerrar y no vuelve a salir en este navegador', async () => {
    const { unmount } = renderWithProviders(<BetaBanner enabled />)
    await userEvent.click(screen.getByRole('button', { name: 'Cerrar el aviso de la beta' }))
    expect(screen.queryByRole('complementary', { name: 'Beta' })).not.toBeInTheDocument()
    unmount()
    renderWithProviders(<BetaBanner enabled />)
    expect(screen.queryByRole('complementary', { name: 'Beta' })).not.toBeInTheDocument()
  })

  it('está traducido', () => {
    renderWithProviders(<BetaBanner enabled />, { route: '/en' })
    expect(screen.getByRole('link', { name: 'Tell us in the forum' })).toHaveAttribute('href', '/en/forum')
  })
})
