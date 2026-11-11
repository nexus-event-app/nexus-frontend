import { Link } from '@/shared/i18n/router'
import Badge from '@/shared/components/Badge'
import ContentLanguageBadge from '@/shared/components/ContentLanguageBadge'
import Icon from '@/shared/components/Icon'
import Time from '@/shared/components/Time'
import { contentLanguageOf } from '@/shared/utils/contentLanguage'
import { newsCategories } from '@/shared/config/catalogs'
import { paths } from '@/shared/config/paths'
import { cx } from '@/shared/utils/classNames'
import { excerpt } from '@/shared/utils/text'
import NewsImage from './NewsImage'
import { useI18n } from '@/shared/i18n/useI18n'

/**
 * Tarjeta de una noticia. Todas miden lo mismo: título y resumen se recortan a tres líneas y reservan ese espacio.
 * Toda la tarjeta lleva a la noticia; «Leer noticia» es solo una pista visual. `featured`: la destacada de la lista,
 * con la imagen más grande (llena el alto que le da la rejilla) y el titular mayor.
 */
export default function NewsCard({ item, headingLevel = 'h3', featured = false }) {
  const { t } = useI18n()
  const Heading = headingLevel
  // El idioma del texto, para que el lector de pantalla lo pronuncie bien (WCAG 3.1.2).
  const language = contentLanguageOf(item)

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-pop has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-brand-600">
      <figure className={cx('relative overflow-hidden', featured && 'lg:flex-1')}>
        <NewsImage
          url={item.imageUrl}
          category={item.category}
          title={item.title}
          seed={item.id}
          priority={featured}
          className={cx(
            'transition-transform duration-700 ease-out group-hover:scale-105',
            featured && 'lg:aspect-auto lg:h-full lg:min-h-[18rem]',
          )}
        />
        {featured && (
          <figcaption className="absolute left-5 top-5 rounded-full bg-gray-950/75 px-3.5 py-1.5 text-sm font-medium text-white backdrop-blur">
            {t('news.card.featured')}
          </figcaption>
        )}
      </figure>
      <p className={cx('mt-5 flex flex-wrap items-center gap-x-3 gap-y-1', featured ? 'mx-6 lg:mx-8 lg:mt-7' : 'mx-6')}>
        <Badge tone={newsCategories.toneOf(item.category)}>{newsCategories.labelOf(item.category)}</Badge>
        <Time value={item.createdAt} format="relative" className="text-sm text-ink-muted" />
        <ContentLanguageBadge language={language} />
      </p>
      <Heading
        lang={language}
        className={cx(
          'mt-3 line-clamp-3 min-h-[3lh] font-bold leading-snug tracking-tight text-ink',
          featured ? 'mx-6 text-lg lg:mx-8 lg:min-h-0 lg:text-3xl lg:leading-tight' : 'mx-6 text-lg',
        )}
      >
        <Link
          to={paths.newsDetail(item)}
          className="after:absolute after:inset-0 hover:text-accent focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          {item.title}
        </Link>
      </Heading>
      <p
        lang={language}
        className={cx(
          'mb-5 mt-2 line-clamp-3 min-h-[3lh] text-ink-muted',
          featured ? 'mx-6 lg:mx-8 lg:mt-3 lg:min-h-0 lg:line-clamp-2 lg:text-lg' : 'mx-6',
        )}
      >
        {excerpt(item.content, featured ? 220 : 180)}
      </p>
      <footer
        className={cx(
          'mt-auto flex items-center justify-between gap-3 border-t border-slate-200 pb-5 pt-4 text-sm',
          featured ? 'mx-6 lg:mx-8 lg:pb-7' : 'mx-6',
        )}
      >
        <span className="min-w-0 truncate text-ink-muted">
          {item.imported && item.source && t('news.card.via', { source: item.source })}
        </span>
        <span aria-hidden="true" className="inline-flex shrink-0 items-center gap-2 font-semibold text-accent">
          {t('news.card.read')}
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft transition-all duration-300 group-hover:translate-x-1 group-hover:bg-brand-600 group-hover:text-white">
            <Icon name="arrow-right" className="h-4 w-4" />
          </span>
        </span>
      </footer>
    </article>
  )
}
