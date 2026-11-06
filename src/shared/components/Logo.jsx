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
        <g fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 14C17 14 16 16 16 21V26C16 29 14 31 11 32C14 33 16 35 16 38V43C16 48 17 50 22 50" />
          <path d="M42 14C47 14 48 16 48 21V26C48 29 50 31 53 32C50 33 48 35 48 38V43C48 48 47 50 42 50" />
        </g>
        <path d="M27 24L40 32L27 40Z" fill="#fff" stroke="#fff" strokeWidth="3" strokeLinejoin="round" />
      </svg>
      {showName && <span className="text-xl font-extrabold tracking-tight text-ink">{siteConfig.name}</span>}
    </span>
  )
}
