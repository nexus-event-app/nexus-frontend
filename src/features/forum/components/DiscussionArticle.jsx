import { useState } from 'react'
import { Link } from '@/shared/i18n/router'
import { useNavigate } from '@/shared/i18n/useNavigate'
import { commentAnchor } from '@/features/notifications/utils/notificationEntry'
import { useAuth } from '@/features/auth/hooks/useAuth'
import Alert from '@/shared/components/Alert'
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
import ReportButton from '@/features/reports/components/ReportButton'
import LikeButton from './LikeButton'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'
import { foldText } from '@/shared/utils/text'
import { authorOf } from '../utils/author'

export default function DiscussionArticle({ discussion, commentCount, onChange, className }) {
  const { t } = useI18n()
  const author = authorOf(discussion, t)
  const { isAuthenticated } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const canManage = useCanManage()
  const [editing, setEditing] = useState(false)
  const [confirmingDelete, setConfirmingDelete] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const folded = foldText(discussion.content)

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
    const updated = await discussionService.update(discussion.id, payload)
    onChange(updated)
    setEditing(false)
    if (updated.held) toast.info(t('forum.new.held'))
    else toast.success(t('forum.detail.updated'))
  }

  const manageable = canManage(discussion.authorId)

  return (
    <article
      className={cx('rounded-3xl border border-slate-200 bg-surface px-5 py-6 shadow-card sm:px-8 sm:py-7', className)}
    >
      <header>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="text-sm font-bold uppercase tracking-[0.15em] text-accent">
            {discussionCategories.labelOf(discussion.category)}
          </span>
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
        <h1 className="mt-3 text-balance text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl">
          {discussion.title}
        </h1>
        <p className="mt-4 flex items-center gap-3 text-sm text-ink-muted">
          <Avatar name={author.name} src={author.avatarUrl} />
          <span>
            <AuthorLink id={author.id} name={author.name} className="block font-semibold text-ink" />
            <Time value={discussion.createdAt} format="datetime" />
            {commentCount > 0 && ` · ${t('forum.detail.comment', { count: commentCount })}`}
          </span>
        </p>
      </header>

      {discussion.held && (
        <Alert variant="warning" title={t('forum.detail.heldTitle')} className="mt-5">
          {t('forum.detail.heldText')}
        </Alert>
      )}

      <UserText className="mt-5 leading-7 text-ink-soft">{folded && !expanded ? folded : discussion.content}</UserText>
      {folded && (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          className="mt-2 inline-flex min-h-[2.75rem] items-center gap-1 text-sm font-semibold text-accent hover:underline"
        >
          {expanded ? t('common.readLess') : t('common.readMore')}
          <Icon name="chevron-down" className={cx('h-4 w-4 transition-transform', expanded && 'rotate-180')} />
        </button>
      )}

      <footer className="mt-6 flex flex-wrap items-center gap-2 border-t border-slate-200 pt-4">
        <LikeButton
          count={discussion.likesCount}
          liked={discussion.isLikedByCurrentUser}
          pending={likePending}
          onToggle={handleLike}
          label={t('forum.detail.likeDiscussion')}
        />
        <ReportButton
          targetType="DISCUSSION"
          targetId={discussion.id}
          ownerId={discussion.authorId}
          srLabel={t('reports.discussionSr', { title: discussion.title })}
        />
        {manageable && (
          <>
            <Button variant="secondary" size="sm" className="sm:ml-auto" onClick={() => setEditing(true)}>
              <Icon name="pencil" className="h-4 w-4" />
              {t('forum.detail.edit')}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setConfirmingDelete(true)}>
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
