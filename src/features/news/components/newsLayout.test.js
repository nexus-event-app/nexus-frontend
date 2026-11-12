import { describe, expect, it } from 'vitest'
import { NEWS_PAGE_SIZE, newsLayout } from './newsLayout'

/** Comprueba que, en tres columnas, ninguna fila queda a medias ni una ancha se parte entre dos filas. */
function rowsAreFull(layout) {
  let column = 0
  for (const variant of layout) {
    const width = variant === 'wide' ? 2 : 1
    if (column + width > 3) return false
    column = (column + width) % 3
  }
  return column === 0
}

describe('newsLayout', () => {
  it('con una página completa (9) mezcla tres anchas y deja cuatro filas llenas', () => {
    const layout = newsLayout(NEWS_PAGE_SIZE)
    expect(layout.filter((variant) => variant === 'wide')).toHaveLength(3)
    expect(rowsAreFull(layout)).toBe(true)
  })

  it('solo usa tarjetas normales y anchas (sin colores)', () => {
    for (let total = 1; total <= NEWS_PAGE_SIZE; total += 1) {
      expect(new Set(newsLayout(total)).size).toBeLessThanOrEqual(2)
      newsLayout(total).forEach((variant) => expect(['default', 'wide']).toContain(variant))
    }
  })

  it.each([1, 2, 3, 4, 5, 6, 7, 8])('con %i noticias, si hay anchas, no deja filas a medias', (total) => {
    const layout = newsLayout(total)
    expect(layout).toHaveLength(total)
    if (layout.includes('wide')) expect(rowsAreFull(layout)).toBe(true)
  })
})
