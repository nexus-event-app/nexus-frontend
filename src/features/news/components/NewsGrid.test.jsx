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
  it('ninguna tarjeta lleva la etiqueta «Destacada» ni va sin imagen', () => {
    renderWithProviders(<NewsGrid items={items(9)} headingLevel="h2" varied />)
    expect(screen.queryByText('Destacada')).not.toBeInTheDocument()
    screen.getAllByRole('article').forEach((card) => expect(within(card).getByRole('figure')).toBeInTheDocument())
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
