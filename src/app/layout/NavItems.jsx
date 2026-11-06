import { NavLink } from 'react-router-dom'
import { cx } from '@/shared/utils/classNames'
import { mainNavigation } from './navigation'

export default function NavItems({ orientation = 'horizontal' }) {
  const vertical = orientation === 'vertical'

  return (
    <ul className={cx('flex', vertical ? 'flex-col gap-1' : 'items-center gap-1')}>
      {mainNavigation.map((item) => (
        <li key={item.to}>
          <NavLink
            to={item.to}
            className={({ isActive }) =>
              cx(
                'flex min-h-[2.75rem] items-center rounded-control px-3 text-base font-semibold transition-colors',
                isActive ? 'bg-brand-50 text-brand-800' : 'text-ink-soft hover:bg-slate-100 hover:text-ink',
              )
            }
          >
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}
