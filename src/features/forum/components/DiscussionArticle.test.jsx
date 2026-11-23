import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { renderWithProviders } from '@/test/render'
import DiscussionArticle from './DiscussionArticle'

const DISCUSSION = {
  id: 21,
  slug: 'por-donde-empiezo',
  title: '¿Por dónde empiezo con Java?',
  content: 'Estoy terminando un bootcamp y quiero reforzar Java.',
  category: 'AYUDA_TECNICA',
  authorId: 7,
  authorName: 'Lucía',
  commentCount: 0,
  likesCount: 3,
  acceptedCommentId: null,
  createdAt: '2026-11-18T10:00:00',
}

const LONG = Array.from({ length: 14 }, (_, i) => `Línea ${i + 1} de la presentación.`).join('\n')

describe('DiscussionArticle', () => {
  it('un texto corto se ve entero, sin «Leer más»', () => {
    renderWithProviders(<DiscussionArticle discussion={DISCUSSION} commentCount={0} onChange={vi.fn()} />)
    expect(screen.getByText(DISCUSSION.content)).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /Leer más/ })).not.toBeInTheDocument()
  })

  it('un texto largo sale plegado y «Leer más» lo abre entero', async () => {
    renderWithProviders(
      <DiscussionArticle discussion={{ ...DISCUSSION, content: LONG }} commentCount={0} onChange={vi.fn()} />,
    )
    expect(screen.queryByText(/Línea 14/)).not.toBeInTheDocument()
    const more = screen.getByRole('button', { name: /Leer más/ })
    expect(more).toHaveAttribute('aria-expanded', 'false')
    await userEvent.click(more)
    expect(screen.getByText(/Línea 14/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Leer menos/ })).toHaveAttribute('aria-expanded', 'true')
  })

  it('una discusión retenida explica a su autora que está pendiente de revisión', () => {
    renderWithProviders(
      <DiscussionArticle discussion={{ ...DISCUSSION, held: true }} commentCount={0} onChange={vi.fn()} />,
    )
    expect(screen.getByRole('status')).toHaveTextContent('Pendiente de revisión')
  })

  it('sin retener no muestra el aviso', () => {
    renderWithProviders(<DiscussionArticle discussion={DISCUSSION} commentCount={0} onChange={vi.fn()} />)
    expect(screen.queryByText('Pendiente de revisión')).not.toBeInTheDocument()
  })

  it('sin sesión, «Me gusta» lleva a iniciar sesión y vuelve a la discusión', async () => {
    const { toast, current } = renderWithProviders(
      <DiscussionArticle discussion={DISCUSSION} commentCount={0} onChange={vi.fn()} />,
      { route: '/foro/21-por-donde-empiezo' },
    )
    await userEvent.click(screen.getByRole('button', { name: /Me gusta/ }))
    expect(toast.info).toHaveBeenCalled()
    expect(current.location.pathname).toBe('/login')
    expect(current.location.search).toBe('?redirect=%2Fforo%2F21-por-donde-empiezo')
  })
})
