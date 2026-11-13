import Eyebrow from '@/shared/components/Eyebrow'
import Icon from '@/shared/components/Icon'
import Time from '@/shared/components/Time'
import { newsCategories } from '@/shared/config/catalogs'
import { paths } from '@/shared/config/paths'
import { Link } from '@/shared/i18n/router'
import { useI18n } from '@/shared/i18n/useI18n'
import { contentLanguageOf } from '@/shared/utils/contentLanguage'
import NewsImage from './NewsImage'

/**
 * «Sigue leyendo», al lado de una noticia: antetítulo y título (fuera del recuadro) y, debajo, una lista compacta de
 * otras noticias en un recuadro, cada una con su miniatura. Toda la fila lleva a la noticia.
 */
export default function RelatedNews({ items, className }) {
  const { t } = useI18n()
  if (items.length === 0) return null

  return (
    <aside aria-labelledby="related-news-heading" className={className}>
      {/* Antetítulo y título fuera del recuadro, como en el resto de la web; el recuadro es la propia lista. */}
      <hgroup>
        <Eyebrow>{t('news.related.eyebrow')}</Eyebrow>
        <h2 id="related-news-heading" className="mt-3 text-2xl font-bold tracking-tight text-ink">
          {t('news.related.title')}
        </h2>
      </hgroup>
      <ul className="mt-5 divide-y divide-slate-200 overflow-hidden rounded-3xl border border-slate-200 bg-surface shadow-card">
        {items.map((item) => (
          <li key={item.id}>
            <article className="group relative grid grid-cols-[4.5rem_minmax(0,1fr)] items-center gap-x-4 px-5 py-4 transition-colors hover:bg-canvas has-[a:focus-visible]:bg-canvas">
              <figure className="row-span-2 overflow-hidden rounded-xl">
                <NewsImage
                  url={item.imageUrl}
                  category={item.category}
                  title={item.title}
                  seed={item.id}
                  className="aspect-square transition-transform duration-500 group-hover:scale-105"
                />
              </figure>
              <p className="flex flex-wrap items-center gap-x-1.5 text-xs">
                <span className="font-semibold text-accent">{newsCategories.labelOf(item.category)}</span>
                <span aria-hidden="true" className="text-ink-muted">
                  ·
                </span>
                <Time value={item.createdAt} format="short" className="text-ink-muted" />
              </p>
              <h3
                lang={contentLanguageOf(item)}
                className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-ink"
              >
                <Link
                  to={paths.newsDetail(item)}
                  className="after:absolute after:inset-0 group-hover:text-accent focus-visible:ring-0 focus-visible:ring-offset-0"
                >
                  {item.title}
                </Link>
              </h3>
            </article>
          </li>
        ))}
      </ul>
      <Link
        to={paths.news}
        className="group mt-4 inline-flex min-h-[2.75rem] items-center gap-2 text-sm font-semibold text-accent"
      >
        {t('news.related.seeAll')}
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft transition-all group-hover:translate-x-0.5 group-hover:bg-brand-600 group-hover:text-white">
          <Icon name="arrow-right" className="h-4 w-4" />
        </span>
      </Link>
    </aside>
  )
}
