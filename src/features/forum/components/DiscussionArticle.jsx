import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'
import Avatar from '@/shared/components/Avatar'
import Badge from '@/shared/components/Badge'
import Button from '@/shared/components/Button'
import ConfirmDialog from '@/shared/components/ConfirmDialog'
import Icon from '@/shared/components/Icon'
import Modal from '@/shared/components/Modal'
import Time from '@/shared/components/Time'
import UserText from '@/shared/components/UserText'
import { discussionCategories } from '@/shared/config/catalogs'
import { paths } from '@/shared/config/paths'
import { useAction } from '@/shared/hooks/useAction'
import { useToast } from '@/shared/hooks/useToast'
import { useCanManage } from '../hooks/useCanManage'
import { discussionService } from '../services/discussionService'
import DiscussionForm from './DiscussionForm'
import LikeButton from './LikeButton'

export default function DiscussionArticle({ discussion, commentCount, onChange }) {
  const { isAuthenticated } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const canManage = useCanManage()
  const [editing, setEditing] = useState(false)
  const [confirmingDelete, setConfirmingDelete] = useState(false)

  const [toggleLike, likePending] = useAction(async () => {
    onChange(await discussionService.toggleLike(discussion.id))
  })

  const [deleteDiscussion, deletePending] = useAction(async () => {
    await discussionService.remove(discussion.id)
    toast.success('Discusión borrada.')
    navigate(paths.forum, { replace: true })
  })

  const handleLike = () => {
    if (!isAuthenticated) {
      toast.info('Inicia sesión para dar me gusta.')
      return
    }
    toggleLike()
  }

  const handleUpdate = async (payload) => {
    onChange(await discussionService.update(discussion.id, payload))
    setEditing(false)
    toast.success('Discusión actualizada.')
  }

  const manageable = canManage(discussion.authorId)

  return (
    <article>
      <header>
        <Badge tone={discussionCategories.toneOf(discussion.category)}>
          {discussionCategories.labelOf(discussion.category)}
        </Badge>
        <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
          {discussion.title}
        </h1>
        <div className="mt-4 flex items-center gap-3">
          <Avatar name={discussion.authorName} />
          <p className="text-sm text-ink-muted">
            <span className="block font-semibold text-ink">{discussion.authorName || 'Usuario'}</span>
            <Time value={discussion.createdAt} format="datetime" />
            {commentCount > 0 && ` · ${commentCount} ${commentCount === 1 ? 'comentario' : 'comentarios'}`}
          </p>
        </div>
      </header>

      <UserText className="mt-6 text-lg leading-relaxed text-ink-soft">{discussion.content}</UserText>

      <footer className="mt-6 flex flex-wrap items-center gap-2 border-t border-slate-200 pt-4">
        <LikeButton
          count={discussion.likesCount}
          liked={discussion.isLikedByCurrentUser}
          pending={likePending}
          onToggle={handleLike}
          label="Me gusta en esta discusión"
        />
        {manageable && (
          <>
            <Button variant="secondary" onClick={() => setEditing(true)}>
              <Icon name="pencil" className="h-4 w-4" />
              Editar
            </Button>
            <Button variant="ghost" onClick={() => setConfirmingDelete(true)}>
              <Icon name="trash" className="h-4 w-4" />
              Borrar
            </Button>
          </>
        )}
      </footer>

      {editing && (
        <Modal title="Editar discusión" size="md" onClose={() => setEditing(false)}>
          <DiscussionForm
            initialValues={{ title: discussion.title, content: discussion.content, category: discussion.category }}
            submitLabel="Guardar cambios"
            onSubmit={handleUpdate}
            onCancel={() => setEditing(false)}
          />
        </Modal>
      )}

      {confirmingDelete && (
        <ConfirmDialog
          title="Borrar discusión"
          message="Se borrará la discusión junto con todos sus comentarios y me gusta. Esta acción no se puede deshacer."
          confirmLabel="Borrar discusión"
          pending={deletePending}
          onConfirm={deleteDiscussion}
          onCancel={() => setConfirmingDelete(false)}
        />
      )}
    </article>
  )
}
