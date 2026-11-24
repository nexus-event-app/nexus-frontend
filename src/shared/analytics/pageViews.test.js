import { afterEach, describe, expect, it, vi } from 'vitest'
import { anonymousPath, countPageView, goatCounterEndpoint, pageViewUrl, shouldCount } from './pageViews'

describe('estadísticas de visitas', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('solo cuenta si hay una cuenta de GoatCounter válida', () => {
    expect(goatCounterEndpoint('primercommit')).toBe('https://primercommit.goatcounter.com/count')
    expect(goatCounterEndpoint('')).toBeNull()
    expect(goatCounterEndpoint(undefined)).toBeNull()
    expect(goatCounterEndpoint('evil.com/x?')).toBeNull()
  })

  it('las direcciones de los perfiles se cuentan sin el nombre de la persona', () => {
    expect(anonymousPath('/perfil/7-lucia-perez')).toBe('/perfil')
    expect(anonymousPath('/en/profile/7-lucia-perez')).toBe('/en/profile')
    expect(anonymousPath('/perfil/editar')).toBe('/perfil')
    expect(anonymousPath('/foro/21-por-donde-empiezo')).toBe('/foro/21-por-donde-empiezo')
    expect(anonymousPath('')).toBe('/')
  })

  it('no cuenta las pruebas automáticas ni el ordenador de desarrollo', () => {
    expect(shouldCount({ hostname: 'primercommit.es', webdriver: false })).toBe(true)
    expect(shouldCount({ hostname: 'primercommit.es', webdriver: true })).toBe(false)
    expect(shouldCount({ hostname: 'localhost', webdriver: false })).toBe(false)
  })

  it('envía la página, el título y la web de origen, nunca los parámetros de la dirección', () => {
    const url = new URL(
      pageViewUrl('https://primercommit.goatcounter.com/count', {
        path: '/eventos',
        title: 'Eventos',
        referrer: 'https://www.linkedin.com',
        screenWidth: 390,
      }),
    )
    expect(url.searchParams.get('p')).toBe('/eventos')
    expect(url.searchParams.get('t')).toBe('Eventos')
    expect(url.searchParams.get('r')).toBe('https://www.linkedin.com')
    expect(url.searchParams.get('s')).toBe('390')
  })

  it('sin cuenta configurada no hace ninguna petición', () => {
    const image = vi.fn()
    vi.stubGlobal('Image', image)
    expect(countPageView('/eventos', null)).toBe(false)
    expect(image).not.toHaveBeenCalled()
  })
})
