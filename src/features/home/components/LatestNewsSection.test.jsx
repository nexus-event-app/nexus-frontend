import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { newsService } from '@/features/news/services/newsService'
import { renderWithProviders } from '@/test/render'
import LatestNewsSection from './LatestNewsSection'

const base = { content: 'Resumen.', category: 'GENERAL', imageUrl: null, createdAt: '2026-11-02T10:00:00' }

describe('LatestNewsSection', () => {
  it('en la portada solo enseña noticias en castellano, aunque llegue alguna en otro idioma', async () => {
    vi.spyOn(newsService, 'latest').mockResolvedValue([
      { ...base, id: 1, slug: 'uno', title: 'Noticia en castellano', language: 'es' },
      { ...base, id: 2, slug: 'two', title: 'News in English', language: 'en' },
      { ...base, id: 3, slug: 'tres', title: 'Noticia antigua sin idioma guardado' },
    ])
    renderWithProviders(<LatestNewsSection />)
    expect(await screen.findByRole('link', { name: 'Noticia en castellano' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Noticia antigua sin idioma guardado' })).toBeInTheDocument()
    expect(screen.queryByText('News in English')).not.toBeInTheDocument()
  })

  it('si todas llegan en otro idioma, enseña el aviso de que no hay noticias', async () => {
    vi.spyOn(newsService, 'latest').mockResolvedValue([
      { ...base, id: 2, slug: 'two', title: 'News in English', language: 'en' },
    ])
    renderWithProviders(<LatestNewsSection />)
    expect(await screen.findByText('Pronto publicaremos noticias')).toBeInTheDocument()
    expect(screen.queryByText('News in English')).not.toBeInTheDocument()
  })
})
