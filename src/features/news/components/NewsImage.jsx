import { useState } from 'react'
import { cx } from '@/shared/utils/classNames'
import NewsCover from './NewsCover'

const IMAGE_CLASSES = 'aspect-[16/9] w-full bg-slate-100 object-cover'

export default function NewsImage({ url, alt = '', category, title, seed, priority = false, className }) {
  const [failedUrl, setFailedUrl] = useState(null)

  if (!url || failedUrl === url) {
    return (
      <NewsCover
        category={category}
        title={title}
        seed={seed}
        priority={priority}
        className={cx(IMAGE_CLASSES, className)}
      />
    )
  }
  return (
    <img
      src={url}
      alt={alt}
      width="800"
      height="450"
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      referrerPolicy={url.startsWith('http') ? 'no-referrer' : undefined}
      onError={() => setFailedUrl(url)}
      className={cx(IMAGE_CLASSES, className)}
    />
  )
}
