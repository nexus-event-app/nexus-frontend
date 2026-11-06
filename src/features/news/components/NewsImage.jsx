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
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-100 to-brand-50 text-brand-700" aria-hidden="true">
          <Icon name="newspaper" className="h-12 w-12" />
        </div>
      )}
    </div>
  )
}
