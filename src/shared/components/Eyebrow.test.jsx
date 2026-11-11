import { act, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Eyebrow from './Eyebrow'

afterEach(() => vi.useRealTimers())

describe('Eyebrow', () => {
  it('los lectores de pantalla oyen el texto completo y lo animado queda oculto para ellos', () => {
    render(<Eyebrow>Radar tech</Eyebrow>)
    expect(screen.getByText('Radar tech', { selector: '.sr-only' })).toBeInTheDocument()
    expect(screen.getByRole('paragraph')).toHaveAccessibleName('')
    expect(screen.getByRole('paragraph')).toHaveTextContent(/^Radar tech/)
  })

  it('escribe el texto letra a letra', () => {
    vi.useFakeTimers()
    const { container } = render(<Eyebrow>Radar</Eyebrow>)
    const typed = () =>
      container.querySelector('[aria-hidden="true"].grid > span:last-child').firstChild?.textContent ?? ''
    expect(typed()).toBe('')
    // Cada letra programa la siguiente al pintarse: se avanza de una en una, como en el navegador.
    const type = (letters) => {
      for (let i = 0; i < letters; i++) act(() => vi.advanceTimersByTime(55))
    }
    type(3)
    expect(typed()).toBe('Rad')
    type(5)
    expect(typed()).toBe('Radar')
  })

  it('con «reducir movimiento» el texto aparece entero desde el principio', () => {
    const original = window.matchMedia
    window.matchMedia = (query) => ({
      matches: query.includes('reduce'),
      addEventListener() {},
      removeEventListener() {},
    })
    const { container } = render(<Eyebrow>Radar tech</Eyebrow>)
    expect(container.querySelector('[aria-hidden="true"].grid > span:last-child')).toHaveTextContent('Radar tech')
    window.matchMedia = original
  })
})
