import { Link } from 'react-router-dom'
import Icon from '@/shared/components/Icon'

export default function StatCard({ label, value, icon, to, highlight = false }) {
  return (
    <Link
      to={to}
      className={`card flex items-center gap-4 p-5 transition-shadow hover:shadow-pop ${highlight ? 'border-amber-300 bg-amber-50' : ''}`}
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-control bg-brand-50 text-brand-700">
        <Icon name={icon} className="h-6 w-6" />
      </span>
      <span>
        <span className="block text-3xl font-extrabold text-ink">{value}</span>
        <span className="block text-sm font-medium text-ink-muted">{label}</span>
      </span>
    </Link>
  )
}
