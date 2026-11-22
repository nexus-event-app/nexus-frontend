import { CATEGORY_TOPICS, COVER_PHOTOS, RELATED_TOPICS } from '../config/coverPhotos'
import { coverTopic, hashOf } from './coverTopic'

export function coverPhotoFor({ id, title, category }) {
  const index = Number.isInteger(Number(id)) && id !== null && id !== undefined ? Number(id) : hashOf(title)
  const candidates = CATEGORY_TOPICS[category] ?? CATEGORY_TOPICS.GENERAL
  const topic = coverTopic(title) ?? candidates[index % candidates.length]
  const photos = [topic, ...RELATED_TOPICS[topic]].flatMap((name) => COVER_PHOTOS[name])
  return photos[index % photos.length]
}
