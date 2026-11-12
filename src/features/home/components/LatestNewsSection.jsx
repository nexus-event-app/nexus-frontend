import { useLatestNews } from '@/features/news/hooks/useLatestNews'
import CardGridSkeleton from '@/shared/components/CardGridSkeleton'
import EmptyState from '@/shared/components/EmptyState'
import QueryBoundary from '@/shared/components/QueryBoundary'
import { paths } from '@/shared/config/paths'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'
import HomeNewsCard from './HomeNewsCard'
import HomeSection from './HomeSection'

/**
 * Noticias de la portada: la más reciente más grande y, a su lado, las dos siguientes más pequeñas, una encima de otra.
 * Compactas para que el apartado ocupe lo mismo que los demás.
 */
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
          const [featured, ...others] = items
          return (
            <ul className={cx('grid gap-6', others.length > 0 && 'lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]')}>
              <li className={cx(others.length > 1 && 'lg:row-span-2')}>
                <HomeNewsCard item={featured} featured />
              </li>
              {others.map((item, index) => (
                <li key={item.id}>
                  <HomeNewsCard item={item} delay={(index + 1) * 120} />
                </li>
              ))}
            </ul>
          )
        }}
      </QueryBoundary>
    </HomeSection>
  )
}
