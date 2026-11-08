import { Link } from '@/shared/i18n/router'
import Badge from '@/shared/components/Badge'
import Icon from '@/shared/components/Icon'
import Time from '@/shared/components/Time'
import { discussionCategories } from '@/shared/config/catalogs'
import { paths } from '@/shared/config/paths'
import { excerpt } from '@/shared/utils/text'
import { useI18n } from '@/shared/i18n/useI18n'

export default function DiscussionCard({ discussion, headingLevel = 'h3' }) {
  const { t } = useI18n()
  const Heading = headingLevel

  return (
    <article className="card relative p-5 transition-shadow hover:shadow-pop has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-600">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <Badge tone={discussionCategories.toneOf(discussion.category)}>
          {discussionCategories.labelOf(discussion.category)}
        </Badge>
        <span className="text-sm text-ink-muted">
          {discussion.authorName || t('forum.user')} · <Time value={discussion.createdAt} format="short" />
        </span>
      </div>
      <Heading className="mt-3 text-lg font-bold leading-snug text-ink">
        <Link
          to={paths.discussionDetail(discussion)}
          className="after:absolute after:inset-0 hover:text-brand-700 focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          {discussion.title}
        </Link>
      </Heading>
      <p className="mt-2 line-clamp-2 text-ink-muted">{excerpt(discussion.content, 200)}</p>
      <p className="mt-4 flex items-center gap-4 text-sm text-ink-muted">
        <span className="inline-flex items-center gap-1.5">
          <Icon name="chat" className="h-4 w-4" />
          {discussion.commentCount}
          <span className="sr-only">{t('forum.card.comments')}</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Icon name="heart" className="h-4 w-4" />
          {discussion.likesCount}
          <span className="sr-only">{t('forum.card.likes')}</span>
        </span>
      </p>
    </article>
  )
}
