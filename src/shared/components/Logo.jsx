import { siteConfig } from '@/shared/config/site'
import { cx } from '@/shared/utils/classNames'

const NODES = [
  { cx: 168, cy: 300, r: 64, filled: true },
  { cx: 290, cy: 170, r: 36, filled: false },
  { cx: 352, cy: 334, r: 34, filled: true },
  { cx: 396, cy: 238, r: 22, filled: false },
]

const LINKS = [
  [168, 300, 290, 170],
  [168, 300, 352, 334],
  [290, 170, 396, 238],
  [352, 334, 396, 238],
]

export default function Logo({ showName = true, inverse = false, className = '' }) {
  const background = inverse ? 'fill-white' : 'fill-brand-500'
  const line = inverse ? 'stroke-brand-700' : 'stroke-white'
  const filled = inverse ? 'fill-brand-700' : 'fill-white'

  return (
    <span className={cx('inline-flex items-center gap-2', className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width="36"
        height="36"
        className="h-9 w-9 shrink-0"
        aria-hidden="true"
        focusable="false"
      >
        <rect width="512" height="512" rx="128" className={background} />
        <g className={line} strokeWidth="16" strokeLinecap="round" fill="none">
          {LINKS.map(([x1, y1, x2, y2]) => (
            <line key={`${x1}-${y1}-${x2}-${y2}`} x1={x1} y1={y1} x2={x2} y2={y2} />
          ))}
        </g>
        {NODES.map((node) =>
          node.filled ? (
            <circle key={node.cx} cx={node.cx} cy={node.cy} r={node.r} className={filled} />
          ) : (
            <circle
              key={node.cx}
              cx={node.cx}
              cy={node.cy}
              r={node.r}
              className={cx(background, line)}
              strokeWidth="16"
            />
          ),
        )}
      </svg>
      {showName && (
        <span className={cx('text-xl font-extrabold tracking-tight', inverse ? 'text-white' : 'text-ink')}>
          {siteConfig.name}
        </span>
      )}
    </span>
  )
}
