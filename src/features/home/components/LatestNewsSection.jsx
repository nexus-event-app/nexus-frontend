import { useLatestNews } from '@/features/news/hooks/useLatestNews'
import NewsGrid from '@/features/news/components/NewsGrid'
import CardGridSkeleton from '@/shared/components/CardGridSkeleton'
import EmptyState from '@/shared/components/EmptyState'
import QueryBoundary from '@/shared/components/QueryBoundary'
import { paths } from '@/shared/config/paths'
import HomeSection from './HomeSection'

export default function LatestNewsSection() {
  const request = useLatestNews(3)

  return (
    <HomeSection
      id="home-news"
      title="Últimas noticias"
      description="Lo más relevante del mundo tech, contado de forma clara."
      linkTo={paths.news}
      linkLabel="Ver todas las noticias"
    >
      <QueryBoundary
        data={request.data}
        error={request.error}
        onRetry={request.reload}
        skeleton={<CardGridSkeleton count={3} />}
        errorTitle="No hemos podido cargar las noticias"
      >
        {(items) =>
          items.length === 0 ? (
            <EmptyState icon="newspaper" title="Pronto publicaremos noticias" description="Estamos preparando las primeras publicaciones." />
          ) : (
            <NewsGrid items={items} />
          )
        }
      </QueryBoundary>
    </HomeSection>
  )
}
