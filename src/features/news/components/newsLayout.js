/**
 * Composición de la rejilla de noticias en pantallas grandes (tres columnas), para que no quede todo en filas iguales:
 * - `wide`: ocupa dos columnas, con la imagen a la izquierda.
 * - `spotlight`: sin imagen, sobre el degradado de la marca y con el titular más grande.
 * - `default`: la tarjeta de siempre.
 * Con una página completa (12) las anchas se alternan a izquierda y derecha y todas las filas quedan llenas:
 * [ancha, normal] [normal, destacada en color, normal] [normal, ancha] [normal, destacada en color, normal] [ancha, normal].
 * Con otro número se busca una composición que tampoco deje huecos; si no la hay, todas normales.
 */
const FULL_PAGE = 12
const FULL_PAGE_LAYOUT = { 0: 'wide', 3: 'spotlight', 6: 'wide', 8: 'spotlight', 10: 'wide' }

export function newsLayout(total) {
  const layout = Array(total).fill('default')
  if (total === FULL_PAGE) {
    Object.entries(FULL_PAGE_LAYOUT).forEach(([index, variant]) => (layout[index] = variant))
  } else if (total >= 5 && (total + 1) % 3 === 0) {
    // La primera ancha (ocupa dos huecos) completa las filas: 5, 8, 11...
    layout[0] = 'wide'
    layout[3] = 'spotlight'
  } else if (total >= 6 && total % 3 === 0) {
    layout[1] = 'spotlight'
  }
  return layout
}
