import { cx } from '@/shared/utils/classNames'

const TONES = {
  slate: 'bg-slate-100 text-slate-800 ring-slate-200',
  blue: 'bg-blue-50 text-blue-800 ring-blue-200 dark:bg-blue-500/15 dark:text-blue-200 dark:ring-blue-400/30',
  green: 'bg-green-50 text-green-800 ring-green-200 dark:bg-green-500/15 dark:text-green-200 dark:ring-green-400/30',
  violet:
    'bg-violet-50 text-violet-800 ring-violet-200 dark:bg-violet-500/15 dark:text-violet-200 dark:ring-violet-400/30',
  indigo:
    'bg-indigo-50 text-indigo-800 ring-indigo-200 dark:bg-indigo-500/15 dark:text-indigo-200 dark:ring-indigo-400/30',
  pink: 'bg-pink-50 text-pink-800 ring-pink-200 dark:bg-pink-500/15 dark:text-pink-200 dark:ring-pink-400/30',
  amber: 'bg-amber-50 text-amber-900 ring-amber-200 dark:bg-amber-500/15 dark:text-amber-200 dark:ring-amber-400/30',
  red: 'bg-red-50 text-red-800 ring-red-200 dark:bg-red-500/15 dark:text-red-200 dark:ring-red-400/30',
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
