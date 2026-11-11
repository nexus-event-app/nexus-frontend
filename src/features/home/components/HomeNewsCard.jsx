import NewsImage from '@/features/news/components/NewsImage'
import ContentLanguageBadge from '@/shared/components/ContentLanguageBadge'
import Icon from '@/shared/components/Icon'
import Time from '@/shared/components/Time'
import { newsCategories } from '@/shared/config/catalogs'
import { paths } from '@/shared/config/paths'
import { useInView } from '@/shared/hooks/useInView'
import { Link } from '@/shared/i18n/router'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'
import { contentLanguageOf } from '@/shared/utils/contentLanguage'
import { excerpt } from '@/shared/utils/text'

/**
 * Noticia de la portada. `featured`: la grande, con la imagen arriba y la etiqueta de destacada. `horizontal`: imagen
 * a la izquierda en pantallas medianas y grandes; si no, la imagen va arriba. Toda la tarjeta lleva a la noticia; «Leer noticia» es
 * solo una pista visual. Aparece subiendo un poco cuando entra en pantalla.
 */
export default function HomeNewsCard({ item, featured = false, horizontal = false, delay = 0 }) {
  const { t } = useI18n()
  const [ref, inView] = useInView()
  const language = contentLanguageOf(item)

  // Sin contenedor para el texto: cada bloque lleva su margen y la tarjeta los coloca con flex (destacada) o con una
  // rejilla de dos columnas (horizontal, la imagen ocupa toda la altura a la izquierda).
  const side = horizontal && !featured
  const pad = featured ? 'px-6 sm:px-8' : cx('px-6', side && 'sm:col-start-2')

  return (
    <article
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cx(
        'group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-surface shadow-card transition-all duration-700 ease-out hover:-translate-y-1 hover:shadow-pop has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-brand-600',
        side && 'sm:grid sm:grid-cols-[40%_minmax(0,1fr)] sm:grid-rows-[auto_auto_1fr_auto]',
        inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0 print:translate-y-0 print:opacity-100',
      )}
    >
      <figure className={cx('relative overflow-hidden', side && 'sm:row-span-4 sm:h-full')}>
        <NewsImage
          url={item.imageUrl}
          category={item.category}
          title={item.title}
          seed={item.id}
          priority={featured}
          className={cx(
            'transition-transform duration-700 ease-out group-hover:scale-105',
            featured ? 'aspect-[16/10]' : side && 'sm:aspect-auto sm:h-full',
          )}
        />
        {featured && (
          <figcaption className="absolute left-5 top-5 rounded-full bg-gray-950/75 px-3.5 py-1.5 text-sm font-medium text-white backdrop-blur">
            {t('home.news.featured')}
          </figcaption>
        )}
      </figure>
      <p className={cx('flex flex-wrap items-center gap-x-2 gap-y-1 pt-6 text-sm', pad, featured && 'sm:pt-8')}>
        <span className="font-semibold text-accent">{newsCategories.labelOf(item.category)}</span>
        <span aria-hidden="true" className="text-ink-muted">
          ·
        </span>
        <Time value={item.createdAt} format="short" className="text-ink-muted" />
        <ContentLanguageBadge language={language} />
      </p>
      <h3
        lang={language}
        className={cx(
          'mt-3 font-bold leading-tight tracking-tight text-ink',
          pad,
          featured ? 'text-2xl sm:text-4xl' : 'line-clamp-3 text-xl',
        )}
      >
        <Link
          to={paths.newsDetail(item)}
          className="after:absolute after:inset-0 hover:text-accent focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          {item.title}
        </Link>
      </h3>
      <p lang={language} className={cx('mb-6 mt-3 text-ink-muted', pad, featured ? 'text-lg' : 'line-clamp-2')}>
        {excerpt(item.content, featured ? 220 : 120)}
      </p>
      <footer
        className={cx(
          'mt-auto flex items-center justify-between gap-4 border-t border-slate-200 pb-6 pt-5 text-sm',
          featured ? 'mx-6 sm:mx-8 sm:pb-8' : cx('mx-6', side && 'sm:col-start-2'),
        )}
      >
        <span className="min-w-0 text-ink-muted">
          {item.imported && item.source ? t('news.card.via', { source: item.source }) : null}
        </span>
        <span aria-hidden="true" className="inline-flex shrink-0 items-center gap-2 font-semibold text-accent">
          {t('home.news.read')}
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft transition-all duration-300 group-hover:translate-x-1 group-hover:bg-brand-600 group-hover:text-white">
            <Icon name="arrow-right" className="h-4 w-4" />
          </span>
        </span>
      </footer>
    </article>
  )
}
