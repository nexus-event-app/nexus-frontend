import { Link } from 'react-router-dom'
import { cx } from '@/shared/utils/classNames'

export default function FilterLinks({ label, options }) {
  return (
    <nav aria-label={label}>
      <ul className="flex flex-wrap gap-2">
        {options.map((option) => (
          <li key={option.key}>
            <Link
              to={option.href}
              aria-current={option.active ? 'true' : undefined}
              className={cx(
                'inline-flex min-h-[2.75rem] items-center rounded-full border px-4 text-sm font-semibold transition-colors sm:min-h-[2.25rem]',
                option.active
                  ? 'border-brand-600 bg-brand-600 text-white'
                  : 'border-slate-300 bg-white text-ink-soft hover:bg-slate-50',
              )}
            >
              {option.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
