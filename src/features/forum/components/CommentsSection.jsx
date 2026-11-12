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
import { Link } from '@/shared/i18n/router'
import Icon from '@/shared/components/Icon'
import { paths } from '@/shared/config/paths'

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
      <h2 id="comments-heading" className="flex items-center gap-3 text-2xl font-bold tracking-tight text-ink">
        {t('forum.comments.title')}
        {data && (
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-sm font-semibold text-ink-soft">
            {data.length}
          </span>
        )}
      </h2>

      {error && <ErrorState className="mt-6" error={error} title={t('forum.comments.error')} onRetry={reload} />}
      {!error && !data && <ListSkeleton className="mt-6" rows={2} />}
      {data && data.length === 0 && (
        <p className="mt-6 rounded-2xl border border-dashed border-slate-300 p-6 text-center text-ink-muted">
          {t('forum.comments.empty')}
        </p>
      )}
      {data && data.length > 0 && (
        // Una línea vertical une las respuestas a la altura de las fotos, como un hilo de conversación (decorativa:
        // pasa por detrás de las tarjetas y solo se ve entre una y otra).
        <ul className="relative mt-6 space-y-4 before:absolute before:bottom-6 before:left-9 before:top-6 before:w-0.5 before:bg-slate-200 sm:before:left-10">
          {sortComments(data, acceptedId).map((comment) => (
            <li key={comment.id} className="relative">
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
          <CommentForm
            onSubmit={handleCreate}
            className="rounded-3xl border border-slate-200 bg-surface p-5 shadow-card sm:p-6"
          />
        ) : (
          <SignInPrompt>{t('forum.comments.signIn')}</SignInPrompt>
        )}
        <Link
          to={paths.forum}
          className="mt-6 inline-flex min-h-[2.75rem] items-center gap-2 rounded-full px-4 text-sm font-medium text-ink-soft transition-colors hover:bg-slate-100 hover:text-ink"
        >
          <Icon name="arrow-left" className="h-4 w-4" />
          {t('forum.detail.back')}
        </Link>
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
