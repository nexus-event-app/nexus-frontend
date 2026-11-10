import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '@/test/render'
import AboutPage from './AboutPage'

describe('AboutPage', () => {
  it('tiene un único h1 dentro de main y cada sección con su título', () => {
    renderWithProviders(<AboutPage />, { route: '/sobre-el-proyecto' })
    const main = screen.getByRole('main')

    expect(within(main).getAllByRole('heading', { level: 1 })).toHaveLength(1)
    const regions = within(main).getAllByRole('region')
    expect(regions.length).toBeGreaterThanOrEqual(6)
    regions.forEach((region) => expect(region).toHaveAccessibleName())
  })

  it('no usa ningún <div>', () => {
    const { container } = renderWithProviders(<AboutPage />, { route: '/sobre-el-proyecto' })
    expect(container.querySelectorAll('div')).toHaveLength(0)
  })

  it('se traduce y enlaza a las secciones en el idioma de la página', () => {
    renderWithProviders(<AboutPage />, { route: '/en/about' })
    expect(screen.getByRole('heading', { level: 2, name: 'Why it exists' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Junior jobs/ })).toHaveAttribute('href', '/en/jobs')
  })

  it('invita a registrarse solo a quien no tiene cuenta', () => {
    renderWithProviders(<AboutPage />, { route: '/sobre-el-proyecto', auth: { user: { id: 1, name: 'Ana' } } })
    expect(screen.queryByRole('link', { name: 'Crear cuenta gratis' })).not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Ir al foro' })).toBeInTheDocument()
  })
})
