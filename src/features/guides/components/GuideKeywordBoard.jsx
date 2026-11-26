import { cx } from '@/shared/utils/classNames'

const TONES = [
  'bg-brand-100 text-brand-800 ring-brand-200 dark:bg-brand-900 dark:text-brand-100 dark:ring-brand-700',
  'bg-violet-100 text-violet-800 ring-violet-200 dark:bg-violet-900 dark:text-violet-100 dark:ring-violet-700',
  'bg-emerald-50 text-emerald-800 ring-emerald-200 dark:bg-emerald-900 dark:text-emerald-100 dark:ring-emerald-700',
  'bg-amber-50 text-amber-800 ring-amber-200 dark:bg-amber-900 dark:text-amber-100 dark:ring-amber-700',
  'bg-sky-50 text-sky-800 ring-sky-200 dark:bg-sky-900 dark:text-sky-100 dark:ring-sky-700',
  'bg-pink-50 text-pink-800 ring-pink-200 dark:bg-pink-900 dark:text-pink-100 dark:ring-pink-700',
]

const SPOTS = [
  { top: '0%', left: '6%', tilt: -8, size: 'text-2xl' },
  { top: '14%', left: '56%', tilt: 11, size: 'text-lg' },
  { top: '23%', left: '0%', tilt: 6, size: 'text-xl' },
  { top: '33%', left: '44%', tilt: -12, size: 'text-2xl' },
  { top: '46%', left: '0%', tilt: -5, size: 'text-lg' },
  { top: '51%', left: '52%', tilt: 9, size: 'text-xl' },
  { top: '63%', left: '12%', tilt: 13, size: 'text-lg' },
  { top: '70%', left: '50%', tilt: -9, size: 'text-xl' },
  { top: '83%', left: '2%', tilt: 4, size: 'text-lg' },
  { top: '86%', left: '44%', tilt: -14, size: 'text-base' },
]

export default function GuideKeywordBoard({ keywords, className }) {
  return (
    <ul aria-hidden="true" className={cx('relative h-[26rem]', className)}>
      {keywords.slice(0, SPOTS.length).map((keyword, index) => {
        const spot = SPOTS[index]
        return (
          <li
            key={keyword}
            style={{
              top: spot.top,
              left: spot.left,
              zIndex: index,
              '--tilt': `${spot.tilt}deg`,
              animationDelay: `${400 + index * 260}ms`,
            }}
            className={cx(
              'absolute animate-stick whitespace-nowrap rounded-full px-5 py-2.5 font-bold shadow-lg ring-1 ring-inset',
              spot.size,
              TONES[index % TONES.length],
            )}
          >
            {keyword}
          </li>
        )
      })}
    </ul>
  )
}
