import { useState } from 'react'
import { Link } from '@/shared/i18n/router'
import { useNavigate } from '@/shared/i18n/useNavigate'
import { commentAnchor } from '@/features/notifications/utils/notificationEntry'
import { useAuth } from '@/features/auth/hooks/useAuth'
import Avatar from '@/shared/components/Avatar'
import AuthorLink from '@/features/profile/components/AuthorLink'
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
import { useI18n } from '@/shared/i18n/useI18n'

export default function DiscussionArticle({ discussion, commentCount, onChange, className }) {
  const { t } = useI18n()
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
    toast.success(t('forum.detail.deleted'))
    navigate(paths.forum, { replace: true })
  })

  const handleLike = () => {
    if (!isAuthenticated) {
      toast.info(t('forum.detail.loginToLike'))
      return
    }
    toggleLike()
  }

  const handleUpdate = async (payload) => {
    onChange(await discussionService.update(discussion.id, payload))
    setEditing(false)
    toast.success(t('forum.detail.updated'))
  }

  const manageable = canManage(discussion.authorId)

  return (
    <article className={className}>
      <header>
        <p className="flex flex-wrap items-center gap-2">
          <Badge tone={discussionCategories.toneOf(discussion.category)}>
            {discussionCategories.labelOf(discussion.category)}
          </Badge>
          {discussion.acceptedCommentId && (
            <>
              <Badge tone="green">
                <Icon name="check-circle" className="h-3.5 w-3.5" />
                {t('forum.detail.resolved')}
              </Badge>
              <Link
                to={`#${commentAnchor(discussion.acceptedCommentId)}`}
                className="link inline-flex min-h-[2.75rem] items-center text-sm sm:min-h-0"
              >
                {t('forum.detail.seeAnswer')}
              </Link>
            </>
          )}
        </p>
        <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
          {discussion.title}
        </h1>
        <p className="mt-4 flex items-center gap-3 text-sm text-ink-muted">
          <Avatar name={discussion.authorName} src={discussion.authorAvatarUrl} />
          <span>
            <AuthorLink
              id={discussion.authorId}
              name={discussion.authorName || t('forum.user')}
              className="block font-semibold text-ink"
            />
            <Time value={discussion.createdAt} format="datetime" />
            {commentCount > 0 && ` · ${t('forum.detail.comment', { count: commentCount })}`}
          </span>
        </p>
      </header>

      <UserText className="mt-6 text-lg leading-relaxed text-ink-soft">{discussion.content}</UserText>

      <footer className="mt-6 flex flex-wrap items-center gap-2 border-t border-slate-200 pt-4">
        <LikeButton
          count={discussion.likesCount}
          liked={discussion.isLikedByCurrentUser}
          pending={likePending}
          onToggle={handleLike}
          label={t('forum.detail.likeDiscussion')}
        />
        {manageable && (
          <>
            <Button variant="secondary" onClick={() => setEditing(true)}>
              <Icon name="pencil" className="h-4 w-4" />
              {t('forum.detail.edit')}
            </Button>
            <Button variant="ghost" onClick={() => setConfirmingDelete(true)}>
              <Icon name="trash" className="h-4 w-4" />
              {t('forum.detail.delete')}
            </Button>
          </>
        )}
      </footer>

      {editing && (
        <Modal title={t('forum.detail.editTitle')} size="md" onClose={() => setEditing(false)}>
          <DiscussionForm
            initialValues={{ title: discussion.title, content: discussion.content, category: discussion.category }}
            submitLabel={t('forum.detail.save')}
            onSubmit={handleUpdate}
            onCancel={() => setEditing(false)}
          />
        </Modal>
      )}

      {confirmingDelete && (
        <ConfirmDialog
          title={t('forum.detail.deleteTitle')}
          message={t('forum.detail.deleteMessage')}
          confirmLabel={t('forum.detail.deleteTitle')}
          pending={deletePending}
          onConfirm={deleteDiscussion}
          onCancel={() => setConfirmingDelete(false)}
        />
      )}
    </article>
  )
}
