import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '@/test/render'
import FilterLinks from './FilterLinks'

const OPTIONS = [
  { key: 'all', label: 'Todos', href: '/noticias', active: false },
  { key: 'es', label: 'Español', href: '/noticias?idioma=es', active: true },
]

describe('FilterLinks', () => {
  it.each(['chips', 'segmented'])('en la variante %s marca la opción elegida con aria-current', (variant) => {
    renderWithProviders(<FilterLinks label="Filtrar por idioma" options={OPTIONS} variant={variant} />)
    const nav = screen.getByRole('navigation', { name: 'Filtrar por idioma' })
    expect(nav).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Español' })).toHaveAttribute('aria-current', 'true')
    expect(screen.getByRole('link', { name: 'Todos' })).not.toHaveAttribute('aria-current')
  })
})
