import { useId, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Breadcrumbs from '@/shared/components/Breadcrumbs'
import ButtonLink from '@/shared/components/ButtonLink'
import Eyebrow from '@/shared/components/Eyebrow'
import Icon from '@/shared/components/Icon'
import PageMain from '@/shared/components/PageMain'
import Seo from '@/shared/components/Seo'
import { glossaryThreadHref } from '@/shared/config/community'
import { paths } from '@/shared/config/paths'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'
import { GLOSSARY, allTerms, searchTerms, splitCode, termAnchor } from '../data/glossary'
import MissingWordCallout from '../components/MissingWordCallout'

function RichText({ text }) {
  return splitCode(text).map((part, index) =>
    part.code ? (
      <code
        key={index}
        className={cx(
          'rounded-md bg-accent-soft px-1.5 py-0.5 font-mono text-[0.9em] text-accent-strong box-decoration-clone',
          part.text.length <= 24 ? 'whitespace-nowrap' : '[overflow-wrap:anywhere]',
        )}
      >
        {part.text}
      </code>
    ) : (
      part.text
    ),
  )
}

function TermCard({ item }) {
  const { t } = useI18n()
  return (
    <article
      id={termAnchor(item.id)}
      aria-labelledby={`${termAnchor(item.id)}-title`}
      className="flex h-full scroll-mt-28 flex-col rounded-3xl border border-slate-200 bg-surface p-6 shadow-card transition-shadow target:border-accent-line target:ring-2 target:ring-accent"
    >
      <h3 id={`${termAnchor(item.id)}-title`} className="text-lg font-bold text-ink">
        {item.term}
      </h3>
      <p className="mb-4 mt-2 leading-relaxed text-ink-soft">
        <RichText text={item.definition} />
      </p>
      <p className="mt-auto flex gap-2 rounded-2xl bg-canvas px-4 py-3 text-sm leading-relaxed text-ink-muted">
        <Icon name="sparkles" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
        <span>
          <strong className="font-semibold text-ink">{t('glossary.example')}:</strong> <RichText text={item.example} />
        </span>
      </p>
    </article>
  )
}

function CategoryFilter({ value, onChange, counts }) {
  const { t } = useI18n()
  const options = [
    { id: null, label: t('glossary.all') },
    ...GLOSSARY.map((c) => ({ id: c.id, label: t(`glossary.categories.${c.id}`) })),
  ]
  return (
    <fieldset>
      <legend className="sr-only">{t('glossary.filterLabel')}</legend>
      <ul className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = value === option.id
          return (
            <li key={option.id ?? 'all'}>
              <button
                type="button"
                aria-pressed={active}
                onClick={() => onChange(option.id)}
                className={cx(
                  'inline-flex min-h-[2.75rem] items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors',
                  active
                    ? 'bg-accent-soft text-accent-strong ring-1 ring-inset ring-accent-line'
                    : 'text-ink-soft hover:bg-slate-100',
                )}
              >
                {option.label}
                <span className="text-xs font-medium text-ink-muted">{counts[option.id ?? 'all']}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </fieldset>
  )
}

export default function GlossaryPage() {
  const { t } = useI18n()
  const inputId = useId()
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const [category, setCategory] = useState(null)

  const matches = searchTerms(allTerms(t), query)
  const counts = Object.fromEntries([
    ['all', matches.length],
    ...GLOSSARY.map((c) => [c.id, matches.filter((item) => item.category === c.id).length]),
  ])
  const visible = GLOSSARY.filter((c) => category === null || category === c.id)
    .map((c) => ({ ...c, items: matches.filter((item) => item.category === c.id) }))
    .filter((c) => c.items.length > 0)

  const handleSearch = (value) => setSearchParams(value ? { q: value } : {}, { replace: true })

  return (
    <PageMain className="page-container page-section relative isolate">
      <Seo title={t('glossary.seoTitle')} description={t('glossary.seoDescription')} path={paths.glossary} />
      <span aria-hidden="true" className="bg-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-96" />
      <Breadcrumbs
        items={[
          { label: t('learning.breadcrumb'), to: paths.learning },
          { label: t('glossary.breadcrumb'), to: paths.glossary },
        ]}
      />

      <header className="mt-6 grid items-end gap-x-10 gap-y-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <hgroup className="max-w-3xl">
          <Eyebrow>{t('glossary.eyebrow')}</Eyebrow>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl">{t('glossary.title')}</h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">{t('glossary.intro')}</p>
        </hgroup>
        <MissingWordCallout id="glossary-missing" />
      </header>

      <search className="mt-10 grid gap-4 border-y border-slate-200 py-5">
        <p className="relative max-w-md">
          <label htmlFor={inputId} className="sr-only">
            {t('glossary.searchLabel')}
          </label>
          <Icon
            name="search"
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-muted"
          />
          <input
            id={inputId}
            type="search"
            value={query}
            onChange={(event) => handleSearch(event.target.value)}
            placeholder={t('glossary.searchPlaceholder')}
            autoComplete="off"
            className="field-input rounded-full pl-11"
          />
        </p>
        <CategoryFilter value={category} onChange={setCategory} counts={counts} />
      </search>

      <p role="status" className="mt-6 text-sm text-ink-muted">
        {t('glossary.count', { count: visible.reduce((sum, c) => sum + c.items.length, 0) })}
      </p>

      {visible.length === 0 ? (
        <section
          aria-labelledby="glossary-empty"
          className="mt-6 rounded-3xl border border-dashed border-slate-300 p-8 text-center"
        >
          <h2 id="glossary-empty" className="text-xl font-bold text-ink">
            {t('glossary.emptyTitle')}
          </h2>
          <p className="mt-2 text-ink-muted">{t('glossary.emptyText')}</p>
          <ButtonLink to={glossaryThreadHref()} variant="secondary" className="mt-5 rounded-full">
            {t('glossary.missingCta')}
          </ButtonLink>
        </section>
      ) : (
        visible.map((group) => (
          <section key={group.id} aria-labelledby={`glossary-${group.id}`} className="mt-10">
            <header className="mb-5 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-soft text-accent"
              >
                <Icon name={group.icon} className="h-5 w-5" />
              </span>
              <h2 id={`glossary-${group.id}`} className="text-2xl font-bold tracking-tight text-ink">
                {t(`glossary.categories.${group.id}`)}
              </h2>
            </header>
            <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {group.items.map((item) => (
                <li key={item.id}>
                  <TermCard item={item} />
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </PageMain>
  )
}
