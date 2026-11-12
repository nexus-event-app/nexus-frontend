import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '@/test/render'
import NewsGrid from './NewsGrid'

const items = (count) =>
  Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    slug: `noticia-${index + 1}`,
    title: `Noticia ${index + 1}`,
    content: 'Resumen de la noticia.',
    category: 'GENERAL',
    imageUrl: null,
    createdAt: '2026-11-02T10:00:00',
  }))

describe('NewsGrid', () => {
  it('con «featured» solo la primera lleva la etiqueta «Destacada»', () => {
    renderWithProviders(<NewsGrid items={items(12)} headingLevel="h2" varied featured />)
    const cards = screen.getAllByRole('article')
    expect(within(cards[0]).getByText('Destacada')).toBeInTheDocument()
    expect(screen.getAllByText('Destacada')).toHaveLength(1)
  })

  it('sin «featured» no destaca ninguna', () => {
    renderWithProviders(<NewsGrid items={items(12)} varied />)
    expect(screen.queryByText('Destacada')).not.toBeInTheDocument()
  })

  it('las destacadas en color también tienen titular, enlace e idioma', () => {
    renderWithProviders(<NewsGrid items={items(12)} headingLevel="h2" varied />)
    // En una página completa la cuarta es una destacada en color (sin imagen).
    const spotlight = screen.getAllByRole('article')[3]
    expect(within(spotlight).getByRole('heading', { level: 2, name: 'Noticia 4' })).toHaveAttribute('lang', 'es')
    expect(within(spotlight).getByRole('link', { name: 'Noticia 4' })).toBeInTheDocument()
  })

  it('cada tarjeta lleva a su noticia con el titular como nombre', () => {
    renderWithProviders(<NewsGrid items={items(2)} headingLevel="h2" />)
    expect(screen.getByRole('heading', { level: 2, name: 'Noticia 1' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Noticia 2' })).toHaveAttribute(
      'href',
      expect.stringContaining('noticia-2'),
    )
  })
})
