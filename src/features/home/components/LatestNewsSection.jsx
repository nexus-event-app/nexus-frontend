import { useLatestNews } from '@/features/news/hooks/useLatestNews'
import CardGridSkeleton from '@/shared/components/CardGridSkeleton'
import EmptyState from '@/shared/components/EmptyState'
import QueryBoundary from '@/shared/components/QueryBoundary'
import { paths } from '@/shared/config/paths'
import { useI18n } from '@/shared/i18n/useI18n'
import HomeNewsCard from './HomeNewsCard'
import HomeSection from './HomeSection'

/** Noticias de la portada: las tres más recientes, iguales y en fila, como el foro (todos los apartados ocupan lo mismo). */
export default function LatestNewsSection() {
  const { t } = useI18n()
  const request = useLatestNews(3)

  return (
    <HomeSection
      id="home-news"
      eyebrow={t('home.news.eyebrow')}
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
        {(items) => {
          if (items.length === 0) {
            return (
              <EmptyState icon="newspaper" title={t('home.news.emptyTitle')} description={t('home.news.emptyText')} />
            )
          }
          return (
            <ul className="grid gap-6 md:grid-cols-3">
              {items.map((item, index) => (
                <li key={item.id}>
                  <HomeNewsCard item={item} delay={index * 120} />
                </li>
              ))}
            </ul>
          )
        }}
      </QueryBoundary>
    </HomeSection>
  )
}
