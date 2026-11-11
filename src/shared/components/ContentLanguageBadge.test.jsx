import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '@/test/render'
import ContentLanguageBadge from './ContentLanguageBadge'

describe('ContentLanguageBadge', () => {
  it('marca un contenido en inglés con «EN» y su nombre completo para lectores de pantalla', () => {
    renderWithProviders(<ContentLanguageBadge language="en" />)
    expect(screen.getByText('EN')).toHaveAttribute('aria-hidden', 'true')
    expect(screen.getByText('En inglés')).toHaveClass('sr-only')
  })

  it('no aparece si el contenido está en el idioma de la página', () => {
    const { container } = renderWithProviders(<ContentLanguageBadge language="es" />)
    expect(container).toBeEmptyDOMElement()
  })

  it('en la web en inglés marca lo que está en castellano', () => {
    renderWithProviders(<ContentLanguageBadge language="es" />, { route: '/en/news' })
    expect(screen.getByText('ES')).toBeInTheDocument()
    expect(screen.getByText('In Spanish')).toBeInTheDocument()
  })
})
