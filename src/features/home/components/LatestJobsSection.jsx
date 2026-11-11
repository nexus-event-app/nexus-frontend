import JobGrid from '@/features/jobs/components/JobGrid'
import JobPortals from '@/features/jobs/components/JobPortals'
import { useLatestJobs } from '@/features/jobs/hooks/useLatestJobs'
import CardGridSkeleton from '@/shared/components/CardGridSkeleton'
import EmptyState from '@/shared/components/EmptyState'
import QueryBoundary from '@/shared/components/QueryBoundary'
import { paths } from '@/shared/config/paths'
import HomeSection from './HomeSection'
import { useI18n } from '@/shared/i18n/useI18n'

export default function LatestJobsSection() {
  const { t } = useI18n()
  const request = useLatestJobs(3)

  return (
    <HomeSection
      id="home-jobs"
      eyebrow={t('home.jobs.eyebrow')}
      title={t('home.jobs.title')}
      description={t('home.jobs.description')}
      linkTo={paths.jobs}
      linkLabel={t('home.jobs.link')}
      tinted
    >
      <QueryBoundary
        data={request.data}
        error={request.error}
        onRetry={request.reload}
        skeleton={<CardGridSkeleton count={3} withImage={false} />}
        errorTitle={t('home.jobs.error')}
      >
        {(items) =>
          items.length === 0 ? (
            <EmptyState icon="briefcase" title={t('home.jobs.emptyTitle')} description={t('home.jobs.emptyText')} />
          ) : (
            <JobGrid items={items} />
          )
        }
      </QueryBoundary>
      <JobPortals compact />
    </HomeSection>
  )
}
