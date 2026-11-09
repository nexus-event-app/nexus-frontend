import { coverPhotoFor } from '../utils/coverPhoto'

/** Foto de portada por defecto de una noticia (ver coverPhotoFor). Es decorativa: el titular ya aparece al lado. */
export default function NewsCover({ category, title, seed, priority = false }) {
  return (
    <img
      src={coverPhotoFor({ id: seed, title, category })}
      alt=""
      width="960"
      height="540"
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className="h-full w-full object-cover"
    />
  )
}
