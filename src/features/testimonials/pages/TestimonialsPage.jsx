import { useAuth } from '@/features/auth/hooks/useAuth'
import SignInPrompt from '@/features/auth/components/SignInPrompt'
import VerifyEmailNotice from '@/features/auth/components/VerifyEmailNotice'
import Breadcrumbs from '@/shared/components/Breadcrumbs'
import CardGridSkeleton from '@/shared/components/CardGridSkeleton'
import EmptyState from '@/shared/components/EmptyState'
import PageHeader from '@/shared/components/PageHeader'
import QueryBoundary from '@/shared/components/QueryBoundary'
import SectionHeader from '@/shared/components/SectionHeader'
import Seo from '@/shared/components/Seo'
import { paths } from '@/shared/config/paths'
import TestimonialForm from '../components/TestimonialForm'
import TestimonialGrid from '../components/TestimonialGrid'
import { useTestimonials } from '../hooks/useTestimonials'

export default function TestimonialsPage() {
  const { isAuthenticated, user } = useAuth()
  const request = useTestimonials()

  return (
    <div className="page-container page-section">
      <Seo
        title="Testimonios de la comunidad"
        description="Historias reales de personas que están empezando en tecnología: aprendizajes, dudas y logros compartidos por la comunidad de Primer Commit."
        path={paths.testimonials}
      />
      <Breadcrumbs items={[{ label: 'Testimonios', to: paths.testimonials }]} />
      <PageHeader
        title="Testimonios de la comunidad"
        description="Experiencias reales de quienes están dando sus primeros pasos en tecnología."
      />

      <QueryBoundary
        data={request.data}
        error={request.error}
        onRetry={request.reload}
        skeleton={<CardGridSkeleton count={3} withImage={false} />}
        errorTitle="No hemos podido cargar los testimonios"
      >
        {(items) =>
          items.length === 0 ? (
            <EmptyState
              icon="star"
              title="Todavía no hay testimonios publicados"
              description="Sé la primera persona en compartir tu experiencia con la comunidad."
            />
          ) : (
            <TestimonialGrid items={items} />
          )
        }
      </QueryBoundary>

      <section aria-labelledby="share-heading" className="mx-auto mt-16 max-w-2xl">
        <SectionHeader
          id="share-heading"
          title="Comparte tu experiencia"
          description="Cuéntanos cómo te va en tu camino tech. Tu historia puede ayudar a otras personas."
        />
        {isAuthenticated && user?.emailVerified === false ? (
          <VerifyEmailNotice>Confirma tu email para compartir tu testimonio.</VerifyEmailNotice>
        ) : isAuthenticated ? (
          <TestimonialForm />
        ) : (
          <SignInPrompt>Inicia sesión o crea una cuenta para compartir tu testimonio.</SignInPrompt>
        )}
      </section>
    </div>
  )
}
