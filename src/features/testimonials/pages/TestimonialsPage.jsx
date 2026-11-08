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
import { siteConfig } from '@/shared/config/site'
import TestimonialForm from '../components/TestimonialForm'
import TestimonialGrid from '../components/TestimonialGrid'
import { useTestimonials } from '../hooks/useTestimonials'
import { useI18n } from '@/shared/i18n/useI18n'

export default function TestimonialsPage() {
  const { t } = useI18n()
  const { isAuthenticated, user } = useAuth()
  const request = useTestimonials()

  return (
    <div className="page-container page-section">
      <Seo
        title={t('testimonials.seoTitle')}
        description={t('testimonials.seoDescription', { name: siteConfig.name })}
        path={paths.testimonials}
      />
      <Breadcrumbs items={[{ label: t('testimonials.breadcrumb'), to: paths.testimonials }]} />
      <PageHeader
        title={t('testimonials.seoTitle')}
        description={t('testimonials.description')}
      />

      <QueryBoundary
        data={request.data}
        error={request.error}
        onRetry={request.reload}
        skeleton={<CardGridSkeleton count={3} withImage={false} />}
        errorTitle={t('testimonials.error')}
      >
        {(items) =>
          items.length === 0 ? (
            <EmptyState
              icon="star"
              title={t('testimonials.emptyTitle')}
              description={t('testimonials.emptyText')}
            />
          ) : (
            <TestimonialGrid items={items} />
          )
        }
      </QueryBoundary>

      <section aria-labelledby="share-heading" className="mx-auto mt-16 max-w-2xl">
        <SectionHeader
          id="share-heading"
          title={t('testimonials.shareTitle')}
          description={t('testimonials.shareText')}
        />
        {isAuthenticated && user?.emailVerified === false ? (
          <VerifyEmailNotice>{t('testimonials.confirmEmail')}</VerifyEmailNotice>
        ) : isAuthenticated ? (
          <TestimonialForm />
        ) : (
          <SignInPrompt>{t('testimonials.signIn')}</SignInPrompt>
        )}
      </section>
    </div>
  )
}
