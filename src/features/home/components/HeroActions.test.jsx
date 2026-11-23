import { act, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { renderWithProviders } from '@/test/render'
import HeroActions from './HeroActions'

describe('HeroActions', () => {
  afterEach(() => vi.useRealTimers())

  it('los lectores de pantalla oyen la frase completa; la que se escribe es decorativa', () => {
    renderWithProviders(<HeroActions />)
    expect(
      screen.getByText(
        'Descubrimos eventos, encontramos prácticas y empleo, compartimos experiencias y resolvemos dudas.',
      ),
    ).toHaveClass('sr-only')
  })

  it('escribe las acciones una detrás de otra, empezando por los eventos', () => {
    vi.useFakeTimers()
    const { container } = renderWithProviders(<HeroActions />)
    const typed = () => container.querySelector('strong').textContent

    for (let step = 0; step < 40; step++) act(() => vi.advanceTimersByTime(95))
    expect(typed()).toBe('Descubrimos eventos')

    act(() => vi.advanceTimersByTime(2800))
    for (let step = 0; step < 40; step++) act(() => vi.advanceTimersByTime(95))
    expect(typed()).toBe('Encontramos prácticas y empleo')
  })
})
