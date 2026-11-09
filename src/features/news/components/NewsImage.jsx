import { useState } from 'react'
import NewsCover from './NewsCover'

/**
 * Imagen de una noticia. Si no tiene, o si la imagen externa no carga (enlace roto, la web de origen la bloquea...),
 * muestra la portada por defecto de su categoría: nunca queda un hueco vacío ni el icono de imagen rota.
 */
export default function NewsImage({ url, alt = '', category, title, seed, priority = false, size }) {
  const [failedUrl, setFailedUrl] = useState(null)
  const showImage = Boolean(url) && failedUrl !== url

  return (
    <div className="aspect-[16/9] w-full overflow-hidden bg-slate-100">
      {showImage ? (
        <img
          src={url}
          alt={alt}
          width="800"
          height="450"
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          referrerPolicy={url.startsWith('http') ? 'no-referrer' : undefined}
          onError={() => setFailedUrl(url)}
          className="h-full w-full object-cover"
        />
      ) : (
        <NewsCover category={category} title={title} seed={seed} size={size} />
      )}
    </div>
  )
}
