import TestimonialGrid from '@/features/testimonials/components/TestimonialGrid'
import { useLatestTestimonials } from '@/features/testimonials/hooks/useTestimonials'
import CardGridSkeleton from '@/shared/components/CardGridSkeleton'
import EmptyState from '@/shared/components/EmptyState'
import QueryBoundary from '@/shared/components/QueryBoundary'
import { paths } from '@/shared/config/paths'
import HomeSection from './HomeSection'
import { useI18n } from '@/shared/i18n/useI18n'

export default function TestimonialsSection() {
  const { t } = useI18n()
  const request = useLatestTestimonials()

  return (
    <HomeSection
      id="home-testimonials"
      eyebrow={t('home.testimonials.eyebrow')}
      title={t('home.testimonials.title')}
      description={t('home.testimonials.description')}
      // Lleva directamente al formulario para contar la tuya; las demás historias están en la misma página.
      linkTo={`${paths.testimonials}#share-heading`}
      linkLabel={t('home.testimonials.link')}
    >
      <QueryBoundary
        data={request.data}
        error={request.error}
        onRetry={request.reload}
        skeleton={<CardGridSkeleton count={3} withImage={false} />}
        errorTitle={t('home.testimonials.error')}
      >
        {(items) =>
          items.length === 0 ? (
            <EmptyState
              icon="star"
              title={t('home.testimonials.emptyTitle')}
              description={t('home.testimonials.emptyText')}
            />
          ) : (
            <TestimonialGrid items={items.slice(0, 3)} compact />
          )
        }
      </QueryBoundary>
    </HomeSection>
  )
}
