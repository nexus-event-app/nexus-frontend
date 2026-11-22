import { paths } from '@/shared/config/paths'
import { translate } from '@/shared/i18n/translate'

export function commentAnchor(commentId) {
  return `comentario-${commentId}`
}

export function notificationEntry(notification) {
  const key = notification.type === 'ACCEPTED_ANSWER' ? 'notifications.acceptedAnswer' : 'notifications.comment'
  const discussionPath = paths.discussionDetail({ id: notification.discussionId, slug: notification.discussionSlug })
  return {
    text: translate(key, {
      actor: notification.actorName || translate('forum.user'),
      title: notification.discussionTitle,
    }),
    href: notification.commentId ? `${discussionPath}#${commentAnchor(notification.commentId)}` : discussionPath,
  }
}
