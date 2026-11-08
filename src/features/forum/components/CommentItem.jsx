import Avatar from '@/shared/components/Avatar'
import Button from '@/shared/components/Button'
import Icon from '@/shared/components/Icon'
import Time from '@/shared/components/Time'
import UserText from '@/shared/components/UserText'
import LikeButton from './LikeButton'
import { useI18n } from '@/shared/i18n/useI18n'

export default function CommentItem({ comment, canDelete, likePending, onToggleLike, onDelete }) {
  const { t } = useI18n()
  return (
    <article className="card p-4 sm:p-5">
      <header className="flex items-center gap-3">
        <Avatar name={comment.authorName} />
        <p className="min-w-0 flex-1">
          <span className="block truncate font-semibold text-ink">{comment.authorName || t('forum.user')}</span>
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
        {canDelete && (
          <Button variant="ghost" size="sm" onClick={() => onDelete(comment)}>
            <Icon name="trash" className="h-4 w-4" />
            {t('forum.comments.delete')}
            <span className="sr-only">{t('forum.comments.deleteSr', { author: comment.authorName || t('forum.user') })}</span>
          </Button>
        )}
      </footer>
    </article>
  )
}
