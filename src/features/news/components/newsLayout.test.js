import { describe, expect, it } from 'vitest'
import { newsLayout } from './newsLayout'

/** Huecos que ocupa cada fila de tres columnas: ninguna debe quedar a medias. */
function rowsAreFull(layout) {
  const slots = layout.reduce((sum, variant) => sum + (variant === 'wide' ? 2 : 1), 0)
  let column = 0
  for (const variant of layout) {
    const width = variant === 'wide' ? 2 : 1
    if (column + width > 3) return false
    column = (column + width) % 3
  }
  return slots % 3 === 0
}

describe('newsLayout', () => {
  it('con una página completa alterna anchas y destacadas en color sin dejar huecos', () => {
    const layout = newsLayout(12)
    expect(layout.filter((variant) => variant === 'wide')).toHaveLength(3)
    expect(layout.filter((variant) => variant === 'spotlight')).toHaveLength(2)
    expect(rowsAreFull(layout)).toBe(true)
  })

  it.each([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])(
    'con %i noticias nunca deja una fila a medias por las anchas',
    (total) => {
      const layout = newsLayout(total)
      expect(layout).toHaveLength(total)
      if (layout.includes('wide')) expect(rowsAreFull(layout)).toBe(true)
    },
  )

  it('con pocas noticias todas son normales', () => {
    expect(newsLayout(3)).toEqual(['default', 'default', 'default'])
  })
})
