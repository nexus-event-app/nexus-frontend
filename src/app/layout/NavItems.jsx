import { NavLink } from '@/shared/i18n/router'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'
import { mainNavigation } from './navigation'

export default function NavItems({ orientation = 'horizontal' }) {
  const { t } = useI18n()
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
                isActive ? 'bg-accent-soft text-accent-strong' : 'text-ink-soft hover:bg-slate-100 hover:text-ink',
              )
            }
          >
            {t(item.labelKey)}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}
