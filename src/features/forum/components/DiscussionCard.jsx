import { Link } from '@/shared/i18n/router'
import Badge from '@/shared/components/Badge'
import Icon from '@/shared/components/Icon'
import Time from '@/shared/components/Time'
import { discussionCategories } from '@/shared/config/catalogs'
import { paths } from '@/shared/config/paths'
import { excerpt } from '@/shared/utils/text'
import { useI18n } from '@/shared/i18n/useI18n'
import AuthorLink from '@/features/profile/components/AuthorLink'
import Avatar from '@/shared/components/Avatar'

export default function DiscussionCard({ discussion, headingLevel = 'h3' }) {
  const { t } = useI18n()
  const Heading = headingLevel

  return (
    <article className="card relative p-5 transition-shadow hover:shadow-pop has-[.card-link:focus-visible]:ring-2 has-[.card-link:focus-visible]:ring-brand-600">
      <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <Badge tone={discussionCategories.toneOf(discussion.category)}>
          {discussionCategories.labelOf(discussion.category)}
        </Badge>
        <span className="flex items-center gap-2 text-sm text-ink-muted">
          <Avatar
            name={discussion.authorName}
            src={discussion.authorAvatarUrl}
            size="sm"
            className="h-6 w-6 text-[0.625rem]"
          />
          <AuthorLink
            id={discussion.authorId}
            name={discussion.authorName || t('forum.user')}
            className="font-medium text-ink-soft"
          />
          <span aria-hidden="true">·</span>
          <Time value={discussion.createdAt} format="short" />
        </span>
      </p>
      <Heading className="mt-3 text-lg font-bold leading-snug text-ink">
        <Link
          to={paths.discussionDetail(discussion)}
          className="card-link after:absolute after:inset-0 hover:text-accent focus-visible:ring-0 focus-visible:ring-offset-0"
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
