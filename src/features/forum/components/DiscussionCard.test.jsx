import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '@/test/render'
import DiscussionCard from './DiscussionCard'

const DISCUSSION = {
  id: 21,
  slug: 'por-donde-empiezo',
  title: '¿Por dónde empiezo con Java?',
  content: 'Estoy terminando un bootcamp y quiero reforzar Java.',
  category: 'AYUDA_TECNICA',
  authorId: 7,
  authorName: 'Lucía',
  commentCount: 2,
  likesCount: 3,
  acceptedCommentId: null,
  createdAt: new Date().toISOString().slice(0, 19),
}

describe('DiscussionCard', () => {
  it('muestra categoría, título enlazado, autora, respuestas y me gusta', () => {
    renderWithProviders(<DiscussionCard discussion={DISCUSSION} />)
    expect(screen.getByText('Ayuda técnica')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: DISCUSSION.title })).toHaveAttribute('href', '/foro/21-por-donde-empiezo')
    expect(screen.getByRole('link', { name: 'Lucía' })).toHaveAttribute('href', '/perfil/7-lucia')
    expect(screen.getByText('2 respuestas')).toBeInTheDocument()
    expect(screen.getByText('me gusta')).toHaveClass('sr-only')
    expect(screen.getByText('hoy')).toBeInTheDocument()
  })

  it.each([
    [{ acceptedCommentId: 5, commentCount: 12 }, 'Resuelta'],
    [{ commentCount: 6 }, 'Popular'],
    [{ likesCount: 10 }, 'Popular'],
    [{ commentCount: 0 }, 'Sin respuesta'],
  ])('destaca su estado %j como «%s»', (changes, label) => {
    renderWithProviders(<DiscussionCard discussion={{ ...DISCUSSION, ...changes }} />)
    expect(screen.getByText(label)).toBeInTheDocument()
  })

  it('en singular dice «1 respuesta» y sin estado especial no muestra etiqueta', () => {
    renderWithProviders(<DiscussionCard discussion={{ ...DISCUSSION, commentCount: 1 }} />)
    expect(screen.getByText('1 respuesta')).toBeInTheDocument()
    expect(screen.queryByText(/Resuelta|Popular|Sin respuesta/)).not.toBeInTheDocument()
  })

  it('enseña bastante del mensaje para entender de qué va (hasta unos 320 caracteres)', () => {
    const content = 'Llevo dos meses con Java y Spring. '.repeat(8).trim()
    renderWithProviders(<DiscussionCard discussion={{ ...DISCUSSION, content }} />)
    const shown = screen.getByText(/^Llevo dos meses con Java/).textContent
    expect(shown.length).toBeGreaterThan(250)
    expect(shown.length).toBeLessThanOrEqual(321)
  })
})
