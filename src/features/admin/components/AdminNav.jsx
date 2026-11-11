import { NavLink } from 'react-router-dom'
import Icon from '@/shared/components/Icon'
import { paths } from '@/shared/config/paths'
import { cx } from '@/shared/utils/classNames'

const ITEMS = [
  { label: 'Panel', to: paths.admin, icon: 'dashboard', end: true },
  { label: 'Noticias', to: paths.adminNews, icon: 'newspaper' },
  { label: 'Empleo', to: paths.adminJobs, icon: 'briefcase' },
  { label: 'Foro', to: paths.adminForum, icon: 'chat' },
  { label: 'Testimonios', to: paths.adminTestimonials, icon: 'star' },
  { label: 'Reportes', to: paths.adminReports, icon: 'flag' },
  { label: 'Usuarios', to: paths.adminUsers, icon: 'users' },
  { label: 'Importación', to: paths.adminImport, icon: 'refresh' },
]

export default function AdminNav({ className }) {
  return (
    <nav aria-label="Administración" className={className}>
      <ul className="space-y-1">
        {ITEMS.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cx(
                  'flex min-h-[2.75rem] items-center gap-3 rounded-control px-3 font-semibold transition-colors',
                  isActive ? 'bg-accent-soft text-accent-strong' : 'text-ink-soft hover:bg-slate-100 hover:text-ink',
                )
              }
            >
              <Icon name={item.icon} />
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
