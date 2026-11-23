import { act, fireEvent, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { renderWithProviders } from '@/test/render'
import HeroActions from './HeroActions'

describe('HeroActions', () => {
  afterEach(() => vi.useRealTimers())

  it('los lectores de pantalla oyen la frase completa; la que se escribe es decorativa', () => {
    renderWithProviders(<HeroActions />)
    expect(
      screen.getByText(
        'Descubrimos eventos, publicamos ofertas laborales, compartimos experiencias y resolvemos dudas.',
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
    expect(typed()).toBe('Publicamos ofertas laborales')
  })

  it('se puede pausar el texto animado y reanudarlo', () => {
    vi.useFakeTimers()
    const { container } = renderWithProviders(<HeroActions />)
    const typed = () => container.querySelector('strong').textContent

    for (let step = 0; step < 40; step++) act(() => vi.advanceTimersByTime(95))
    fireEvent.click(screen.getByRole('button', { name: 'Pausar el texto animado' }))
    act(() => vi.advanceTimersByTime(20_000))
    expect(typed()).toBe('Descubrimos eventos')

    fireEvent.click(screen.getByRole('button', { name: 'Reanudar el texto animado' }))
    act(() => vi.advanceTimersByTime(2800))
    for (let step = 0; step < 40; step++) act(() => vi.advanceTimersByTime(95))
    expect(typed()).toBe('Publicamos ofertas laborales')
  })

  it('con «reducir movimiento» el texto está quieto y no hace falta el botón de pausa', () => {
    const original = window.matchMedia
    window.matchMedia = (query) => ({
      matches: query.includes('reduce'),
      addEventListener() {},
      removeEventListener() {},
    })
    try {
      renderWithProviders(<HeroActions />)
      expect(screen.queryByRole('button', { name: /pausar/i })).not.toBeInTheDocument()
    } finally {
      window.matchMedia = original
    }
  })
})
