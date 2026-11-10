import { describe, expect, it } from 'vitest'
import { buildSlugPath, parseIdSlug, slugify } from './slug'

describe('slugify', () => {
  it('quita tildes, mayúsculas y signos, igual que el backend', () => {
    expect(slugify('Ana García')).toBe('ana-garcia')
    expect(slugify('¿Cómo empiezo en React? ¡Ayuda!')).toBe('como-empiezo-en-react-ayuda')
    expect(slugify('  --Hola--  ')).toBe('hola')
  })

  it('usa el valor por defecto si no queda nada', () => {
    expect(slugify('¿¿??')).toBe('sin-titulo')
    expect(slugify(null, 'perfil')).toBe('perfil')
  })

  it('no supera los 80 caracteres ni termina en guion', () => {
    const slug = slugify('palabra '.repeat(30))
    expect(slug.length).toBeLessThanOrEqual(80)
    expect(slug.endsWith('-')).toBe(false)
  })
})

describe('parseIdSlug y buildSlugPath', () => {
  it('separan y unen el identificador y el slug', () => {
    expect(parseIdSlug('42-hola-mundo')).toEqual({ id: 42, slug: 'hola-mundo' })
    expect(parseIdSlug('7')).toEqual({ id: 7, slug: '' })
    expect(parseIdSlug('hola')).toEqual({ id: null, slug: '' })
    expect(parseIdSlug(undefined)).toEqual({ id: null, slug: '' })
    expect(buildSlugPath('/foro', { id: 42, slug: 'hola-mundo' })).toBe('/foro/42-hola-mundo')
    expect(buildSlugPath('/foro', { id: 42 })).toBe('/foro/42')
  })
})
