/**
 * Composición de la rejilla de noticias en pantallas grandes (tres columnas), para que no quede todo en filas iguales.
 * Solo cambia dónde va la imagen, sin colores:
 * - `wide`: ocupa dos columnas, con la imagen al lado (a la izquierda).
 * - `default`: la tarjeta de siempre, con la imagen arriba.
 * Con una página completa (9) quedan cuatro filas llenas, con las anchas a un lado y al otro:
 * [ancha, normal] [normal, normal, normal] [normal, ancha] [ancha, normal].
 * Con otro número se busca una composición que tampoco deje huecos; si no la hay, todas normales.
 */
export const NEWS_PAGE_SIZE = 9

export function newsLayout(total) {
  const layout = Array(total).fill('default')
  if (total === NEWS_PAGE_SIZE) {
    layout[0] = 'wide'
    layout[6] = 'wide'
    layout[7] = 'wide'
  } else if (total >= 2 && total % 3 === 2) {
    // Una ancha (ocupa dos huecos) completa las filas: 2, 5, 8...
    layout[0] = 'wide'
  } else if (total >= 4 && total % 3 === 1) {
    // Dos anchas: la primera arriba y otra empezando la última fila: 4, 7...
    layout[0] = 'wide'
    layout[total - 2] = 'wide'
  }
  return layout
}
