/** Palabras por minuto de una lectura tranquila (en castellano e inglés ronda las 200-250). */
const WORDS_PER_MINUTE = 200

/** Minutos que se tarda en leer un texto, redondeando hacia arriba y nunca menos de uno. */
export function readingMinutes(text) {
  const words = (text ?? '').trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))
}
