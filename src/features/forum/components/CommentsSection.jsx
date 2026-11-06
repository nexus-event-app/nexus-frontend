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

export default function CommentsSection({ discussionId, comments }) {
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
    { successMessage: 'Comentario borrado.' },
  )

  const handleToggleLike = (comment) => {
    if (!isAuthenticated) {
      toast.info('Inicia sesión para dar me gusta.')
      return
    }
    toggleLike(comment)
  }

  const handleCreate = async (content) => {
    const created = await commentService.create({ discussionId, content })
    mutate((items) => [...items, created])
    toast.success('Comentario publicado.')
  }

  return (
    <section aria-labelledby="comments-heading" className="mt-12">
      <h2 id="comments-heading" className="text-2xl font-bold text-ink">
        Comentarios{data ? ` (${data.length})` : ''}
      </h2>

      <div className="mt-6">
        {error && <ErrorState error={error} title="No hemos podido cargar los comentarios" onRetry={reload} />}
        {!error && !data && <ListSkeleton rows={2} />}
        {data && data.length === 0 && (
          <p className="rounded-card border border-dashed border-slate-300 p-6 text-center text-ink-muted">
            Todavía no hay comentarios. ¡Sé la primera persona en responder!
          </p>
        )}
        {data && data.length > 0 && (
          <ul className="space-y-4">
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
      </div>

      <div className="mt-8">
        {isAuthenticated && user?.emailVerified === false ? (
          <VerifyEmailNotice>Confirma tu email para comentar en esta discusión.</VerifyEmailNotice>
        ) : isAuthenticated ? (
          <CommentForm onSubmit={handleCreate} />
        ) : (
          <SignInPrompt>Inicia sesión o crea una cuenta para comentar en esta discusión.</SignInPrompt>
        )}
      </div>

      {pendingDelete && (
        <ConfirmDialog
          title="Borrar comentario"
          message="Este comentario se eliminará de forma permanente. ¿Quieres continuar?"
          confirmLabel="Borrar comentario"
          pending={deletePending}
          onConfirm={() => deleteComment(pendingDelete)}
          onCancel={() => setPendingDelete(null)}
        />
      )}
    </section>
  )
}
