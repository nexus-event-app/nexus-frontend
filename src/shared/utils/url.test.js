import { describe, expect, it } from 'vitest'
import { hostnameOf, isHttpUrl, safeRedirect } from './url'

describe('safeRedirect', () => {
  it('acepta rutas internas', () => {
    expect(safeRedirect('/foro/3?page=2')).toBe('/foro/3?page=2')
  })

  // Evita redirecciones abiertas: tras iniciar sesión nunca se sale de la web.
  it.each(['https://malicioso.example', '//malicioso.example', '/\\malicioso.example', 'javascript:alert(1)', null])(
    'rechaza %s',
    (value) => {
      expect(safeRedirect(value, '/')).toBe('/')
    },
  )
})

describe('isHttpUrl y hostnameOf', () => {
  it('solo acepta http y https', () => {
    expect(isHttpUrl('https://primercommit.example')).toBe(true)
    expect(isHttpUrl('http://localhost:5173')).toBe(true)
    expect(isHttpUrl('javascript:alert(1)')).toBe(false)
    expect(isHttpUrl('no es una url')).toBe(false)
  })

  it('devuelve el dominio sin «www.»', () => {
    expect(hostnameOf('https://www.github.com/ana')).toBe('github.com')
    expect(hostnameOf('mal')).toBe('')
  })
})
