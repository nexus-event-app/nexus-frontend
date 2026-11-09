import { CATEGORY_TOPICS, COVER_PHOTOS, RELATED_TOPICS } from '../config/coverPhotos'
import { coverTopic, hashOf } from './coverTopic'

/**
 * Foto de portada para una noticia sin imagen propia: una foto real de tecnología acorde al tema del titular
 * (IA, seguridad, cloud, empleo...) o, si no lo deja claro, a su categoría. Entre las fotos de cada tema se
 * elige siempre la misma para la misma noticia, y varía de una noticia a otra.
 */
export function coverPhotoFor({ id, title, category }) {
  // Con el id, noticias consecutivas del mismo tema van rotando de foto; sin id, se usa el titular.
  const index = Number.isInteger(Number(id)) && id !== null && id !== undefined ? Number(id) : hashOf(title)
  const candidates = CATEGORY_TOPICS[category] ?? CATEGORY_TOPICS.GENERAL
  const topic = coverTopic(title) ?? candidates[index % candidates.length]
  // Primero las del tema y después las de temas parecidos: más variedad sin perder la relación.
  const photos = [topic, ...RELATED_TOPICS[topic]].flatMap((name) => COVER_PHOTOS[name])
  return photos[index % photos.length]
}
