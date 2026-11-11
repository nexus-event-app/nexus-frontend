import { cx } from '@/shared/utils/classNames'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'
import SignInPrompt from '@/features/auth/components/SignInPrompt'
import VerifyEmailNotice from '@/features/auth/components/VerifyEmailNotice'
import ConfirmDialog from '@/shared/components/ConfirmDialog'
import ErrorState from '@/shared/components/ErrorState'
import ListSkeleton from '@/shared/components/ListSkeleton'
import { useAction } from '@/shared/hooks/useAction'
import { useToast } from '@/shared/hooks/useToast'
import { commentAnchor } from '@/features/notifications/utils/notificationEntry'
import { commentService } from '../services/commentService'
import { discussionService } from '../services/discussionService'
import { useCanManage } from '../hooks/useCanManage'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'
import { useI18n } from '@/shared/i18n/useI18n'

/** La mejor respuesta va la primera; el resto, en el orden en que se escribieron. */
function sortComments(comments, acceptedId) {
  const accepted = comments.find((comment) => comment.id === acceptedId)
  return accepted ? [accepted, ...comments.filter((comment) => comment !== accepted)] : comments
}

export default function CommentsSection({ discussion, comments, onDiscussionChange, className }) {
  const discussionId = discussion.id
  const { t } = useI18n()
  const { isAuthenticated, user } = useAuth()
  const toast = useToast()
  const canManage = useCanManage()
  const [pendingDelete, setPendingDelete] = useState(null)
  const { data, error, reload, mutate } = comments
  const { hash } = useLocation()
  // Solo quien preguntó elige la mejor respuesta (el servidor también lo comprueba).
  const canAccept = isAuthenticated && user?.id === discussion.authorId
  const acceptedId = discussion.acceptedCommentId ?? null

  // Al llegar desde un aviso («#comentario-12»), se lleva la vista y el foco a ese comentario cuando ya está cargado.
  const loaded = Boolean(data)
  useEffect(() => {
    if (!loaded || !hash.startsWith('#comentario-')) return
    const target = document.getElementById(hash.slice(1))
    if (!target) return
    target.scrollIntoView({ block: 'start' })
    target.focus({ preventScroll: true })
  }, [loaded, hash])

  const [toggleAccepted, acceptPending] = useAction(async (comment) => {
    const accepting = comment.id !== acceptedId
    const updated = accepting
      ? await discussionService.acceptAnswer(discussionId, comment.id)
      : await discussionService.clearAcceptedAnswer(discussionId)
    onDiscussionChange(updated)
    toast.success(accepting ? t('forum.comments.acceptedToast') : t('forum.comments.unacceptedToast'))
  })

  const [toggleLike, likePending] = useAction(async (comment) => {
    const updated = await commentService.toggleLike(comment.id)
    mutate((items) => items.map((item) => (item.id === updated.id ? updated : item)))
  })

  const [deleteComment, deletePending] = useAction(
    async (comment) => {
      await commentService.remove(comment.id)
      mutate((items) => items.filter((item) => item.id !== comment.id))
      // Si era la mejor respuesta, la discusión vuelve a quedar sin resolver.
      if (comment.id === acceptedId) onDiscussionChange({ ...discussion, acceptedCommentId: null })
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
          {sortComments(data, acceptedId).map((comment) => (
            <li key={comment.id}>
              <CommentItem
                id={commentAnchor(comment.id)}
                comment={comment}
                accepted={comment.id === acceptedId}
                canAccept={canAccept}
                acceptPending={acceptPending}
                onToggleAccepted={toggleAccepted}
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
