import Avatar from '@/shared/components/Avatar'
import AuthorLink from '@/features/profile/components/AuthorLink'
import Button from '@/shared/components/Button'
import Icon from '@/shared/components/Icon'
import Time from '@/shared/components/Time'
import UserText from '@/shared/components/UserText'
import { cx } from '@/shared/utils/classNames'
import LikeButton from './LikeButton'
import { useI18n } from '@/shared/i18n/useI18n'

export default function CommentItem({
  id,
  comment,
  accepted = false,
  canAccept = false,
  acceptPending = false,
  onToggleAccepted,
  canDelete,
  likePending,
  onToggleLike,
  onDelete,
}) {
  const { t } = useI18n()
  const author = comment.authorName || t('forum.user')
  return (
    // Enfocable (tabIndex -1) para que el enlace de un aviso pueda llevar el foco a este comentario.
    <article
      id={id}
      tabIndex={-1}
      className={cx(
        'card scroll-mt-24 p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 sm:p-5',
        accepted && 'border-2 border-green-600 dark:border-green-500',
      )}
    >
      {accepted && (
        <p className="mb-3 flex items-center gap-1.5 text-sm font-bold text-green-800 dark:text-green-300">
          <Icon name="check-circle" className="h-5 w-5" />
          {t('forum.comments.accepted')}
        </p>
      )}
      <header className="flex items-center gap-3">
        <Avatar name={comment.authorName} src={comment.authorAvatarUrl} />
        <p className="min-w-0 flex-1">
          <AuthorLink id={comment.authorId} name={author} className="block truncate font-semibold text-ink" />
          <Time value={comment.createdAt} format="datetime" className="text-sm text-ink-muted" />
        </p>
      </header>
      <UserText className="mt-3 text-ink-soft">{comment.content}</UserText>
      <footer className="mt-4 flex flex-wrap items-center gap-2">
        <LikeButton
          count={comment.likesCount}
          liked={comment.isLikedByCurrentUser}
          pending={likePending}
          onToggle={() => onToggleLike(comment)}
          label={t('forum.comments.like')}
        />
        {canAccept && (
          <Button
            variant={accepted ? 'secondary' : 'ghost'}
            size="sm"
            aria-pressed={accepted}
            disabled={acceptPending}
            onClick={() => onToggleAccepted(comment)}
          >
            <Icon name="check-circle" className="h-4 w-4" />
            {accepted ? t('forum.comments.unaccept') : t('forum.comments.accept')}
            <span className="sr-only">{t('forum.comments.acceptSr', { author })}</span>
          </Button>
        )}
        {canDelete && (
          <Button variant="ghost" size="sm" onClick={() => onDelete(comment)}>
            <Icon name="trash" className="h-4 w-4" />
            {t('forum.comments.delete')}
            <span className="sr-only">{t('forum.comments.deleteSr', { author })}</span>
          </Button>
        )}
      </footer>
    </article>
  )
}
