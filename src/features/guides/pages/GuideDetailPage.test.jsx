import { screen } from '@testing-library/react'
import { Route, Routes } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { renderWithProviders } from '@/test/render'
import GuideDetailPage from './GuideDetailPage'

vi.mock('../services/guidesService', () => ({
  guidesService: {
    get: vi.fn(() =>
      Promise.resolve({
        id: 1,
        slug: 'que-hacer-despues-de-un-bootcamp',
        title: 'Qué hacer después de un bootcamp',
        description: 'Pasos claros para seguir.',
        content:
          'Intro.\n\n## 1. Haz balance\n\nTexto con [eventos](/eventos).\n\n## 2. Programa\n\n- Uno\n\n## 3. Portfolio\n\nFin.',
        publishedAt: '2026-11-24T10:00:00',
        updatedAt: '2026-11-24T10:00:00',
      }),
    ),
  },
}))

const page = (
  <Routes>
    <Route path="/guias/:slug" element={<GuideDetailPage />} />
  </Routes>
)

describe('GuideDetailPage', () => {
  it('enseña la guía con su índice, enlaces a la web e invita a unirse a quien no tiene cuenta', async () => {
    renderWithProviders(page, { route: '/guias/que-hacer-despues-de-un-bootcamp' })
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Qué hacer después de un bootcamp' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: '1. Haz balance' })).toHaveAttribute('id', '1-haz-balance')
    const toc = screen.getByRole('navigation', { name: 'En esta píldora' })
    expect(toc.querySelector('a[href="#1-haz-balance"]')).not.toBeNull()
    expect(screen.getByRole('link', { name: 'eventos' })).toHaveAttribute('href', '/eventos')
    expect(screen.getByRole('link', { name: /Únete a la comunidad/ })).toHaveAttribute('href', '/registro')
  })

  it('con cuenta, invita a seguir en el foro', async () => {
    renderWithProviders(page, {
      route: '/guias/que-hacer-despues-de-un-bootcamp',
      auth: { user: { id: 7, name: 'Lucía' } },
    })
    expect(await screen.findByRole('link', { name: /Ir al foro/ })).toHaveAttribute('href', '/foro')
  })
})
