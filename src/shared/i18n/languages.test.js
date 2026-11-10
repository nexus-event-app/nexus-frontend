import { describe, expect, it } from 'vitest'
import { langFromPath, localizePath, localizeTo, routeSegment, routeSubsegment, stripLang } from './languages'

describe('langFromPath', () => {
  it.each([
    ['/', 'es'],
    ['/noticias', 'es'],
    ['/ca', 'ca'],
    ['/ca/noticies', 'ca'],
    ['/en/news?page=2', 'en'],
    // «/english» no es el prefijo «/en»: el idioma solo cuenta si es un segmento completo.
    ['/english', 'es'],
  ])('%s está en «%s»', (path, lang) => {
    expect(langFromPath(path)).toBe(lang)
  })
})

describe('localizePath', () => {
  it('traduce el prefijo y las secciones', () => {
    expect(localizePath('/noticias', 'en')).toBe('/en/news')
    expect(localizePath('/empleo/guardadas', 'ca')).toBe('/ca/feina/desades')
    expect(localizePath('/sobre-el-proyecto', 'en')).toBe('/en/about')
  })

  it('conserva los identificadores, la búsqueda y el ancla', () => {
    expect(localizePath('/noticias/3-hola-mundo?page=2#top', 'en')).toBe('/en/news/3-hola-mundo?page=2#top')
  })

  it('la portada de cada idioma es solo el prefijo', () => {
    expect(localizePath('/', 'ca')).toBe('/ca')
    expect(localizePath('/?q=react', 'en')).toBe('/en?q=react')
    expect(localizePath('/en', 'es')).toBe('/')
  })

  it('es idempotente y acepta rutas ya traducidas a cualquier idioma', () => {
    expect(localizePath('/en/news', 'en')).toBe('/en/news')
    expect(localizePath('/en/news', 'ca')).toBe('/ca/noticies')
    expect(localizePath('/ca/feina', 'es')).toBe('/empleo')
  })

  it('no traduce el panel de administración ni los destinos externos o relativos', () => {
    expect(localizePath('/admin/noticias', 'en')).toBe('/admin/noticias')
    expect(localizePath('https://example.com', 'en')).toBe('https://example.com')
    expect(localizePath('?page=2', 'en')).toBe('?page=2')
  })

  it('usa el castellano si el idioma no existe', () => {
    expect(localizePath('/en/news', 'fr')).toBe('/noticias')
  })
})

describe('stripLang', () => {
  it('devuelve la ruta interna en castellano', () => {
    expect(stripLang('/en/news/3-x?page=2')).toBe('/noticias/3-x?page=2')
    expect(stripLang('/ca')).toBe('/')
    expect(stripLang('/foro')).toBe('/foro')
  })
})

describe('localizeTo', () => {
  it('traduce destinos de texto y objetos con pathname', () => {
    expect(localizeTo('/foro', 'en')).toBe('/en/forum')
    expect(localizeTo({ pathname: '/foro', search: '?page=2' }, 'en')).toEqual({
      pathname: '/en/forum',
      search: '?page=2',
    })
    expect(localizeTo(-1, 'en')).toBe(-1)
  })
})

describe('routeSegment y routeSubsegment', () => {
  it('dan el nombre de la sección en cada idioma', () => {
    expect(routeSegment('noticias', 'es')).toBe('noticias')
    expect(routeSegment('noticias', 'en')).toBe('news')
    expect(routeSegment('desconocida', 'en')).toBe('desconocida')
    expect(routeSubsegment('empleo', 'guardadas', 'en')).toBe('saved')
  })
})
