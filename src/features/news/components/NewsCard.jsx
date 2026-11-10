import { Link } from '@/shared/i18n/router'
import Badge from '@/shared/components/Badge'
import Time from '@/shared/components/Time'
import { newsCategories } from '@/shared/config/catalogs'
import { paths } from '@/shared/config/paths'
import { excerpt } from '@/shared/utils/text'
import NewsImage from './NewsImage'
import ReadMoreHint from '@/shared/components/ReadMoreHint'
import { useIsClamped } from '@/shared/hooks/useIsClamped'
import { useI18n } from '@/shared/i18n/useI18n'

const EXCERPT_LENGTH = 180

/**
 * Tarjeta de una noticia. Todas miden lo mismo: título y resumen se recortan a tres líneas y reservan ese espacio;
 * si algo no cabe, el pie muestra «Leer más».
 */
export default function NewsCard({ item, headingLevel = 'h3' }) {
  const { t } = useI18n()
  const Heading = headingLevel
  const [titleRef, titleClamped] = useIsClamped([item.title])
  const [excerptRef, excerptClamped] = useIsClamped([item.content])
  const hasMore = titleClamped || excerptClamped || item.content.length > EXCERPT_LENGTH

  return (
    <article className="card relative flex h-full flex-col overflow-hidden pb-5 transition-shadow hover:shadow-pop has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-600">
      <NewsImage url={item.imageUrl} category={item.category} title={item.title} seed={item.id} />
      <p className="mx-5 mt-5 flex items-center gap-x-3">
        <Badge tone={newsCategories.toneOf(item.category)}>{newsCategories.labelOf(item.category)}</Badge>
        <Time value={item.createdAt} format="short" className="text-sm text-ink-muted" />
      </p>
      <Heading ref={titleRef} className="mx-5 mt-3 line-clamp-3 min-h-[3lh] text-lg font-bold leading-snug text-ink">
        <Link
          to={paths.newsDetail(item)}
          className="after:absolute after:inset-0 hover:text-accent focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          {item.title}
        </Link>
      </Heading>
      <p ref={excerptRef} className="mx-5 mt-2 line-clamp-3 min-h-[3lh] text-ink-muted">
        {excerpt(item.content, EXCERPT_LENGTH)}
      </p>
      <footer className="mx-5 mt-auto flex min-h-[1lh] items-center justify-between gap-3 pt-3 text-sm text-ink-muted">
        <span className="min-w-0 truncate">
          {item.imported && item.source && t('news.card.via', { source: item.source })}
        </span>
        {hasMore && <ReadMoreHint />}
      </footer>
    </article>
  )
}
