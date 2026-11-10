import { Link } from 'react-router-dom'
import ButtonLink from '@/shared/components/ButtonLink'
import ErrorState from '@/shared/components/ErrorState'
import Icon from '@/shared/components/Icon'
import PageHeader from '@/shared/components/PageHeader'
import Seo from '@/shared/components/Seo'
import LoadingStatus from '@/shared/components/LoadingStatus'
import Skeleton from '@/shared/components/Skeleton'
import { paths } from '@/shared/config/paths'
import StatCard from '../components/StatCard'
import { useAdminStats } from '../hooks/useAdminStats'

const QUICK_ACTIONS = [
  { label: 'Publicar una noticia', to: paths.adminNews, icon: 'newspaper' },
  { label: 'Publicar una oferta de empleo', to: paths.adminJobs, icon: 'briefcase' },
  { label: 'Moderar el foro', to: paths.adminForum, icon: 'chat' },
  { label: 'Revisar testimonios', to: paths.adminTestimonials, icon: 'star' },
  { label: 'Gestionar usuarios', to: paths.adminUsers, icon: 'users' },
]

export default function AdminDashboardPage() {
  const request = useAdminStats()
  const stats = request.data

  const cards = stats && [
    { label: 'Usuarios', value: stats.users, icon: 'users', to: paths.adminUsers },
    { label: 'Noticias', value: stats.news, icon: 'newspaper', to: paths.adminNews },
    { label: 'Ofertas de empleo', value: stats.jobs, icon: 'briefcase', to: paths.adminJobs },
    { label: 'Discusiones', value: stats.discussions, icon: 'chat', to: paths.adminForum },
    { label: 'Comentarios', value: stats.comments, icon: 'chat', to: paths.adminForum },
    {
      label: 'Testimonios pendientes',
      value: stats.pendingTestimonials,
      icon: 'star',
      to: paths.adminTestimonials,
      highlight: stats.pendingTestimonials > 0,
    },
  ]

  return (
    <>
      <Seo title="Panel de administración" path={paths.admin} robots="noindex,nofollow" />
      <PageHeader
        title="Panel de administración"
        description="Resumen de la actividad de la comunidad y accesos rápidos."
        actions={
          <ButtonLink to={paths.home} variant="secondary">
            Ver el sitio
          </ButtonLink>
        }
      />

      <section aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">
          Estadísticas
        </h2>
        {request.error ? (
          <ErrorState error={request.error} title="No hemos podido cargar las estadísticas" onRetry={request.reload} />
        ) : !cards ? (
          <>
            <LoadingStatus />
            <ul aria-hidden="true" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }, (_, index) => (
                <li key={index}>
                  <Skeleton className="h-24" />
                </li>
              ))}
            </ul>
          </>
        ) : (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {cards.map((card) => (
              <li key={card.label}>
                <StatCard {...card} />
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="quick-heading" className="mt-10">
        <h2 id="quick-heading" className="mb-4 text-xl font-bold text-ink">
          Accesos rápidos
        </h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {QUICK_ACTIONS.map((action) => (
            <li key={action.to}>
              <Link
                to={action.to}
                className="card flex min-h-[3.5rem] items-center gap-3 p-4 font-semibold text-ink hover:bg-slate-50"
              >
                <Icon name={action.icon} className="h-5 w-5 text-accent" />
                {action.label}
                <Icon name="arrow-right" className="ml-auto h-4 w-4 text-ink-muted" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
