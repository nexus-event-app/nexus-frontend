import { useLatestNews } from '@/features/news/hooks/useLatestNews'
import NewsGrid from '@/features/news/components/NewsGrid'
import CardGridSkeleton from '@/shared/components/CardGridSkeleton'
import EmptyState from '@/shared/components/EmptyState'
import QueryBoundary from '@/shared/components/QueryBoundary'
import { paths } from '@/shared/config/paths'
import HomeSection from './HomeSection'
import { useI18n } from '@/shared/i18n/useI18n'

export default function LatestNewsSection() {
  const { t } = useI18n()
  const request = useLatestNews(3)

  return (
    <HomeSection
      id="home-news"
      title={t('home.news.title')}
      description={t('home.news.description')}
      linkTo={paths.news}
      linkLabel={t('home.news.link')}
    >
      <QueryBoundary
        data={request.data}
        error={request.error}
        onRetry={request.reload}
        skeleton={<CardGridSkeleton count={3} />}
        errorTitle={t('home.news.error')}
      >
        {(items) =>
          items.length === 0 ? (
            <EmptyState icon="newspaper" title={t('home.news.emptyTitle')} description={t('home.news.emptyText')} />
          ) : (
            <NewsGrid items={items} />
          )
        }
      </QueryBoundary>
    </HomeSection>
  )
}
