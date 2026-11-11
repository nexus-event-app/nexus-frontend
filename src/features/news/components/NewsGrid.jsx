import { cx } from '@/shared/utils/classNames'
import NewsCard from './NewsCard'

/** Con menos noticias la destacada quedaría sola junto a un hueco: solo se destaca si hay al menos estas. */
const MIN_FOR_FEATURED = 4

/**
 * Rejilla de noticias. Con `featured`, en pantallas grandes la primera ocupa dos columnas y dos filas, y las dos
 * siguientes quedan apiladas a su lado: con las 12 de cada página, todas las filas quedan completas.
 */
export default function NewsGrid({ items, headingLevel, featured = false }) {
  const highlight = featured && items.length >= MIN_FOR_FEATURED
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => {
        const isFeatured = highlight && index === 0
        return (
          <li key={item.id} className={cx(isFeatured && 'lg:col-span-2 lg:row-span-2')}>
            <NewsCard item={item} headingLevel={headingLevel} featured={isFeatured} />
          </li>
        )
      })}
    </ul>
  )
}
