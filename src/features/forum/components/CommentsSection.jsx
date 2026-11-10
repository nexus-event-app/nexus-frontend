import { cx } from '@/shared/utils/classNames'
import { useState } from 'react'
import { useAuth } from '@/features/auth/hooks/useAuth'
import SignInPrompt from '@/features/auth/components/SignInPrompt'
import VerifyEmailNotice from '@/features/auth/components/VerifyEmailNotice'
import ConfirmDialog from '@/shared/components/ConfirmDialog'
import ErrorState from '@/shared/components/ErrorState'
import ListSkeleton from '@/shared/components/ListSkeleton'
import { useAction } from '@/shared/hooks/useAction'
import { useToast } from '@/shared/hooks/useToast'
import { commentService } from '../services/commentService'
import { useCanManage } from '../hooks/useCanManage'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'
import { useI18n } from '@/shared/i18n/useI18n'

export default function CommentsSection({ discussionId, comments, className }) {
  const { t } = useI18n()
  const { isAuthenticated, user } = useAuth()
  const toast = useToast()
  const canManage = useCanManage()
  const [pendingDelete, setPendingDelete] = useState(null)
  const { data, error, reload, mutate } = comments

  const [toggleLike, likePending] = useAction(async (comment) => {
    const updated = await commentService.toggleLike(comment.id)
    mutate((items) => items.map((item) => (item.id === updated.id ? updated : item)))
  })

  const [deleteComment, deletePending] = useAction(
    async (comment) => {
      await commentService.remove(comment.id)
      mutate((items) => items.filter((item) => item.id !== comment.id))
      setPendingDelete(null)
    },
    { successMessage: t('forum.comments.deleted') },
  )

  const handleToggleLike = (comment) => {
    if (!isAuthenticated) {
      toast.info(t('forum.detail.loginToLike'))
      return
    }
    toggleLike(comment)
  }

  const handleCreate = async (content) => {
    const created = await commentService.create({ discussionId, content })
    mutate((items) => [...items, created])
    toast.success(t('forum.comments.posted'))
  }

  return (
    <section aria-labelledby="comments-heading" className={cx('mt-12', className)}>
      <h2 id="comments-heading" className="text-2xl font-bold text-ink">
        {t('forum.comments.title')}
        {data ? ` (${data.length})` : ''}
      </h2>

      {error && <ErrorState className="mt-6" error={error} title={t('forum.comments.error')} onRetry={reload} />}
      {!error && !data && <ListSkeleton className="mt-6" rows={2} />}
      {data && data.length === 0 && (
        <p className="mt-6 rounded-card border border-dashed border-slate-300 p-6 text-center text-ink-muted">
          {t('forum.comments.empty')}
        </p>
      )}
      {data && data.length > 0 && (
        <ul className="mt-6 space-y-4">
          {data.map((comment) => (
            <li key={comment.id}>
              <CommentItem
                comment={comment}
                canDelete={canManage(comment.authorId)}
                likePending={likePending}
                onToggleLike={handleToggleLike}
                onDelete={setPendingDelete}
              />
            </li>
          ))}
        </ul>
      )}

      <footer className="mt-8">
        {isAuthenticated && user?.emailVerified === false ? (
          <VerifyEmailNotice>{t('forum.comments.confirmEmail')}</VerifyEmailNotice>
        ) : isAuthenticated ? (
          <CommentForm onSubmit={handleCreate} />
        ) : (
          <SignInPrompt>{t('forum.comments.signIn')}</SignInPrompt>
        )}
      </footer>

      {pendingDelete && (
        <ConfirmDialog
          title={t('forum.comments.deleteTitle')}
          message={t('forum.comments.deleteMessage')}
          confirmLabel={t('forum.comments.deleteConfirm')}
          pending={deletePending}
          onConfirm={() => deleteComment(pendingDelete)}
          onCancel={() => setPendingDelete(null)}
        />
      )}
    </section>
  )
}
