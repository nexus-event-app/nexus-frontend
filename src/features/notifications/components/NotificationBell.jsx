import { NavLink } from '@/shared/i18n/router'
import Icon from '@/shared/components/Icon'
import { paths } from '@/shared/config/paths'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'
import { useNotifications } from '../hooks/useNotifications'

/** Más de 9 avisos se muestran como «9+» para que el número quepa en la campanita. */
const MAX_BADGE = 9

/** Campanita de la cabecera: lleva a la página de avisos y dice cuántos hay sin leer. */
export default function NotificationBell({ className }) {
  const { t } = useI18n()
  const { unread } = useNotifications()
  const label = unread > 0 ? t('notifications.bellUnread', { count: unread }) : t('notifications.bell')

  return (
    <NavLink
      to={paths.notifications}
      aria-label={label}
      className={cx(
        'relative flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-slate-100 hover:text-accent aria-[current=page]:text-accent',
        className,
      )}
    >
      <Icon name="bell" className="h-6 w-6" />
      {unread > 0 && (
        <span
          aria-hidden="true"
          className="absolute right-1 top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-red-700 px-1 text-xs font-bold leading-none text-white ring-2 ring-surface"
        >
          {unread > MAX_BADGE ? `${MAX_BADGE}+` : unread}
        </span>
      )}
    </NavLink>
  )
}
