import { Link } from '@/shared/i18n/router'
import Badge from '@/shared/components/Badge'
import Time from '@/shared/components/Time'
import { newsCategories } from '@/shared/config/catalogs'
import { paths } from '@/shared/config/paths'
import { excerpt } from '@/shared/utils/text'
import NewsImage from './NewsImage'
import { useI18n } from '@/shared/i18n/useI18n'

export default function NewsCard({ item, headingLevel = 'h3' }) {
  const { t } = useI18n()
  const Heading = headingLevel

  return (
    <article className="card relative flex h-full flex-col overflow-hidden transition-shadow hover:shadow-pop has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-600">
      <NewsImage url={item.imageUrl} category={item.category} />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <Badge tone={newsCategories.toneOf(item.category)}>{newsCategories.labelOf(item.category)}</Badge>
          <Time value={item.createdAt} format="short" className="text-sm text-ink-muted" />
        </div>
        <Heading className="mt-3 text-lg font-bold leading-snug text-ink">
          <Link
            to={paths.newsDetail(item)}
            className="after:absolute after:inset-0 hover:text-accent focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            {item.title}
          </Link>
        </Heading>
        <p className="mt-2 line-clamp-3 text-ink-muted">{excerpt(item.content, 180)}</p>
        {item.imported && item.source && <p className="mt-auto pt-3 text-sm text-ink-muted">{t('news.card.via', { source: item.source })}</p>}
      </div>
    </article>
  )
}
