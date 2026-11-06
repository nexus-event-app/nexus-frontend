import { cx } from '@/shared/utils/classNames'

const TONES = {
  slate: 'bg-slate-100 text-slate-800 ring-slate-200',
  blue: 'bg-blue-50 text-blue-800 ring-blue-200',
  green: 'bg-green-50 text-green-800 ring-green-200',
  violet: 'bg-violet-50 text-violet-800 ring-violet-200',
  indigo: 'bg-indigo-50 text-indigo-800 ring-indigo-200',
  pink: 'bg-pink-50 text-pink-800 ring-pink-200',
  amber: 'bg-amber-50 text-amber-900 ring-amber-200',
  red: 'bg-red-50 text-red-800 ring-red-200',
}

export default function Badge({ tone = 'slate', className, children }) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset',
        TONES[tone] ?? TONES.slate,
        className,
      )}
    >
      {children}
    </span>
  )
}
