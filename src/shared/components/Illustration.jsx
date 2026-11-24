import { cx } from '@/shared/utils/classNames'

export default function Illustration({ src, still, width, height, animation = 'float', className }) {
  const image = (
    <img
      src={src}
      alt=""
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      className={cx(
        'h-auto w-full transition-transform duration-500 ease-out group-hover/illustration:-rotate-2 group-hover/illustration:scale-105',
        { heartbeat: 'animate-heartbeat', nudge: 'animate-nudge' }[animation] ?? 'animate-float',
      )}
    />
  )
  return (
    <figure aria-hidden="true" className={cx('group/illustration', className)}>
      {still ? (
        <picture>
          <source media="(prefers-reduced-motion: reduce)" srcSet={still} />
          {image}
        </picture>
      ) : (
        image
      )}
    </figure>
  )
}
