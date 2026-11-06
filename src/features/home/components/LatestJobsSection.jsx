import JobGrid from '@/features/jobs/components/JobGrid'
import { useLatestJobs } from '@/features/jobs/hooks/useLatestJobs'
import CardGridSkeleton from '@/shared/components/CardGridSkeleton'
import EmptyState from '@/shared/components/EmptyState'
import QueryBoundary from '@/shared/components/QueryBoundary'
import { paths } from '@/shared/config/paths'
import HomeSection from './HomeSection'

export default function LatestJobsSection() {
  const request = useLatestJobs(3)

  return (
    <HomeSection
      id="home-jobs"
      title="Últimas ofertas de empleo"
      description="Prácticas y puestos junior para dar tu primer paso profesional."
      linkTo={paths.jobs}
      linkLabel="Ver todas las ofertas"
      tinted
    >
      <QueryBoundary
        data={request.data}
        error={request.error}
        onRetry={request.reload}
        skeleton={<CardGridSkeleton count={3} withImage={false} />}
        errorTitle="No hemos podido cargar las ofertas"
      >
        {(items) =>
          items.length === 0 ? (
            <EmptyState icon="briefcase" title="Ahora mismo no hay ofertas" description="Vuelve pronto: añadimos oportunidades junior con frecuencia." />
          ) : (
            <JobGrid items={items} />
          )
        }
      </QueryBoundary>
    </HomeSection>
  )
}
