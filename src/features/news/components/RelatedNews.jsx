import Eyebrow from '@/shared/components/Eyebrow'
import Icon from '@/shared/components/Icon'
import { paths } from '@/shared/config/paths'
import { Link } from '@/shared/i18n/router'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'
import NewsCard from './NewsCard'

/**
 * «Sigue leyendo», al final de una noticia: otras recientes con las mismas tarjetas que la página de noticias, y el
 * enlace para ver todas en forma de pastilla, como en la portada.
 */
export default function RelatedNews({ items, className }) {
  const { t } = useI18n()
  if (items.length === 0) return null

  return (
    <aside aria-labelledby="related-news-heading" className={className}>
      <header className="mb-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <hgroup>
          <Eyebrow>{t('news.related.eyebrow')}</Eyebrow>
          <h2 id="related-news-heading" className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {t('news.related.title')}
          </h2>
        </hgroup>
        <Link
          to={paths.news}
          className="group inline-flex min-h-[3rem] items-center gap-3 justify-self-start rounded-full border border-slate-200 bg-surface py-1.5 pl-5 pr-1.5 font-medium text-ink shadow-card transition-all hover:-translate-y-0.5 hover:border-accent-line hover:shadow-pop lg:justify-self-end"
        >
          {t('news.related.seeAll')}
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-white transition-transform group-hover:translate-x-0.5 dark:bg-brand-500">
            <Icon name="arrow-right" className="h-5 w-5" />
          </span>
        </Link>
      </header>
      <ul className={cx('grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3')}>
        {items.map((item) => (
          <li key={item.id}>
            <NewsCard item={item} headingLevel="h3" />
          </li>
        ))}
      </ul>
    </aside>
  )
}
