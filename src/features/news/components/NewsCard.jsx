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
 * una rejilla de dos columnas con la imagen a la izquierda ocupando todo el alto. `spotlight` no lleva imagen y va
 * sobre el degradado de la marca, con colores fijos (se ve igual en tema claro y oscuro).
 */
const STYLES = {
  default: {
    article: 'border border-slate-200 bg-surface',
    text: 'mx-6',
    title: 'text-lg text-ink',
    excerpt: 'text-ink-muted',
    muted: 'text-ink-muted',
    line: 'border-slate-200',
    read: 'text-accent',
    circle: 'bg-accent-soft group-hover:bg-brand-600 group-hover:text-white',
  },
  wide: {
    article:
      'border border-slate-200 bg-surface lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:grid-rows-[auto_auto_1fr_auto]',
    text: 'mx-6 lg:col-start-2 lg:mx-7',
    title: 'text-lg text-ink lg:text-2xl lg:leading-tight',
    excerpt: 'text-ink-muted',
    muted: 'text-ink-muted',
    line: 'border-slate-200',
    read: 'text-accent',
    circle: 'bg-accent-soft group-hover:bg-brand-600 group-hover:text-white',
  },
  spotlight: {
    article: 'bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 text-white',
    text: 'mx-6 sm:mx-7',
    title: 'text-2xl leading-tight text-white',
    excerpt: 'text-brand-100',
    muted: 'text-brand-100',
    line: 'border-white/20',
    read: 'text-white',
    circle: 'bg-white/15 group-hover:bg-white group-hover:text-brand-800',
  },
}

/**
 * Tarjeta de una noticia. Toda la tarjeta lleva a la noticia; «Leer noticia» es solo una pista visual. Las de una
 * misma fila miden lo mismo: el pie se queda abajo. `variant`: default, wide o spotlight (ver newsLayout).
 * `featured`: la más reciente de la lista, con la etiqueta «Destacada».
 */
export default function NewsCard({ item, headingLevel = 'h3', variant = 'default', featured = false }) {
  const { t } = useI18n()
  const Heading = headingLevel
  // El idioma del texto, para que el lector de pantalla lo pronuncie bien (WCAG 3.1.2).
  const language = contentLanguageOf(item)
  const styles = STYLES[variant]
  const spotlight = variant === 'spotlight'
  const wide = variant === 'wide'
  const featuredLabel = (
    <span
      className={cx(
        'rounded-full px-3.5 py-1.5 text-sm font-medium',
        spotlight ? 'bg-white/15 text-white' : 'bg-gray-950/75 text-white backdrop-blur',
      )}
    >
      {t('news.card.featured')}
    </span>
  )

  return (
    <article
      className={cx(
        'group relative isolate flex h-full flex-col overflow-hidden rounded-3xl shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-pop has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-brand-600',
        styles.article,
      )}
    >
      {spotlight ? (
        // Decoración: un halo de luz en la esquina, para que la tarjeta en color no quede plana.
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 -z-10 h-56 w-56 rounded-full bg-brand-400/30 blur-3xl transition-transform duration-700 group-hover:scale-125"
        />
      ) : (
        <figure className={cx('relative overflow-hidden', wide && 'lg:row-span-4 lg:h-full')}>
          <NewsImage
            url={item.imageUrl}
            category={item.category}
            title={item.title}
            seed={item.id}
            priority={featured}
            className={cx(
              'transition-transform duration-700 ease-out group-hover:scale-105',
              wide && 'lg:aspect-auto lg:h-full',
            )}
          />
          {featured && <figcaption className="absolute left-5 top-5">{featuredLabel}</figcaption>}
        </figure>
      )}
      <p className={cx('flex flex-wrap items-center gap-x-3 gap-y-2', styles.text, spotlight ? 'mt-7' : 'mt-5')}>
        {spotlight && featured && featuredLabel}
        {spotlight ? (
          <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-semibold text-white">
            {newsCategories.labelOf(item.category)}
          </span>
        ) : (
          <Badge tone={newsCategories.toneOf(item.category)}>{newsCategories.labelOf(item.category)}</Badge>
        )}
        <Time value={item.createdAt} format="relative" className={cx('text-sm', styles.muted)} />
        <ContentLanguageBadge language={language} />
      </p>
      <Heading
        lang={language}
        className={cx(
          'mt-3 line-clamp-3 font-bold leading-snug tracking-tight',
          styles.text,
          styles.title,
          spotlight ? 'mt-4' : 'min-h-[3lh]',
          wide && 'lg:min-h-0',
        )}
      >
        <Link
          to={paths.newsDetail(item)}
          className={cx(
            'after:absolute after:inset-0 focus-visible:ring-0 focus-visible:ring-offset-0',
            spotlight ? 'hover:underline hover:decoration-white/50 hover:underline-offset-4' : 'hover:text-accent',
          )}
        >
          {item.title}
        </Link>
      </Heading>
      <p
        lang={language}
        className={cx(
          'mb-5 mt-2',
          styles.text,
          styles.excerpt,
          // La destacada en color tiene sitio de sobra (no lleva imagen): enseña más resumen.
          spotlight ? 'mt-4 line-clamp-6' : 'line-clamp-3 min-h-[3lh]',
          wide && 'lg:mt-3 lg:min-h-0 lg:line-clamp-4',
        )}
      >
        {excerpt(item.content, spotlight || wide ? 280 : 180)}
      </p>
      <footer
        className={cx(
          'mt-auto flex items-center justify-between gap-3 border-t pb-5 pt-4 text-sm',
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
