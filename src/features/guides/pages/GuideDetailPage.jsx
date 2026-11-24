import { useParams } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'
import ArticleSkeleton from '@/shared/components/ArticleSkeleton'
import Breadcrumbs from '@/shared/components/Breadcrumbs'
import ButtonLink from '@/shared/components/ButtonLink'
import CopyLinkButton from '@/shared/components/CopyLinkButton'
import ErrorState from '@/shared/components/ErrorState'
import Eyebrow from '@/shared/components/Eyebrow'
import Icon from '@/shared/components/Icon'
import JsonLd from '@/shared/components/JsonLd'
import NotFound from '@/shared/components/NotFound'
import PageMain from '@/shared/components/PageMain'
import Seo from '@/shared/components/Seo'
import Time from '@/shared/components/Time'
import { paths, registerPath } from '@/shared/config/paths'
import { useRequest } from '@/shared/hooks/useRequest'
import { Link } from '@/shared/i18n/router'
import { useI18n } from '@/shared/i18n/useI18n'
import { excerpt } from '@/shared/utils/text'
import { readingMinutes } from '@/features/news/utils/readingTime'
import GuideContent from '../components/GuideContent'
import { guidesService } from '../services/guidesService'
import { parseGuide, plainText } from '../utils/guideMarkdown'
import { buildGuideData } from '../utils/structuredData'

function TableOfContents({ headings }) {
  const { t } = useI18n()
  if (headings.length < 3) return null
  return (
    <nav
      aria-labelledby="guide-toc"
      className="mt-10 self-start rounded-3xl border border-slate-200 bg-surface p-6 shadow-card lg:col-start-2 lg:row-start-3 lg:mt-8"
    >
      <h2 id="guide-toc" className="text-sm font-bold uppercase tracking-[0.15em] text-accent">
        {t('guides.toc')}
      </h2>
      <ol className="mt-4 space-y-1 text-sm">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className="flex min-h-[2.75rem] items-center rounded-control px-2 font-medium text-ink-soft hover:bg-accent-soft hover:text-accent-strong"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

function JoinCallout() {
  const { t } = useI18n()
  const { isAuthenticated } = useAuth()
  return (
    <aside
      aria-labelledby="guide-cta"
      className="relative isolate mt-6 self-start overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 p-6 text-white shadow-pop sm:p-8 lg:sticky lg:top-24 lg:col-start-2 lg:row-start-4"
    >
      <h2 id="guide-cta" className="text-2xl font-bold">
        {isAuthenticated ? t('guides.ctaMoreTitle') : t('guides.ctaTitle')}
      </h2>
      <p className="mt-3 leading-relaxed text-brand-100">
        {isAuthenticated ? t('guides.ctaMoreText') : t('guides.ctaText')}
      </p>
      <ButtonLink to={isAuthenticated ? paths.forum : registerPath()} variant="inverse" className="mt-6 rounded-full">
        {isAuthenticated ? t('guides.ctaForum') : t('guides.ctaJoin')}
        <Icon name="arrow-right" className="h-4 w-4" />
      </ButtonLink>
    </aside>
  )
}

export default function GuideDetailPage() {
  const { t } = useI18n()
  const { slug } = useParams()
  const request = useRequest(`guides:${slug}`, ({ signal }) => guidesService.get(slug, { signal }))
  const guide = request.data

  if (request.error?.status === 404) return <NotFound />
  if (request.error) {
    return (
      <PageMain className="page-container page-section">
        <ErrorState error={request.error} title={t('guides.error')} onRetry={request.reload} />
      </PageMain>
    )
  }
  if (!guide) {
    return (
      <PageMain className="page-container page-section" loading>
        <ArticleSkeleton />
      </PageMain>
    )
  }

  const blocks = parseGuide(guide.content)
  const headings = blocks.filter((block) => block.type === 'h2')
  const minutes = readingMinutes(plainText(guide.content))
  const path = paths.guideDetail(guide)
  const updated = guide.updatedAt && guide.updatedAt.slice(0, 10) !== guide.publishedAt?.slice(0, 10)

  return (
    <PageMain className="page-container page-section relative isolate grid grid-cols-1 content-start gap-x-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <span aria-hidden="true" className="bg-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-96" />
      <Seo
        title={guide.title}
        description={guide.description}
        path={path}
        type="article"
        publishedTime={guide.publishedAt}
        modifiedTime={guide.updatedAt}
        translated={false}
      />
      <JsonLd data={buildGuideData(guide)} />
      <Breadcrumbs
        className="col-span-full"
        items={[
          { label: t('guides.breadcrumb'), to: paths.guides },
          { label: excerpt(guide.title, 60), to: path },
        ]}
      />

      <header className="mt-6 min-w-0 lg:col-start-1">
        <Eyebrow>{t('guides.eyebrow')}</Eyebrow>
        <h1
          id="guide-title"
          lang="es"
          className="mt-3 text-balance text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl"
        >
          {guide.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-muted" lang="es">
          {guide.description}
        </p>
        <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-muted">
          <Time value={guide.publishedAt} />
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1.5">
            <Icon name="clock" className="h-4 w-4" />
            {t('guides.readingTime', { count: minutes })}
          </span>
          {updated && (
            <>
              <span aria-hidden="true">·</span>
              <span>
                {t('guides.updated')} <Time value={guide.updatedAt} />
              </span>
            </>
          )}
        </p>
      </header>

      <article
        aria-labelledby="guide-title"
        lang="es"
        className="mt-8 min-w-0 rounded-3xl border border-slate-200 bg-surface p-6 text-lg leading-8 text-ink-soft shadow-card sm:p-10 lg:col-start-1 lg:row-span-2 lg:row-start-3"
      >
        <GuideContent blocks={blocks} />
      </article>

      <footer className="mt-8 flex flex-wrap items-center justify-between gap-4 lg:col-start-1 lg:row-start-5">
        <Link
          to={paths.guides}
          className="inline-flex min-h-[2.75rem] items-center gap-2 font-semibold text-ink-soft hover:text-accent"
        >
          <Icon name="arrow-left" className="h-4 w-4" />
          {t('guides.backToList')}
        </Link>
        <CopyLinkButton />
      </footer>

      <TableOfContents headings={headings} />
      <JoinCallout />
    </PageMain>
  )
}
