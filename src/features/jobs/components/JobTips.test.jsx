import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '@/test/render'
import JobTips from './JobTips'

describe('JobTips', () => {
  it('muestra cuatro tarjetas de consejos con el título del apartado fuera', () => {
    renderWithProviders(<JobTips />)
    const section = screen.getByRole('region', { name: 'Consejos para que te encuentren' })
    const cards = within(section).getAllByRole('article')
    expect(cards.map((card) => within(card).getByRole('heading', { level: 3 }).textContent)).toEqual([
      'Tu LinkedIn al día',
      'Hazte visible',
      'Un buen CV',
      'Carta de presentación',
    ])
    for (const card of cards) {
      expect(within(card).getAllByRole('listitem')).toHaveLength(3)
      expect(card).not.toContainElement(screen.getByRole('heading', { level: 2 }))
    }
  })

  it('está traducido', () => {
    renderWithProviders(<JobTips />, { route: '/en/jobs' })
    expect(screen.getByRole('heading', { level: 2, name: 'Tips to get noticed' })).toBeInTheDocument()
  })
})
