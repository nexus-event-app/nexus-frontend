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
        'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-base font-bold tracking-wide ring-1 ring-inset transition-transform duration-500 [transform:perspective(500px)_rotateX(10deg)_rotateY(-14deg)] group-hover:[transform:perspective(500px)_rotateX(16deg)_rotateY(-24deg)_translateY(-3px)_scale(1.05)]',
        muted
          ? 'bg-canvas text-ink-muted shadow-[0_3px_0_theme(colors.slate.300),0_10px_16px_-8px_rgba(46,36,119,0.35)] ring-slate-200'
          : cx(
              'text-white shadow-[0_3px_0_rgba(15,23,42,0.55),0_6px_0_rgba(15,23,42,0.35),0_16px_22px_-8px_rgba(46,36,119,0.6),inset_0_2px_0_rgba(255,255,255,0.25)] ring-white/10 [background-image:linear-gradient(135deg,rgba(255,255,255,0.22),transparent_60%)]',
              TONES[hashOf(label) % TONES.length],
            ),
        className,
      )}
    >
      {initialsOf(label)}
    </span>
  )
}
