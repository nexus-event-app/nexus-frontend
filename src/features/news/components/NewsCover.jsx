import { coverPhotoFor } from '../utils/coverPhoto'

export default function NewsCover({ category, title, seed, priority = false, className }) {
  return (
    <img
      src={coverPhotoFor({ id: seed, title, category })}
      alt=""
      width="960"
      height="540"
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
    />
  )
}
