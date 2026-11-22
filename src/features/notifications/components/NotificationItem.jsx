import Avatar from '@/shared/components/Avatar'
import Icon from '@/shared/components/Icon'
import Time from '@/shared/components/Time'
import { Link } from '@/shared/i18n/router'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'
import { notificationEntry } from '../utils/notificationEntry'

export default function NotificationItem({ notification, onOpen }) {
  const { t } = useI18n()
  const { text, href } = notificationEntry(notification)
  const accepted = notification.type === 'ACCEPTED_ANSWER'

  return (
    <article
      className={cx(
        'relative grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-x-4 px-5 py-4 transition-colors hover:bg-canvas has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-inset has-[a:focus-visible]:ring-brand-600 sm:px-6',
        !notification.read && 'bg-accent-soft/50',
      )}
    >
      <span className="relative">
        <Avatar name={notification.actorName} src={notification.actorAvatarUrl} />
        <span
          aria-hidden="true"
          className={cx(
            'absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full ring-2 ring-surface',
            accepted ? 'bg-emerald-600 text-white' : 'bg-accent text-white',
          )}
        >
          <Icon name={accepted ? 'check' : 'chat'} className="h-3 w-3" />
        </span>
      </span>
      <p className="min-w-0">
        <Link
          to={href}
          onClick={() => onOpen(notification)}
          className={cx(
            'text-ink after:absolute after:inset-0 hover:text-accent focus-visible:ring-0 focus-visible:ring-offset-0',
            notification.read ? 'font-medium' : 'font-semibold',
          )}
        >
          {text}
        </Link>
        <small className="mt-1 block text-sm text-ink-muted">
          <Time value={notification.createdAt} format="datetime" />
        </small>
      </p>
      {!notification.read && (
        <span className="mt-1.5 flex items-center gap-2 text-xs font-semibold text-accent">
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-accent" />
          <span className="sr-only sm:not-sr-only">{t('notifications.unread')}</span>
        </span>
      )}
    </article>
  )
}
