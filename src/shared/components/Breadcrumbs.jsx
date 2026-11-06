import { Link } from 'react-router-dom'
import { absoluteUrl } from '@/shared/config/site'
import { paths } from '@/shared/config/paths'
import JsonLd from './JsonLd'
import Icon from './Icon'

export default function Breadcrumbs({ items }) {
  const trail = [{ label: 'Inicio', to: paths.home }, ...items]

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.to),
    })),
  }

  return (
    <nav aria-label="Migas de pan" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-ink-muted">
        {trail.map((item, index) => {
          const isLast = index === trail.length - 1
          return (
            <li key={item.to} className="flex min-w-0 items-center gap-1">
              {index > 0 && <Icon name="chevron-right" className="h-4 w-4 text-slate-400" />}
              {isLast ? (
                <span aria-current="page" className="truncate font-medium text-ink">
                  {item.label}
                </span>
              ) : (
                <Link to={item.to} className="rounded px-1 py-2 hover:text-brand-700 hover:underline">
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
      <JsonLd data={structuredData} />
    </nav>
  )
}
