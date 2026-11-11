import { paths } from '@/shared/config/paths'
import { translate } from '@/shared/i18n/translate'

/** Ancla de un comentario dentro de su discusión («#comentario-12»). */
export function commentAnchor(commentId) {
  return `comentario-${commentId}`
}

/** Texto y enlace de un aviso: lleva a la discusión y, si lo hay, directamente al comentario. */
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
