import { useState } from 'react'
import { Link } from 'react-router-dom'
import { commentService } from '@/features/forum/services/commentService'
import Badge from '@/shared/components/Badge'
import Button from '@/shared/components/Button'
import ConfirmDialog from '@/shared/components/ConfirmDialog'
import ErrorState from '@/shared/components/ErrorState'
import Icon from '@/shared/components/Icon'
import ListSkeleton from '@/shared/components/ListSkeleton'
import Modal from '@/shared/components/Modal'
import Time from '@/shared/components/Time'
import UserText from '@/shared/components/UserText'
import { discussionCategories } from '@/shared/config/catalogs'
import { paths } from '@/shared/config/paths'
import { useAction } from '@/shared/hooks/useAction'
import { useRequest } from '@/shared/hooks/useRequest'

export default function DiscussionModeration({ discussion, onClose, onDeleteDiscussion }) {
  const [pendingDelete, setPendingDelete] = useState(null)
  const comments = useRequest(`admin:comments:${discussion.id}`, ({ signal }) =>
    commentService.listByDiscussion(discussion.id, { signal }),
  )

  const [deleteComment, deleting] = useAction(
    async (comment) => {
      await commentService.remove(comment.id)
      comments.mutate((items) => items.filter((item) => item.id !== comment.id))
      setPendingDelete(null)
    },
    { successMessage: 'Comentario borrado.' },
  )

  return (
    <Modal title="Moderar discusión" size="lg" onClose={onClose}>
      <div className="space-y-6">
        <article>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone={discussionCategories.toneOf(discussion.category)}>
              {discussionCategories.labelOf(discussion.category)}
            </Badge>
            {!discussion.isActive && <Badge tone="amber">Inactiva</Badge>}
          </div>
          <h3 className="mt-3 text-xl font-bold text-ink">{discussion.title}</h3>
          <p className="mt-1 text-sm text-ink-muted">
            {discussion.authorName || 'Usuario'} · <Time value={discussion.createdAt} format="datetime" />
          </p>
          <UserText className="mt-4 text-ink-soft">{discussion.content}</UserText>
          <div className="mt-4 flex flex-wrap gap-2">
            {discussion.isActive && (
              <Link to={paths.discussionDetail(discussion)} className="btn btn-secondary btn-sm">
                Ver en el sitio
              </Link>
            )}
            <Button variant="danger" size="sm" onClick={() => onDeleteDiscussion(discussion)}>
              <Icon name="trash" className="h-4 w-4" />
              Borrar discusión
            </Button>
          </div>
        </article>

        <section aria-labelledby="moderation-comments">
          <h3 id="moderation-comments" className="mb-3 text-lg font-bold text-ink">
            Comentarios{comments.data ? ` (${comments.data.length})` : ''}
          </h3>
          {comments.error && <ErrorState error={comments.error} onRetry={comments.reload} />}
          {!comments.error && !comments.data && <ListSkeleton rows={2} />}
          {comments.data?.length === 0 && <p className="text-ink-muted">Esta discusión no tiene comentarios.</p>}
          {comments.data?.length > 0 && (
            <ul className="space-y-3">
              {comments.data.map((comment) => (
                <li key={comment.id} className="rounded-control border border-slate-200 p-4">
                  <p className="text-sm text-ink-muted">
                    <span className="font-semibold text-ink">{comment.authorName || 'Usuario'}</span> ·{' '}
                    <Time value={comment.createdAt} format="datetime" />
                  </p>
                  <UserText className="mt-2 text-ink-soft">{comment.content}</UserText>
                  <Button variant="ghost" size="sm" className="mt-2" onClick={() => setPendingDelete(comment)}>
                    <Icon name="trash" className="h-4 w-4" />
                    Borrar comentario
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {pendingDelete && (
        <ConfirmDialog
          title="Borrar comentario"
          message="Este comentario se eliminará de forma permanente. ¿Quieres continuar?"
          confirmLabel="Borrar comentario"
          pending={deleting}
          onConfirm={() => deleteComment(pendingDelete)}
          onCancel={() => setPendingDelete(null)}
        />
      )}
    </Modal>
  )
}
