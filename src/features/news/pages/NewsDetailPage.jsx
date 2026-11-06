import { Navigate, useParams } from 'react-router-dom'
import ArticleSkeleton from '@/shared/components/ArticleSkeleton'
import Badge from '@/shared/components/Badge'
import Breadcrumbs from '@/shared/components/Breadcrumbs'
import ErrorState from '@/shared/components/ErrorState'
import JsonLd from '@/shared/components/JsonLd'
import NotFound from '@/shared/components/NotFound'
import Seo from '@/shared/components/Seo'
import Time from '@/shared/components/Time'
import UserText from '@/shared/components/UserText'
import Icon from '@/shared/components/Icon'
import { newsCategories } from '@/shared/config/catalogs'
import { paths } from '@/shared/config/paths'
import { excerpt } from '@/shared/utils/text'
import { hostnameOf, isHttpUrl } from '@/shared/utils/url'
import { parseIdSlug } from '@/shared/utils/slug'
import NewsImage from '../components/NewsImage'
import RelatedNews from '../components/RelatedNews'
import { useLatestNews } from '../hooks/useLatestNews'
import { useNewsArticle } from '../hooks/useNewsArticle'
import { buildNewsArticleData } from '../utils/structuredData'

const RELATED_COUNT = 3

export default function NewsDetailPage() {
  const { idSlug } = useParams()
  const { id, slug } = parseIdSlug(idSlug)
  const articleRequest = useNewsArticle(id)
  const latestRequest = useLatestNews(RELATED_COUNT + 1)
  const article = articleRequest.data

  if (id === null || articleRequest.error?.status === 404) return <NotFound />
  if (articleRequest.error) {
    return (
      <div className="page-container page-section">
        <ErrorState error={articleRequest.error} title="No hemos podido cargar la noticia" onRetry={articleRequest.reload} />
      </div>
    )
  }
  if (!article) {
    return (
      <div className="page-container page-section">
        <ArticleSkeleton />
      </div>
    )
  }
  if (slug !== article.slug) return <Navigate to={paths.newsDetail(article)} replace />

  const related = (latestRequest.data ?? []).filter((item) => item.id !== article.id).slice(0, RELATED_COUNT)
  const path = paths.newsDetail(article)

  return (
    <div className="page-container page-section">
      <Seo
        title={article.title}
        description={excerpt(article.content, 160)}
        path={path}
        image={article.imageUrl}
        imageAlt={article.title}
        type="article"
        publishedTime={article.createdAt}
        modifiedTime={article.updatedAt}
      />
      <JsonLd data={buildNewsArticleData(article)} />
      <Breadcrumbs
        items={[
          { label: 'Noticias', to: paths.news },
          { label: excerpt(article.title, 60), to: path },
        ]}
      />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <article className="min-w-0 max-w-prose">
          <header>
            <Badge tone={newsCategories.toneOf(article.category)}>{newsCategories.labelOf(article.category)}</Badge>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl">
              {article.title}
            </h1>
            <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-muted">
              {article.author && <span>Por {article.author}</span>}
              <Time value={article.createdAt} />
            </p>
          </header>

          {article.imageUrl && (
            <figure className="mt-8 overflow-hidden rounded-card">
              <NewsImage url={article.imageUrl} alt={`Imagen de la noticia: ${article.title}`} priority />
            </figure>
          )}

          <UserText className="mt-8 text-lg leading-relaxed text-ink-soft">{article.content}</UserText>

          {isHttpUrl(article.sourceUrl) && (
            <footer className="mt-8 border-t border-slate-200 pt-6">
              <p className="text-ink-muted">
                Fuente:{' '}
                <a
                  href={article.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="link inline-flex items-center gap-1"
                >
                  {hostnameOf(article.sourceUrl)}
                  <Icon name="external" className="h-4 w-4" />
                  <span className="sr-only">(se abre en una pestaña nueva)</span>
                </a>
              </p>
            </footer>
          )}
        </article>

        <RelatedNews items={related} />
      </div>
    </div>
  )
}
