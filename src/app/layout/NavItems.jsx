import { NavLink } from '@/shared/i18n/router'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'
import { mainNavigation } from './navigation'

/**
 * Enlaces de la navegación principal. En horizontal van dentro de una cápsula y la sección actual se resalta como
 * una pastilla blanca; en vertical (menú del móvil) ocupan todo el ancho.
 */
export default function NavItems({ orientation = 'horizontal' }) {
  const { t } = useI18n()
  const vertical = orientation === 'vertical'

  return (
    <ul className={cx('flex', vertical ? 'flex-col gap-1' : 'items-center gap-0.5 rounded-full bg-slate-100 p-1')}>
      {mainNavigation.map((item) => (
        <li key={item.to}>
          <NavLink
            to={item.to}
            className={({ isActive }) =>
              cx(
                'flex items-center font-medium transition-all duration-200',
                vertical
                  ? 'min-h-[2.75rem] rounded-control px-3 text-base'
                  : 'min-h-[2.5rem] whitespace-nowrap rounded-full px-3 text-sm',
                isActive
                  ? vertical
                    ? 'bg-accent-soft text-accent-strong'
                    : 'bg-surface text-accent-strong shadow-card'
                  : 'text-ink-soft hover:bg-surface/70 hover:text-ink',
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
