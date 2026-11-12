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
 * Noticia de la portada: imagen arriba, categoría y fecha, titular y resumen (dos líneas cada uno) y «Leer noticia».
 * Compacta para que el apartado ocupe lo mismo que los demás. Toda la tarjeta lleva a la noticia; «Leer noticia» es solo
 * una pista visual. Aparece subiendo un poco cuando entra en pantalla.
 */
export default function HomeNewsCard({ item, delay = 0 }) {
  const { t } = useI18n()
  const [ref, inView] = useInView()
  const language = contentLanguageOf(item)

  return (
    <article
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cx(
        'group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-surface shadow-card transition-all duration-700 ease-out hover:-translate-y-1 hover:shadow-pop has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-brand-600',
        inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0 print:translate-y-0 print:opacity-100',
      )}
    >
      <figure className="relative overflow-hidden">
        <NewsImage
          url={item.imageUrl}
          category={item.category}
          title={item.title}
          seed={item.id}
          className="aspect-[5/2] transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </figure>
      <p className="mx-6 flex flex-wrap items-center gap-x-2 gap-y-1 pt-5 text-sm">
        <span className="font-semibold text-accent">{newsCategories.labelOf(item.category)}</span>
        <span aria-hidden="true" className="text-ink-muted">
          ·
        </span>
        <Time value={item.createdAt} format="short" className="text-ink-muted" />
        <ContentLanguageBadge language={language} />
      </p>
      <h3 lang={language} className="mx-6 mt-2 line-clamp-2 text-lg font-bold leading-snug tracking-tight text-ink">
        <Link
          to={paths.newsDetail(item)}
          className="after:absolute after:inset-0 hover:text-accent focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          {item.title}
        </Link>
      </h3>
      <p lang={language} className="mx-6 mb-5 mt-2 line-clamp-2 text-sm leading-relaxed text-ink-muted">
        {excerpt(item.content, 140)}
      </p>
      <footer className="mx-6 mt-auto flex items-center justify-between gap-4 border-t border-slate-200 pb-5 pt-4 text-sm">
        <span className="min-w-0 truncate text-ink-muted">
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
