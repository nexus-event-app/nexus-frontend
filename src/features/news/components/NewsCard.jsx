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

/*
 * Clases de cada forma de la tarjeta. `wide` solo cambia en pantallas grandes (en las demás es como `default`): pasa a
 * una rejilla de dos columnas con la imagen a la izquierda ocupando todo el alto.
 */
const STYLES = {
  default: {
    article: 'border border-slate-200 bg-surface',
    text: 'mx-5',
    title: 'text-base text-ink',
    excerpt: 'text-ink-muted',
    muted: 'text-ink-muted',
    line: 'border-slate-200',
    read: 'text-accent',
    circle: 'bg-accent-soft group-hover:bg-brand-600 group-hover:text-white',
  },
  wide: {
    article:
      'border border-slate-200 bg-surface lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:grid-rows-[auto_auto_1fr_auto]',
    text: 'mx-5 lg:col-start-2 lg:mx-6',
    title: 'text-base text-ink lg:text-xl lg:leading-tight',
    excerpt: 'text-ink-muted',
    muted: 'text-ink-muted',
    line: 'border-slate-200',
    read: 'text-accent',
    circle: 'bg-accent-soft group-hover:bg-brand-600 group-hover:text-white',
  },
}

/**
 * Tarjeta de una noticia, compacta: imagen apaisada, titular y resumen a dos líneas. Toda la tarjeta lleva a la noticia; «Leer noticia» es solo una pista visual. Las de una
 * misma fila miden lo mismo: el pie se queda abajo. `variant`: default (imagen arriba) o wide (imagen al lado; ver
 * newsLayout).
 */
export default function NewsCard({ item, headingLevel = 'h3', variant = 'default' }) {
  const { t } = useI18n()
  const Heading = headingLevel
  // El idioma del texto, para que el lector de pantalla lo pronuncie bien (WCAG 3.1.2).
  const language = contentLanguageOf(item)
  const styles = STYLES[variant]
  const wide = variant === 'wide'

  return (
    <article
      className={cx(
        'group relative isolate flex h-full flex-col overflow-hidden rounded-3xl shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-pop has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-brand-600',
        styles.article,
      )}
    >
      <figure className={cx('relative overflow-hidden', wide && 'lg:row-span-4 lg:h-full')}>
        <NewsImage
          url={item.imageUrl}
          category={item.category}
          title={item.title}
          seed={item.id}
          className={cx(
            // Imagen más apaisada que la de 16:9 por defecto: la tarjeta queda más compacta.
            'aspect-[2/1] transition-transform duration-700 ease-out group-hover:scale-105',
            wide && 'lg:aspect-auto lg:h-full',
          )}
        />
      </figure>
      <p className={cx('mt-4 flex flex-wrap items-center gap-x-3 gap-y-2', styles.text)}>
        <Badge tone={newsCategories.toneOf(item.category)}>{newsCategories.labelOf(item.category)}</Badge>
        <Time value={item.createdAt} format="relative" className={cx('text-sm', styles.muted)} />
        <ContentLanguageBadge language={language} />
      </p>
      <Heading
        lang={language}
        className={cx(
          'mt-2 line-clamp-2 font-bold leading-snug tracking-tight',
          styles.text,
          styles.title,
          'min-h-[2lh]',
          wide && 'lg:min-h-0',
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
          'mb-4 mt-1.5 text-sm leading-relaxed',
          styles.text,
          styles.excerpt,
          'line-clamp-2 min-h-[2lh]',
          wide && 'lg:mt-2 lg:min-h-0 lg:line-clamp-4',
        )}
      >
        {excerpt(item.content, wide ? 280 : 180)}
      </p>
      <footer
        className={cx(
          'mt-auto flex items-center justify-between gap-3 border-t pb-4 pt-3 text-sm',
          styles.text,
          styles.line,
        )}
      >
        <span className={cx('min-w-0 truncate', styles.muted)}>
          {item.imported && item.source && t('news.card.via', { source: item.source })}
        </span>
        <span aria-hidden="true" className={cx('inline-flex shrink-0 items-center gap-2 font-semibold', styles.read)}>
          {t('news.card.read')}
          <span
            className={cx(
              'flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 group-hover:translate-x-1',
              styles.circle,
            )}
          >
            <Icon name="arrow-right" className="h-4 w-4" />
          </span>
        </span>
      </footer>
    </article>
  )
}
