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
    expect(regions.length).toBeGreaterThanOrEqual(5)
    regions.forEach((region) => expect(region).toHaveAccessibleName())
  })

  it('no usa ningún <div>', () => {
    const { container } = renderWithProviders(<AboutPage />, { route: '/sobre-el-proyecto' })
    expect(container.querySelectorAll('div')).toHaveLength(0)
  })

  it('se traduce y enlaza a las secciones en el idioma de la página', () => {
    renderWithProviders(<AboutPage />, { route: '/en/about' })
    expect(screen.getByRole('heading', { level: 2, name: 'Starting out shouldn’t be this hard' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Junior jobs/ })).toHaveAttribute('href', '/en/jobs')
  })

  it('«¿Te unes?» lleva a crear cuenta y solo se muestra a quien aún no la tiene', () => {
    const { unmount } = renderWithProviders(<AboutPage />, { route: '/sobre-el-proyecto' })
    const join = screen.getByRole('region', { name: '¿Te unes?' })
    expect(within(join).getAllByRole('link')).toHaveLength(1)
    expect(within(join).getByRole('link', { name: 'Crear cuenta' })).toHaveAttribute('href', '/registro')
    unmount()
    renderWithProviders(<AboutPage />, { route: '/sobre-el-proyecto', auth: { user: { id: 1, name: 'Ana' } } })
    expect(screen.queryByRole('region', { name: '¿Te unes?' })).not.toBeInTheDocument()
  })

  it('los antetítulos no repiten la miga de pan ni el título de su apartado', () => {
    renderWithProviders(<AboutPage />, { route: '/sobre-el-proyecto' })
    const main = screen.getByRole('main')
    const eyebrows = [...main.querySelectorAll('hgroup > p:first-child .sr-only')].map((node) => node.textContent)
    const titles = within(main)
      .getAllByRole('heading')
      .map((heading) => heading.textContent)
    expect(eyebrows).toHaveLength(5)
    expect(eyebrows).not.toContain('Sobre el proyecto')
    eyebrows.forEach((eyebrow) => expect(titles).not.toContain(eyebrow))
  })

  it('cuenta la historia como pasos en orden, sin códigos que no entiende nadie', () => {
    renderWithProviders(<AboutPage />)
    const story = screen.getByRole('region', { name: 'De una idea a una comunidad' })
    const steps = within(story).getAllByRole('listitem')
    expect(steps.map((step) => within(step).getByRole('heading', { level: 3 }).textContent)).toEqual([
      'La idea',
      'La construcción',
      'El lanzamiento',
      'Lo siguiente',
    ])
    expect(steps[0]).toHaveTextContent('Paso 1')
    expect(steps[3]).toHaveTextContent('Próximamente')
    expect(story).not.toHaveTextContent(/a1f3c2e|HEAD/)
  })

  it('el bloque de colaboración usa el texto nuevo y ya no está «Cómo funcionamos»', () => {
    renderWithProviders(<AboutPage />, { route: '/sobre-el-proyecto' })
    expect(screen.getByRole('heading', { level: 2, name: 'Crezcamos juntas y juntos' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Cómo funcionamos' })).not.toBeInTheDocument()
  })
})
