import TestimonialGrid from '@/features/testimonials/components/TestimonialGrid'
import { useLatestTestimonials } from '@/features/testimonials/hooks/useTestimonials'
import CardGridSkeleton from '@/shared/components/CardGridSkeleton'
import EmptyState from '@/shared/components/EmptyState'
import QueryBoundary from '@/shared/components/QueryBoundary'
import { paths } from '@/shared/config/paths'
import HomeSection from './HomeSection'

export default function TestimonialsSection() {
  const request = useLatestTestimonials()

  return (
    <HomeSection
      id="home-testimonials"
      title="Historias de la comunidad"
      description="Personas como tú cuentan cómo les va en su camino tech."
      linkTo={paths.testimonials}
      linkLabel="Ver todos los testimonios"
      tinted
    >
      <QueryBoundary
        data={request.data}
        error={request.error}
        onRetry={request.reload}
        skeleton={<CardGridSkeleton count={3} withImage={false} />}
        errorTitle="No hemos podido cargar los testimonios"
      >
        {(items) =>
          items.length === 0 ? (
            <EmptyState icon="star" title="Aún no hay testimonios" description="Sé la primera persona en compartir tu experiencia." />
          ) : (
            <TestimonialGrid items={items.slice(0, 3)} />
          )
        }
      </QueryBoundary>
    </HomeSection>
  )
}
