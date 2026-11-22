import { cx } from '@/shared/utils/classNames'
import NewsCard from './NewsCard'
import { newsLayout } from './newsLayout'

export default function NewsGrid({ items, headingLevel, varied = false }) {
  const layout = varied ? newsLayout(items.length) : items.map(() => 'default')
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <li key={item.id} className={cx(layout[index] === 'wide' && 'lg:col-span-2')}>
          <NewsCard item={item} headingLevel={headingLevel} variant={layout[index]} />
        </li>
      ))}
    </ul>
  )
}
