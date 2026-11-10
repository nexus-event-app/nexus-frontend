import { afterEach, describe, expect, it } from 'vitest'
import { getCurrentLanguage, setCurrentLanguage, translate } from './translate'

afterEach(() => setCurrentLanguage('es'))

describe('translate', () => {
  it('traduce una clave en cada idioma', () => {
    expect(translate('common.nav.news', {}, 'es')).toBe('Noticias')
    expect(translate('common.nav.news', {}, 'ca')).toBe('Notícies')
    expect(translate('common.nav.news', {}, 'en')).toBe('News')
  })

  it('sustituye las variables y deja intactas las que no se pasan', () => {
    expect(translate('about.story.step', { number: 3 }, 'es')).toBe('Paso 3')
    expect(translate('about.story.step', {}, 'es')).toBe('Paso {number}')
  })

  it('elige la forma de plural según {count}', () => {
    const one = translate('search.resultCount', { count: 1 }, 'es')
    const many = translate('search.resultCount', { count: 5 }, 'es')
    expect(one).toContain('1')
    expect(many).toContain('5')
    expect(one).not.toBe(many.replace('5', '1'))
  })

  it('si la clave no existe devuelve la propia clave', () => {
    expect(translate('no.existe', {}, 'en')).toBe('no.existe')
  })

  it('usa el idioma actual cuando no se indica ninguno', () => {
    setCurrentLanguage('en')
    expect(getCurrentLanguage()).toBe('en')
    expect(translate('common.nav.forum')).toBe('Forum')
  })
})
