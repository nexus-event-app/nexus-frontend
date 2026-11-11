import Avatar from '@/shared/components/Avatar'
import Icon from '@/shared/components/Icon'
import Time from '@/shared/components/Time'
import { Link } from '@/shared/i18n/router'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'
import { notificationEntry } from '../utils/notificationEntry'

/** Un aviso de la lista. Toda la tarjeta lleva al comentario; al abrirla se marca como leído. */
export default function NotificationItem({ notification, onOpen }) {
  const { t } = useI18n()
  const { text, href } = notificationEntry(notification)
  const accepted = notification.type === 'ACCEPTED_ANSWER'

  return (
    <article
      className={cx(
        'card relative grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-x-4 p-4 transition-shadow hover:shadow-pop has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-brand-600 sm:p-5',
        !notification.read && 'border-accent-line bg-accent-soft/40',
      )}
    >
      <Avatar name={notification.actorName} src={notification.actorAvatarUrl} />
      <p className="min-w-0">
        <Link
          to={href}
          onClick={() => onOpen(notification)}
          className="font-medium text-ink after:absolute after:inset-0 hover:text-accent focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          {text}
        </Link>
        <small className="mt-1 flex items-center gap-1.5 text-sm text-ink-muted">
          <Icon name={accepted ? 'check-circle' : 'chat'} className="h-4 w-4" />
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
