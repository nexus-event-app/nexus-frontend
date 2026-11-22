import { cx } from '@/shared/utils/classNames'
import { initialsOf } from '@/shared/utils/text'

const TONES = ['bg-brand-900', 'bg-gray-800', 'bg-indigo-900', 'bg-violet-900', 'bg-gray-700', 'bg-brand-700']

function hashOf(text) {
  return [...text].reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) >>> 0, 7)
}

export default function CompanyMonogram({ name, muted = false, className }) {
  const label = name?.trim() || '?'
  return (
    <span
      aria-hidden="true"
      className={cx(
        'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-base font-bold tracking-wide ring-1 ring-inset',
        muted
          ? 'bg-canvas text-ink-muted ring-slate-200'
          : cx('text-white ring-white/10', TONES[hashOf(label) % TONES.length]),
        className,
      )}
    >
      {initialsOf(label)}
    </span>
  )
}
