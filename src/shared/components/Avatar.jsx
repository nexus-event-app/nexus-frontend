import { useState } from 'react'
import { cx } from '@/shared/utils/classNames'
import { initialsOf } from '@/shared/utils/text'

const SIZES = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-16 w-16 text-xl',
  xl: 'h-24 w-24 text-3xl sm:h-28 sm:w-28',
}

/** Foto de perfil o, si no hay (o no carga), las iniciales. Es decorativa: el nombre siempre aparece al lado. */
export default function Avatar({ name, src, size = 'md', className }) {
  const [failedSrc, setFailedSrc] = useState(null)
  const showImage = Boolean(src) && failedSrc !== src
  const classes = cx('flex shrink-0 items-center justify-center overflow-hidden rounded-full', SIZES[size], className)

  if (showImage) {
    return (
      <img
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        width="256"
        height="256"
        onError={() => setFailedSrc(src)}
        className={cx(classes, 'bg-slate-100 object-cover')}
      />
    )
  }
  return (
    <span className={cx(classes, 'bg-accent-tint font-bold text-accent-strong')} aria-hidden="true">
      {initialsOf(name)}
    </span>
  )
}
