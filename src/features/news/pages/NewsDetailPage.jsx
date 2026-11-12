import { useParams } from 'react-router-dom'
import { Link, Navigate } from '@/shared/i18n/router'
import ArticleSkeleton from '@/shared/components/ArticleSkeleton'
import ActionMenu from '@/shared/components/ActionMenu'
import CopyLinkButton from '@/shared/components/CopyLinkButton'
import ContentLanguageBadge from '@/shared/components/ContentLanguageBadge'
import { contentLanguageOf } from '@/shared/utils/contentLanguage'
import Breadcrumbs from '@/shared/components/Breadcrumbs'
import ErrorState from '@/shared/components/ErrorState'
import JsonLd from '@/shared/components/JsonLd'
import NotFound from '@/shared/components/NotFound'
import PageMain from '@/shared/components/PageMain'
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
import { coverPhotoFor } from '../utils/coverPhoto'
import RelatedNews from '../components/RelatedNews'
import { useLatestNews } from '../hooks/useLatestNews'
import { useNewsArticle } from '../hooks/useNewsArticle'
import { readingMinutes } from '../utils/readingTime'
import { buildNewsArticleData } from '../utils/structuredData'
import { useI18n } from '@/shared/i18n/useI18n'

const RELATED_COUNT = 3

export default function NewsDetailPage() {
  const { t } = useI18n()
  const { idSlug } = useParams()
  const { id, slug } = parseIdSlug(idSlug)
  const articleRequest = useNewsArticle(id)
  const latestRequest = useLatestNews(RELATED_COUNT + 1)
  const article = articleRequest.data

  if (id === null || articleRequest.error?.status === 404) return <NotFound />
  if (articleRequest.error) {
    return (
      <PageMain className="page-container page-section">
        <ErrorState error={articleRequest.error} title={t('news.detail.error')} onRetry={articleRequest.reload} />
      </PageMain>
    )
  }
  if (!article) {
    return (
      <PageMain className="page-container page-section" loading>
        <ArticleSkeleton />
      </PageMain>
    )
  }
  if (slug !== article.slug) return <Navigate to={paths.newsDetail(article)} replace />

  const related = (latestRequest.data ?? []).filter((item) => item.id !== article.id).slice(0, RELATED_COUNT)
  const path = paths.newsDetail(article)
  const hasSource = isHttpUrl(article.sourceUrl)
  // Las noticias importadas son un resumen de un artículo ajeno: no se indexan ni se marcan como NewsArticle.
  const imported = Boolean(article.imported)

  const language = contentLanguageOf(article)
  const minutes = readingMinutes(article.content)

  // Diseño editorial: la noticia en una columna centrada y cómoda de leer (la imagen, algo más ancha) y, debajo,
  // «Sigue leyendo» a todo el ancho.
  return (
    <PageMain className="page-container page-section">
      <Seo
        title={article.title}
        description={excerpt(article.content, 160)}
        path={path}
        image={article.imageUrl || coverPhotoFor(article)}
        imageAlt={article.title}
        type="article"
        publishedTime={article.createdAt}
        modifiedTime={article.updatedAt}
        robots={imported ? 'noindex,follow' : 'index,follow'}
        translated={false}
      />
      {!imported && <JsonLd data={buildNewsArticleData(article)} />}
      <Breadcrumbs
        className="mx-auto max-w-3xl"
        items={[
          { label: t('news.breadcrumb'), to: paths.news },
          { label: excerpt(article.title, 60), to: path },
        ]}
      />

      <article className="mx-auto mt-6 max-w-3xl">
        <header>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
            <span className="font-bold uppercase tracking-[0.15em] text-accent">
              {newsCategories.labelOf(article.category)}
            </span>
            <ContentLanguageBadge language={language} />
          </p>
          <h1
            lang={language}
            className="mt-4 text-balance text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl"
          >
            {article.title}
          </h1>
          <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-muted">
            {article.author && (
              <>
                <span className="font-medium text-ink-soft">{t('news.detail.by', { author: article.author })}</span>
                <span aria-hidden="true">·</span>
              </>
            )}
            <Time value={article.createdAt} />
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="clock" className="h-4 w-4" />
              {t('news.detail.readingTime', { count: minutes })}
            </span>
            {imported && article.source && (
              <>
                <span aria-hidden="true">·</span>
                <span>{t('news.detail.via', { source: article.source })}</span>
              </>
            )}
          </p>
        </header>

        {/* La imagen, algo más ancha que el texto en pantallas grandes, para dar aire a la noticia. */}
        <figure className="mt-10 overflow-hidden rounded-3xl shadow-card lg:-mx-16">
          <NewsImage
            className="aspect-[2/1]"
            url={article.imageUrl}
            alt={t('news.detail.imageAlt', { title: article.title })}
            category={article.category}
            title={article.title}
            seed={article.id}
            priority
          />
        </figure>

        <UserText lang={language} className="mt-10 text-lg leading-8 text-ink-soft">
          {article.content}
        </UserText>

        {imported && hasSource && (
          <aside
            aria-label={t('news.detail.originalLabel')}
            className="mt-10 grid gap-5 rounded-3xl border border-slate-200 bg-surface p-6 shadow-card sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center sm:p-8"
          >
            <span
              aria-hidden="true"
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-700 to-brand-950 text-white shadow-md"
            >
              <Icon name="newspaper" className="h-6 w-6" />
            </span>
            <p className="text-ink-soft">
              {t('news.detail.summary')}{' '}
              <strong className="font-semibold text-ink">{article.source ?? hostnameOf(article.sourceUrl)}</strong>.
            </p>
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg justify-self-start shadow-pop sm:col-start-2"
            >
              {t('news.detail.readFull')}
              <Icon name="external" className="h-4 w-4" />
              <span className="sr-only">{t('common.newTab')}</span>
            </a>
          </aside>
        )}

        <footer className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6">
          {!imported && hasSource ? (
            <p className="text-sm text-ink-muted">
              {t('news.detail.source')}{' '}
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="link inline-flex items-center gap-1"
              >
                {hostnameOf(article.sourceUrl)}
                <Icon name="external" className="h-4 w-4" />
                <span className="sr-only">{t('common.newTab')}</span>
              </a>
            </p>
          ) : null}
          <ActionMenu className="flex-wrap gap-3 sm:ml-auto">
            <Link
              to={paths.news}
              className="inline-flex min-h-[2.75rem] items-center gap-2 rounded-full px-4 text-sm font-medium text-ink-soft transition-colors hover:bg-slate-100 hover:text-ink"
            >
              <Icon name="arrow-left" className="h-4 w-4" />
              {t('news.detail.back')}
            </Link>
            <CopyLinkButton />
          </ActionMenu>
        </footer>
      </article>

      <RelatedNews items={related} className="mt-24" />
    </PageMain>
  )
}
