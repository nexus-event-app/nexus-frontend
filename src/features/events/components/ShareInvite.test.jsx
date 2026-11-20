import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '@/test/render'
import ShareInvite from './ShareInvite'

describe('ShareInvite', () => {
  it('los lectores de pantalla oyen la frase completa; la palabra que cambia es decorativa', () => {
    renderWithProviders(<ShareInvite />)
    expect(
      screen.getByText(
        '¿Conoces un meetup, un hackathon, una charla o un taller que merece la pena? Compártelo: puede ser el primer paso de alguien.',
      ),
    ).toHaveClass('sr-only')
    expect(screen.getByText('Compártelo: puede ser el primer paso de alguien.')).toHaveAttribute('aria-hidden', 'true')
  })
})
