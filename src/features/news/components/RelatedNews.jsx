import { Link } from '@/shared/i18n/router'
import Time from '@/shared/components/Time'
import { paths } from '@/shared/config/paths'
import { useI18n } from '@/shared/i18n/useI18n'

export default function RelatedNews({ items }) {
  const { t } = useI18n()
  if (items.length === 0) return null

  return (
    <aside aria-labelledby="related-news-heading" className="lg:sticky lg:top-24 lg:self-start">
      <h2 id="related-news-heading" className="text-lg font-bold text-ink">
        {t('news.related.title')}
      </h2>
      <ul className="mt-4 space-y-4">
        {items.map((item) => (
          <li key={item.id} className="card p-4">
            <Time value={item.createdAt} format="short" className="text-sm text-ink-muted" />
            <h3 className="mt-1 font-semibold leading-snug text-ink">
              <Link to={paths.newsDetail(item)} className="hover:text-brand-700 hover:underline">
                {item.title}
              </Link>
            </h3>
          </li>
        ))}
      </ul>
      <Link to={paths.news} className="link mt-4 inline-flex min-h-[2.75rem] items-center">
        {t('news.related.seeAll')}
      </Link>
    </aside>
  )
}
