import { siteConfig } from '@/shared/config/site'
import { cx } from '@/shared/utils/classNames'

/** Logo de Primer Commit. `inverse`: versión clara para fondos de color (el pie morado). */
export default function Logo({ showName = true, inverse = false, className = '' }) {
  const background = inverse ? '#ffffff' : '#4f46e5'
  const stroke = inverse ? '#4338ca' : '#ffffff'
  return (
    <span className={cx('inline-flex items-center gap-2', className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        width="36"
        height="36"
        className="h-9 w-9 shrink-0"
        aria-hidden="true"
        focusable="false"
      >
        <rect width="64" height="64" rx="14" fill={background} />
        <circle cx="21" cy="32" r="8" fill="none" stroke={stroke} strokeWidth="4.5" />
        <path
          d="M29 32H49M42 24.5 49.5 32 42 39.5"
          fill="none"
          stroke={stroke}
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {showName && (
        <span className={cx('text-xl font-extrabold tracking-tight', inverse ? 'text-white' : 'text-ink')}>
          {siteConfig.name}
        </span>
      )}
    </span>
  )
}
