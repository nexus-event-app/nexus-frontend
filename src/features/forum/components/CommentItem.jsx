import Avatar from '@/shared/components/Avatar'
import AuthorLink from '@/features/profile/components/AuthorLink'
import Button from '@/shared/components/Button'
import Icon from '@/shared/components/Icon'
import Time from '@/shared/components/Time'
import UserText from '@/shared/components/UserText'
import { cx } from '@/shared/utils/classNames'
import ReportButton from '@/features/reports/components/ReportButton'
import LikeButton from './LikeButton'
import { useI18n } from '@/shared/i18n/useI18n'
import { authorOf } from '../utils/author'

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
  const author = authorOf(comment, t)
  return (
    // Enfocable (tabIndex -1) para que el enlace de un aviso pueda llevar el foco a este comentario. La foto va a la
    // izquierda y todo lo demás al lado, como en un hilo de conversación; la mejor respuesta se señala en verde (y con
    // texto, no solo con el color).
    <article
      id={id}
      tabIndex={-1}
      className={cx(
        'grid scroll-mt-24 grid-cols-[auto_minmax(0,1fr)] gap-x-3 rounded-2xl border bg-surface p-3.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 sm:px-5 sm:py-4',
        accepted
          ? 'border-green-600 shadow-card ring-1 ring-green-600 dark:border-green-500 dark:ring-green-500'
          : 'border-slate-200',
      )}
    >
      {accepted && (
        <p className="col-span-full -mx-3.5 -mt-3.5 mb-3 flex items-center gap-1.5 rounded-t-2xl bg-green-50 px-3.5 py-1.5 text-sm font-bold text-green-800 sm:-mx-5 sm:-mt-4 sm:px-5 dark:bg-green-500/15 dark:text-green-300">
          <Icon name="check-circle" className="h-5 w-5" />
          {t('forum.comments.accepted')}
        </p>
      )}
      <Avatar name={author.name} src={author.avatarUrl} className="row-span-3" />
      <header className="flex min-w-0 flex-wrap items-baseline gap-x-2">
        <AuthorLink id={author.id} name={author.name} className="truncate font-semibold text-ink" />
        <Time value={comment.createdAt} format="datetime" className="text-sm text-ink-muted" />
      </header>
      <UserText className="mt-1 leading-relaxed text-ink-soft">{comment.content}</UserText>
      <footer className="mt-2 flex flex-wrap items-center gap-2">
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
            <span className="sr-only">{t('forum.comments.acceptSr', { author: author.name })}</span>
          </Button>
        )}
        <ReportButton
          targetType="COMMENT"
          targetId={comment.id}
          ownerId={comment.authorId}
          srLabel={t('reports.commentSr', { author: author.name })}
        />
        {canDelete && (
          <Button variant="ghost" size="sm" onClick={() => onDelete(comment)}>
            <Icon name="trash" className="h-4 w-4" />
            {t('forum.comments.delete')}
            <span className="sr-only">{t('forum.comments.deleteSr', { author: author.name })}</span>
          </Button>
        )}
      </footer>
    </article>
  )
}
