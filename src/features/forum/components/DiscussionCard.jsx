import { Link } from '@/shared/i18n/router'
import AuthorLink from '@/features/profile/components/AuthorLink'
import Avatar from '@/shared/components/Avatar'
import Badge from '@/shared/components/Badge'
import Icon from '@/shared/components/Icon'
import ReadMoreHint from '@/shared/components/ReadMoreHint'
import Time from '@/shared/components/Time'
import { discussionCategories } from '@/shared/config/catalogs'
import { paths } from '@/shared/config/paths'
import { useIsClamped } from '@/shared/hooks/useIsClamped'
import { useI18n } from '@/shared/i18n/useI18n'
import { excerpt } from '@/shared/utils/text'

const EXCERPT_LENGTH = 200

/**
 * Tarjeta de una discusión. Todas miden lo mismo: título y extracto se recortan a dos líneas y reservan ese
 * espacio aunque el texto sea más corto; si algo no cabe, el pie muestra «Leer más».
 */
export default function DiscussionCard({ discussion, headingLevel = 'h3' }) {
  const { t } = useI18n()
  const Heading = headingLevel
  const [titleRef, titleClamped] = useIsClamped([discussion.title])
  const [excerptRef, excerptClamped] = useIsClamped([discussion.content])
  const hasMore = titleClamped || excerptClamped || discussion.content.length > EXCERPT_LENGTH

  return (
    <article className="card relative flex h-full flex-col p-5 transition-shadow hover:shadow-pop has-[.card-link:focus-visible]:ring-2 has-[.card-link:focus-visible]:ring-brand-600">
      <p className="flex min-w-0 items-center gap-3">
        <Badge tone={discussionCategories.toneOf(discussion.category)} className="shrink-0">
          {discussionCategories.labelOf(discussion.category)}
        </Badge>
        <span className="flex min-w-0 items-center gap-2 text-sm text-ink-muted">
          <Avatar
            name={discussion.authorName}
            src={discussion.authorAvatarUrl}
            size="sm"
            className="h-6 w-6 text-[0.625rem]"
          />
          <AuthorLink
            id={discussion.authorId}
            name={discussion.authorName || t('forum.user')}
            className="truncate font-medium text-ink-soft"
          />
          <span aria-hidden="true">·</span>
          <Time value={discussion.createdAt} format="short" className="shrink-0" />
        </span>
      </p>
      <Heading ref={titleRef} className="mt-3 line-clamp-2 min-h-[2lh] text-lg font-bold leading-snug text-ink">
        <Link
          to={paths.discussionDetail(discussion)}
          className="card-link after:absolute after:inset-0 hover:text-accent focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          {discussion.title}
        </Link>
      </Heading>
      <p ref={excerptRef} className="mt-2 line-clamp-2 min-h-[2lh] text-ink-muted">
        {excerpt(discussion.content, EXCERPT_LENGTH)}
      </p>
      <footer className="mt-auto flex items-center justify-between gap-4 pt-4 text-sm text-ink-muted">
        <p className="flex items-center gap-4">
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
        {hasMore && <ReadMoreHint />}
      </footer>
    </article>
  )
}
