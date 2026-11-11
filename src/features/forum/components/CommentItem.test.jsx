import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { renderWithProviders } from '@/test/render'
import CommentItem from './CommentItem'

const COMMENT = {
  id: 5,
  content: 'Empieza por Spring Initializr.',
  authorId: 8,
  authorName: 'Luis',
  likesCount: 0,
  isLikedByCurrentUser: false,
  createdAt: '2026-11-02T10:00:00',
}

function renderItem(props) {
  return renderWithProviders(
    <CommentItem
      id="comentario-5"
      comment={COMMENT}
      canDelete={false}
      likePending={false}
      onToggleLike={vi.fn()}
      onDelete={vi.fn()}
      onToggleAccepted={vi.fn()}
      {...props}
    />,
  )
}

describe('CommentItem', () => {
  it('solo quien preguntó ve el botón de mejor respuesta, con el autor en su nombre accesible', async () => {
    const onToggleAccepted = vi.fn()
    renderItem({ canAccept: true, onToggleAccepted })
    const button = screen.getByRole('button', { name: /Marcar como mejor respuesta \(respuesta de Luis\)/ })
    expect(button).toHaveAttribute('aria-pressed', 'false')

    await userEvent.click(button)
    expect(onToggleAccepted).toHaveBeenCalledWith(COMMENT)
  })

  it('sin permiso no hay botón', () => {
    renderItem({ canAccept: false })
    expect(screen.queryByRole('button', { name: /mejor respuesta/ })).not.toBeInTheDocument()
  })

  it('la mejor respuesta se señala con texto y su botón permite quitarla', () => {
    renderItem({ accepted: true, canAccept: true })
    expect(screen.getByRole('article')).toHaveTextContent('Mejor respuesta')
    expect(screen.getByRole('button', { name: /Quitar mejor respuesta/ })).toHaveAttribute('aria-pressed', 'true')
  })

  it('tiene un ancla enfocable para llegar desde un aviso', () => {
    renderItem()
    const article = screen.getByRole('article')
    expect(article).toHaveAttribute('id', 'comentario-5')
    expect(article).toHaveAttribute('tabindex', '-1')
  })
})
