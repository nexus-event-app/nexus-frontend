import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { renderWithProviders } from '@/test/render'
import NotificationItem from './NotificationItem'

const notification = {
  id: 1,
  type: 'COMMENT',
  actorName: 'Marta Ejemplo',
  actorAvatarUrl: null,
  discussionId: 21,
  discussionSlug: 'por-donde-empiezo',
  discussionTitle: '¿Por dónde empiezo?',
  commentId: 5,
  read: false,
  createdAt: '2026-11-02T10:00:00',
}

describe('NotificationItem', () => {
  it('lleva al comentario, marca «Sin leer» y avisa al abrirlo', async () => {
    const onOpen = vi.fn()
    renderWithProviders(<NotificationItem notification={notification} onOpen={onOpen} />)

    const link = screen.getByRole('link', { name: 'Marta Ejemplo ha respondido a tu discusión «¿Por dónde empiezo?»' })
    expect(link).toHaveAttribute('href', '/foro/21-por-donde-empiezo#comentario-5')
    expect(screen.getByText('Sin leer')).toBeInTheDocument()

    link.addEventListener('click', (event) => event.preventDefault())
    await userEvent.click(link)
    expect(onOpen).toHaveBeenCalledWith(notification)
  })

  it('las leídas no llevan la marca', () => {
    renderWithProviders(<NotificationItem notification={{ ...notification, read: true }} onOpen={() => {}} />)
    expect(screen.queryByText('Sin leer')).not.toBeInTheDocument()
  })
})
