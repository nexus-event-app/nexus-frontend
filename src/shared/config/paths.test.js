import { describe, expect, it } from 'vitest'
import { loginPath, paths, searchPath, withQuery } from './paths'

describe('paths', () => {
  it('construye el perfil desde un usuario o desde un autor', () => {
    expect(paths.profile({ id: 7, name: 'Ana García' })).toBe('/perfil/7-ana-garcia')
    expect(paths.profile({ authorId: 7, authorName: 'Ana García' })).toBe('/perfil/7-ana-garcia')
  })

  it('codifica la búsqueda y la redirección', () => {
    expect(searchPath('  c# y .net ')).toBe('/buscar?q=c%23%20y%20.net')
    expect(searchPath('   ')).toBe('/buscar')
    expect(withQuery('/noticias', ' react ')).toBe('/noticias?q=react')
    expect(loginPath('/foro/nueva')).toBe('/login?redirect=%2Fforo%2Fnueva')
    expect(loginPath('/')).toBe('/login')
  })
})
