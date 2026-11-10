import { describe, expect, it } from 'vitest'
import { validateComment, validateDiscussion } from './validators'

describe('validateDiscussion', () => {
  it('acepta una discusión completa', () => {
    expect(
      validateDiscussion({ title: '¿Por dónde empiezo?', content: 'Quiero aprender React.', category: 'HELP' }),
    ).toEqual({})
  })

  it('exige título, contenido y categoría con la longitud adecuada', () => {
    const errors = validateDiscussion({ title: 'Hola', content: 'corto', category: '' })
    expect(Object.keys(errors).sort()).toEqual(['category', 'content', 'title'])
  })

  it('no cuenta los espacios de los extremos', () => {
    expect(validateDiscussion({ title: '   abcd   ', content: 'x'.repeat(10), category: 'HELP' })).toHaveProperty(
      'title',
    )
  })
})

describe('validateComment', () => {
  it('pide entre 3 y 5000 caracteres', () => {
    expect(validateComment({ content: 'ok' })).toHaveProperty('content')
    expect(validateComment({ content: 'Gracias' })).toEqual({})
    expect(validateComment({ content: 'x'.repeat(5001) })).toHaveProperty('content')
  })
})
