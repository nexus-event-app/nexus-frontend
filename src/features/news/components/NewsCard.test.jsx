import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '@/test/render'
import NewsCard from './NewsCard'

const ITEM = {
  id: 3,
  slug: 'react-19',
  title: 'What is new in React 19',
  content: 'A quick tour of the new features.',
  category: 'DESARROLLO',
  imageUrl: null,
  createdAt: '2026-11-02T10:00:00',
  imported: true,
  source: 'DEV Community',
}

describe('NewsCard', () => {
  it('marca el idioma del titular y del resumen de una noticia en inglés', () => {
    renderWithProviders(<NewsCard item={{ ...ITEM, language: 'en' }} />)
    expect(screen.getByRole('heading', { name: ITEM.title })).toHaveAttribute('lang', 'en')
    expect(screen.getByText(ITEM.content)).toHaveAttribute('lang', 'en')
    expect(screen.getByText('En inglés')).toBeInTheDocument()
  })

  it('sin idioma guardado la considera en castellano y no añade etiqueta', () => {
    renderWithProviders(<NewsCard item={{ ...ITEM, title: 'Novedades de React 19' }} />)
    expect(screen.getByRole('heading', { name: 'Novedades de React 19' })).toHaveAttribute('lang', 'es')
    expect(screen.queryByText('En inglés')).not.toBeInTheDocument()
  })
})
