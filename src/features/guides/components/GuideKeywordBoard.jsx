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
  { top: '0%', left: '8%', tilt: -4, depth: 50, size: 'text-xl' },
  { top: '15%', left: '54%', tilt: 5, depth: 10, size: 'text-sm' },
  { top: '24%', left: '2%', tilt: 3, depth: 30, size: 'text-base' },
  { top: '35%', left: '42%', tilt: -5, depth: 60, size: 'text-lg' },
  { top: '48%', left: '4%', tilt: -2, depth: 0, size: 'text-sm' },
  { top: '53%', left: '50%', tilt: 4, depth: 45, size: 'text-base' },
  { top: '65%', left: '14%', tilt: 5, depth: 20, size: 'text-sm' },
  { top: '72%', left: '50%', tilt: -4, depth: 40, size: 'text-base' },
  { top: '85%', left: '6%', tilt: 2, depth: 5, size: 'text-sm' },
  { top: '87%', left: '46%', tilt: -5, depth: 25, size: 'text-sm' },
]

export default function GuideKeywordBoard({ keywords, className }) {
  return (
    <ul aria-hidden="true" className={cx('relative h-[19rem] [perspective:1100px]', className)}>
      {keywords.slice(0, SPOTS.length).map((keyword, index) => {
        const spot = SPOTS[index]
        return (
          <li
            key={keyword}
            style={{
              top: spot.top,
              left: spot.left,
              zIndex: spot.depth,
              '--tilt': `${spot.tilt}deg`,
              '--depth': `${spot.depth}px`,
              animationDelay: `${400 + index * 260}ms`,
            }}
            className="absolute animate-stick-3d whitespace-nowrap [transform-style:preserve-3d]"
          >
            <span
              style={{ animationDelay: `${-index * 700}ms` }}
              className={cx(
                'block animate-sway-3d rounded-full px-3.5 py-1.5 font-bold ring-1 ring-inset',
                'shadow-[0_2px_0_rgba(15,23,42,0.08),0_4px_0_rgba(15,23,42,0.07),0_6px_0_rgba(15,23,42,0.06),0_22px_30px_-12px_rgba(46,36,119,0.5),inset_0_2px_0_rgba(255,255,255,0.75)]',
                'dark:shadow-[0_2px_0_rgba(0,0,0,0.35),0_4px_0_rgba(0,0,0,0.3),0_6px_0_rgba(0,0,0,0.25),0_22px_30px_-12px_rgba(0,0,0,0.8),inset_0_2px_0_rgba(255,255,255,0.12)]',
                spot.size,
                TONES[index % TONES.length],
              )}
            >
              {keyword}
            </span>
          </li>
        )
      })}
    </ul>
  )
}
