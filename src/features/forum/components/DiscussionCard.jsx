import { Link } from '@/shared/i18n/router'
import AuthorLink from '@/features/profile/components/AuthorLink'
import Avatar from '@/shared/components/Avatar'
import Badge from '@/shared/components/Badge'
import Icon from '@/shared/components/Icon'
import Time from '@/shared/components/Time'
import { discussionCategories } from '@/shared/config/catalogs'
import { paths } from '@/shared/config/paths'
import { useInView } from '@/shared/hooks/useInView'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'
import { excerpt } from '@/shared/utils/text'

const EXCERPT_LENGTH = 160
/** A partir de cuántas respuestas o me gusta una discusión se marca como «Popular». */
const POPULAR_REPLIES = 5
const POPULAR_LIKES = 10

/** Icono y colores de cada categoría (el nombre de la categoría siempre va también en texto). */
const CATEGORY_STYLES = {
  AYUDA_TECNICA: { icon: 'code', tile: 'bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-200' },
  RECURSOS: { icon: 'bookmark', tile: 'bg-green-50 text-green-700 dark:bg-green-500/15 dark:text-green-200' },
  EXPERIENCIAS: { icon: 'star', tile: 'bg-violet-50 text-violet-700 dark:bg-violet-500/15 dark:text-violet-200' },
  NETWORKING: { icon: 'users', tile: 'bg-pink-50 text-pink-700 dark:bg-pink-500/15 dark:text-pink-200' },
  GENERAL: { icon: 'chat', tile: 'bg-slate-100 text-ink-soft' },
}

/** Estado más destacado de la discusión: resuelta, popular o sin respuesta (o ninguno). */
function statusOf(discussion) {
  if (discussion.acceptedCommentId) return { key: 'resolved', tone: 'green', icon: 'check-circle' }
  if (discussion.commentCount >= POPULAR_REPLIES || discussion.likesCount >= POPULAR_LIKES) {
    return { key: 'popular', tone: 'amber', emoji: '🔥' }
  }
  if (discussion.commentCount === 0) return { key: 'unanswered', tone: 'pink', icon: 'chat' }
  return null
}

/**
 * Tarjeta de una discusión con aire de foro: categoría con su icono, estado (resuelta, popular o sin respuesta),
 * título, el inicio del mensaje en un bocadillo, quién lo escribió y cuándo, y al pie las respuestas, los me gusta y
 * «Participar». Toda la tarjeta lleva a la discusión (salvo el nombre, que lleva al perfil). Todas miden lo mismo.
 */
export default function DiscussionCard({ discussion, headingLevel = 'h3' }) {
  const { t } = useI18n()
  const Heading = headingLevel
  const [ref, inView] = useInView()
  const category = CATEGORY_STYLES[discussion.category] ?? CATEGORY_STYLES.GENERAL
  const status = statusOf(discussion)
  const author = discussion.authorName || t('forum.user')

  return (
    <article
      ref={ref}
      className={cx(
        'group relative flex h-full flex-col rounded-3xl border border-slate-200 bg-surface p-6 shadow-card transition-all duration-500 ease-out hover:-translate-y-1 hover:border-accent-line hover:shadow-pop has-[.card-link:focus-visible]:ring-2 has-[.card-link:focus-visible]:ring-brand-600',
        inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0 print:translate-y-0 print:opacity-100',
      )}
    >
      <header className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className={cx(
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-6',
            category.tile,
          )}
        >
          <Icon name={category.icon} className="h-6 w-6" />
        </span>
        <p className="min-w-0 flex-1 truncate text-sm font-semibold text-ink-soft">
          {discussionCategories.labelOf(discussion.category)}
        </p>
        {status && (
          <Badge tone={status.tone} className="shrink-0">
            {status.icon ? (
              <Icon name={status.icon} className="h-3.5 w-3.5" />
            ) : (
              <span aria-hidden="true">{status.emoji}</span>
            )}
            {t(`forum.card.${status.key}`)}
          </Badge>
        )}
      </header>

      <Heading className="mt-4 line-clamp-2 min-h-[2lh] text-lg font-bold leading-snug text-ink">
        <Link
          to={paths.discussionDetail(discussion)}
          className="card-link after:absolute after:inset-0 after:rounded-3xl group-hover:text-accent focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          {discussion.title}
        </Link>
      </Heading>

      {/* El inicio del mensaje, como un bocadillo de conversación que sale de quien lo escribió (debajo). */}
      <p className="mt-4 min-h-[calc(2lh+1.5rem)] rounded-2xl rounded-bl-sm bg-canvas px-4 py-3 text-sm leading-relaxed text-ink-muted ring-1 ring-inset ring-slate-200 transition-colors group-hover:bg-accent-soft group-hover:ring-accent-line">
        {/* El recorte va en el texto, no en el bocadillo: con el relleno se vería asomar una tercera línea. */}
        <span className="line-clamp-2">{excerpt(discussion.content, EXCERPT_LENGTH)}</span>
      </p>
      <p className="mb-5 mt-3 flex min-w-0 items-center gap-2 text-sm text-ink-muted">
        <Avatar name={discussion.authorName} src={discussion.authorAvatarUrl} size="sm" />
        <AuthorLink id={discussion.authorId} name={author} className="truncate font-medium text-ink-soft" />
        <span aria-hidden="true">·</span>
        <Time value={discussion.createdAt} format="relative" className="shrink-0" />
      </p>

      <footer className="mt-auto flex items-center justify-between gap-3 border-t border-slate-200 pt-4 text-sm text-ink-muted">
        <p className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5">
            <Icon name="chat" className="h-4 w-4" />
            {t('forum.card.replies', { count: discussion.commentCount })}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Icon name="heart" className="h-4 w-4" />
            {discussion.likesCount}
            <span className="sr-only">{t('forum.card.likes')}</span>
          </span>
        </p>
        <span aria-hidden="true" className="inline-flex shrink-0 items-center gap-2 font-semibold text-accent">
          {t('forum.card.join')}
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft transition-all duration-300 group-hover:translate-x-1 group-hover:bg-brand-600 group-hover:text-white">
            <Icon name="arrow-right" className="h-4 w-4" />
          </span>
        </span>
      </footer>
    </article>
  )
}
