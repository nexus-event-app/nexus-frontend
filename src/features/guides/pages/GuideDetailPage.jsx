import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useParams } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'
import ArticleSkeleton from '@/shared/components/ArticleSkeleton'
import Breadcrumbs from '@/shared/components/Breadcrumbs'
import ButtonLink from '@/shared/components/ButtonLink'
import ErrorState from '@/shared/components/ErrorState'
import Eyebrow from '@/shared/components/Eyebrow'
import Icon from '@/shared/components/Icon'
import Illustration from '@/shared/components/Illustration'
import JsonLd from '@/shared/components/JsonLd'
import NotFound from '@/shared/components/NotFound'
import PageMain from '@/shared/components/PageMain'
import Seo from '@/shared/components/Seo'
import ShareButton from '@/shared/components/ShareButton'
import Time from '@/shared/components/Time'
import { illustrations } from '@/shared/config/illustrations'
import { paths, registerPath } from '@/shared/config/paths'
import { useRequest } from '@/shared/hooks/useRequest'
import { Link } from '@/shared/i18n/router'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'
import { excerpt } from '@/shared/utils/text'
import GuideContent from '../components/GuideContent'
import GuideKeywordBoard from '../components/GuideKeywordBoard'
import { categoryOf } from '../config/categories'
import { guidesService } from '../services/guidesService'
import { parseGuide } from '../utils/guideMarkdown'
import { buildGuideData } from '../utils/structuredData'

