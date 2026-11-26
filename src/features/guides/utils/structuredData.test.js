import { describe, expect, it } from 'vitest'
import { buildGuideData } from './structuredData'

const guide = {
  slug: 'sindrome-del-impostor',
  title: 'El síndrome del impostor/a',
  description: 'Qué es y cómo gestionarlo.',
  publishedAt: '2026-11-26T10:00:00',
}

describe('buildGuideData', () => {
  it('da a buscadores e IA el idioma y las palabras clave de la píldora', () => {
    const data = buildGuideData({ ...guide, language: 'ca', keywords: ['Autoestima', 'Logros'] })
    expect(data.inLanguage).toBe('ca')
    expect(data.keywords).toBe('Autoestima, Logros')
    expect(data.mainEntityOfPage['@id']).toMatch(/\/guias\/sindrome-del-impostor$/)
  })

  it('sin palabras clave no inventa ninguna y usa el castellano', () => {
    const data = buildGuideData(guide)
    expect(data.inLanguage).toBe('es')
    expect(data).not.toHaveProperty('keywords')
  })
})
