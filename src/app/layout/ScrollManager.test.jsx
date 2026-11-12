import { useEffect } from 'react'
import { act, render } from '@testing-library/react'
import { MemoryRouter, useNavigate } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import ScrollManager from './ScrollManager'

const handle = { navigate: null }
/** Guarda la función de navegar para usarla desde la prueba (en un efecto, no al pintar). */
function NavigateSpy() {
  const navigateTo = useNavigate()
  useEffect(() => {
    handle.navigate = navigateTo
  }, [navigateTo])
  return null
}

function renderAt(route) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <ScrollManager />
      <NavigateSpy />
      <h2 id="destino">Destino</h2>
    </MemoryRouter>,
  )
}

describe('ScrollManager', () => {
  let scrollIntoView

  beforeEach(() => {
    vi.useFakeTimers()
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
    scrollIntoView = vi.fn()
    Element.prototype.scrollIntoView = scrollIntoView
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('al llegar desde otra página con un ancla, baja hasta ese apartado', () => {
    renderAt('/')
    act(() => handle.navigate('/testimonios#destino'))
    act(() => vi.advanceTimersByTime(100))
    expect(scrollIntoView).toHaveBeenCalledTimes(1)
  })

  it('con un ancla dentro de la misma página no hace nada (ya lo resuelve la página)', () => {
    renderAt('/foro/21')
    act(() => handle.navigate('/foro/21#destino'))
    act(() => vi.advanceTimersByTime(1500))
    expect(scrollIntoView).not.toHaveBeenCalled()
  })

  it('sin ancla, al cambiar de página sube al principio', () => {
    renderAt('/')
    act(() => handle.navigate('/noticias'))
    expect(window.scrollTo).toHaveBeenLastCalledWith({ top: 0, left: 0, behavior: 'auto' })
  })
})