function ReadingProgress({ target }) {
  const bar = useRef(null)
  useEffect(() => {
    const update = () => {
      const element = target.current
      if (!element || !bar.current) return
      const { top, height } = element.getBoundingClientRect()
      const total = height - window.innerHeight
      const progress = total <= 0 ? 1 : Math.min(1, Math.max(0, -top / total))
      bar.current.style.transform = `scaleX(${progress})`
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [target])
  return createPortal(
    <span aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-1">
      <span
        ref={bar}
        className="block h-full origin-left scale-x-0 bg-gradient-to-r from-brand-500 via-violet-500 to-pink-400"
      />
    </span>,
    document.body,
  )
}

function useActiveHeading(headingIds) {
  const [active, setActive] = useState(headingIds[0] ?? null)
  const key = headingIds.join('|')
  useEffect(() => {
    const ids = key ? key.split('|') : []
    if (!ids.length) return undefined
    let frame = 0
    const update = () => {
      frame = 0
      const line = window.innerHeight * 0.3
      let current = ids[0]
      for (const id of ids) {
        const element = document.getElementById(id)
        if (element && element.getBoundingClientRect().top <= line) current = id
      }
      setActive(current)
    }
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [key])
  return active
}

function TableOfContents({ headings }) {
  const { t } = useI18n()
  const active = useActiveHeading(headings.map((heading) => heading.id))
  if (headings.length < 3) return null
  return (
    <nav
      aria-labelledby="guide-toc"
      className="hidden rounded-3xl border border-slate-200 bg-surface p-6 shadow-card lg:block"
    >
      <h2
        id="guide-toc"
        className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.15em] text-accent"
      >
        <Icon name="code" className="h-4 w-4" />
        {t('guides.toc')}
      </h2>
      <ol className="relative mt-4 before:absolute before:bottom-5 before:left-[0.6875rem] before:top-5 before:w-0.5 before:bg-accent-tint">
        {headings.map((heading) => {
          const current = heading.id === active
          return (
            <li key={heading.id} className="relative">
              <a
                href={`#${heading.id}`}
                aria-current={current ? 'location' : undefined}
                className={cx(
                  'grid min-h-[2.75rem] grid-cols-[1.5rem_minmax(0,1fr)] items-center gap-3 rounded-control py-1 pr-2 text-sm transition-colors',
                  current ? 'font-semibold text-accent-strong' : 'font-medium text-ink-soft hover:text-accent',
                )}
              >
                <span
                  aria-hidden="true"
                  className={cx(
                    'relative mx-auto h-3 w-3 rounded-full ring-4 ring-surface transition-all',
                    current ? 'scale-125 bg-gradient-to-br from-brand-500 to-violet-600' : 'bg-accent-line',
                  )}
                />
                {heading.text}
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

function JoinCallout() {
  const { t } = useI18n()
  const { isAuthenticated } = useAuth()
  return (
    <section
      aria-labelledby="guide-cta"
      className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-violet-800 p-6 text-white shadow-pop sm:p-8"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 -z-10 h-40 w-40 rounded-full bg-violet-400/40 blur-2xl"
      />
      <p aria-hidden="true" className="font-mono text-xs text-brand-100">
        $ git commit -m &quot;primer paso&quot;
      </p>
      <h2 id="guide-cta" className="mt-3 text-2xl font-bold">
        {isAuthenticated ? t('guides.ctaMoreTitle') : t('guides.ctaTitle')}
      </h2>
      <p className="mt-3 leading-relaxed text-brand-100">
        {isAuthenticated ? t('guides.ctaMoreText') : t('guides.ctaText')}
      </p>
      <ButtonLink to={isAuthenticated ? paths.forum : registerPath()} variant="inverse" className="mt-6 rounded-full">
        {isAuthenticated ? t('guides.ctaForum') : t('guides.ctaJoin')}
        <Icon name="arrow-right" className="h-4 w-4" />
      </ButtonLink>
    </section>
  )
}

export default function GuideDetailPage() {
  const { t, lang } = useI18n()
  const { slug } = useParams()
  const articleRef = useRef(null)
  const request = useRequest(`guides:${slug}:${lang}`, ({ signal }) => guidesService.get(slug, { signal }))
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
  const path = paths.guideDetail(guide)
  const updated = guide.updatedAt && guide.updatedAt.slice(0, 10) !== guide.publishedAt?.slice(0, 10)

  return (
    <PageMain className="page-container page-section relative isolate grid grid-cols-1 content-start gap-x-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <ReadingProgress target={articleRef} />
      <span aria-hidden="true" className="bg-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem]" />
      <Seo
        title={guide.title}
        description={guide.description}
        path={path}
        type="article"
        publishedTime={guide.publishedAt}
        modifiedTime={guide.updatedAt}
        translated={(guide.languages ?? []).length === 3}
      />
      <JsonLd data={buildGuideData(guide)} />
      <Breadcrumbs
        className="col-span-full"
        items={[
          { label: t('guides.breadcrumb'), to: paths.guides },
          { label: excerpt(guide.title, 60), to: path },
        ]}
      />

      <header className="col-span-full mt-6 grid items-center gap-x-10 gap-y-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <hgroup className="min-w-0 max-w-3xl">
          <Eyebrow>{t(`guides.categories.${categoryOf(guide.category).value}`)}</Eyebrow>
          <p className="mt-4 flex w-fit max-w-full items-center gap-2 rounded-full border border-accent-line bg-accent-soft px-3 py-1 font-mono text-xs text-accent-strong">
            <Icon name="code" className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">~/guias/{guide.slug}.md</span>
          </p>
          <h1
            id="guide-title"
            lang={guide.language}
            className="mt-4 text-balance text-3xl font-bold leading-tight tracking-tight text-ink sm:text-[2.6rem]"
          >
            {guide.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted" lang={guide.language}>
            {guide.description}
          </p>
          {guide.language && guide.language !== lang && (
            <p className="mt-4 flex w-fit items-center gap-2 rounded-2xl bg-accent-soft px-4 py-2 text-sm font-medium text-accent-strong">
              <Icon name="info" className="h-4 w-4 shrink-0" />
              {t('guides.onlySpanish')}
            </p>
          )}
          <p className="mt-6 flex flex-wrap items-center gap-2 text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 font-medium text-ink-soft shadow-card ring-1 ring-slate-200">
              <Icon name="calendar" className="h-4 w-4 text-accent" />
              <Time value={guide.publishedAt} />
            </span>
            {updated && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 font-medium text-ink-soft shadow-card ring-1 ring-slate-200">
                <Icon name="refresh" className="h-4 w-4 text-accent" />
                {t('guides.updated')} <Time value={guide.updatedAt} />
              </span>
            )}
          </p>
        </hgroup>
        {guide.keywords?.length > 0 ? (
          <GuideKeywordBoard
            keywords={guide.keywords}
            className="hidden w-full max-w-[28rem] self-center justify-self-end xl:flex"
          />
        ) : (
          <Illustration {...illustrations.guides} className="hidden xl:block" />
        )}
      </header>

      <article
        ref={articleRef}
        aria-labelledby="guide-title"
        lang={guide.language}
        className="relative mt-10 min-w-0 rounded-3xl border border-slate-200 bg-surface py-8 pl-16 pr-6 text-lg leading-8 text-ink-soft shadow-card before:absolute before:bottom-12 before:left-[1.9rem] before:top-12 before:w-0.5 before:rounded-full before:bg-gradient-to-b before:from-brand-400 before:via-violet-400 before:to-accent-tint sm:py-10 sm:pl-24 sm:pr-10 sm:before:left-[2.9rem] lg:col-start-1"
      >
        <GuideContent blocks={blocks} />
      </article>

      <aside
        aria-label={t('guides.sidebar')}
        className="mt-10 grid content-start gap-6 lg:sticky lg:top-24 lg:col-start-2 lg:row-start-3 lg:self-start"
      >
        <TableOfContents headings={headings} />
        <JoinCallout />
      </aside>

      <footer className="mt-8 flex flex-wrap items-center justify-between gap-4 lg:col-start-1">
        <Link
          to={paths.guides}
          className="inline-flex min-h-[2.75rem] items-center gap-2 font-semibold text-ink-soft hover:text-accent"
        >
          <Icon name="arrow-left" className="h-4 w-4" />
          {t('guides.backToList')}
        </Link>
        <ShareButton title={guide.title} text={guide.description} />
      </footer>
    </PageMain>
  )
}
