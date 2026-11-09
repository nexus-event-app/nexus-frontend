import Icon from '@/shared/components/Icon'

export default function NewsImage({ url, alt = '', priority = false }) {
  return (
    <div className="aspect-[16/9] w-full overflow-hidden bg-slate-100">
      {url ? (
        <img
          src={url}
          alt={alt}
          width="800"
          height="450"
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          referrerPolicy={url.startsWith('http') ? 'no-referrer' : undefined}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent-tint to-accent-soft text-accent" aria-hidden="true">
          <Icon name="newspaper" className="h-12 w-12" />
        </div>
      )}
    </div>
  )
}
