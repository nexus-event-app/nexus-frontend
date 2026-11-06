import { siteConfig } from '@/shared/config/site'

export default function Logo({ showName = true, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        width="36"
        height="36"
        className="h-9 w-9 shrink-0"
        aria-hidden="true"
        focusable="false"
      >
        <rect width="64" height="64" rx="14" fill="#4f46e5" />
        <circle cx="21" cy="32" r="8" fill="none" stroke="#fff" strokeWidth="4.5" />
        <path
          d="M29 32H49M42 24.5 49.5 32 42 39.5"
          fill="none"
          stroke="#fff"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {showName && <span className="text-xl font-extrabold tracking-tight text-ink">{siteConfig.name}</span>}
    </span>
  )
}
