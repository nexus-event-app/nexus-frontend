import NewsCard from './NewsCard'

export default function NewsGrid({ items, headingLevel }) {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.id}>
          <NewsCard item={item} headingLevel={headingLevel} />
        </li>
      ))}
    </ul>
  )
}
