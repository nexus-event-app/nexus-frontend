import { useEffect, useId, useRef, useState } from 'react'
import Avatar from '@/shared/components/Avatar'
import Icon from '@/shared/components/Icon'
import Spinner from '@/shared/components/Spinner'
import { searchPath } from '@/shared/config/paths'
import { useDismiss } from '@/shared/hooks/useDismiss'
import { useNavigate } from '@/shared/i18n/useNavigate'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'
import { GROUPS, totalResults, useSearch } from '../hooks/useSearch'
import { toEntries } from '../utils/searchEntries'

const GROUP_ICONS = { news: 'newspaper', jobs: 'briefcase', discussions: 'chat', people: 'user' }
const RESULT_LIMIT = 4

const IS_MAC =
  typeof navigator !== 'undefined' && /mac|iphone|ipad/i.test(navigator.userAgentData?.platform ?? navigator.platform)
const SEARCH_SHORTCUT = IS_MAC ? '⌘ K' : 'Ctrl K'

const LAYOUT = {
  desktop: {
    form: 'absolute right-0 top-1/2 z-50 w-80 -translate-y-1/2',
    panel: 'absolute right-0 top-full z-50 mt-3 w-[28rem]',
  },
  mobile: {
    form: 'absolute inset-x-4 top-0 z-50 h-16 sm:inset-x-6',
    panel: 'absolute inset-x-4 top-full z-50 sm:inset-x-6',
  },
}

export default function SiteSearch({ open, onOpen, onClose, variant = 'desktop', className }) {
  const { t } = useI18n()
  const navigate = useNavigate()
  const baseId = useId()
  const containerRef = useRef(null)
  const buttonRef = useRef(null)
  const inputRef = useRef(null)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(-1)
  const search = useSearch(open ? query : '', { limit: RESULT_LIMIT })
  const { result } = search
  const layout = LAYOUT[variant]

  const close = ({ restoreFocus = true } = {}) => {
    setQuery('')
    setActive(-1)
    onClose()
    if (restoreFocus) requestAnimationFrame(() => buttonRef.current?.focus())
  }
  useDismiss(containerRef, open, () => close())

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  const groups =
    result && open
      ? GROUPS.map((group) => ({ group, entries: toEntries(group, result[group].items) })).filter(
          (g) => g.entries.length,
        )
      : []
  const seeAll =
    open && search.enabled
      ? { key: 'see-all', href: searchPath(search.query), title: t('search.seeAll', { query: search.query }) }
      : null
  const options = [...groups.flatMap((g) => g.entries), ...(seeAll ? [seeAll] : [])]
  const optionId = (index) => `${baseId}-option-${index}`
  const listboxId = `${baseId}-listbox`
  const total = totalResults(result)

  const [resultSeen, setResultSeen] = useState(result)
  if (result !== resultSeen) {
    setResultSeen(result)
    setActive(-1)
  }

  useEffect(() => {
    if (active >= 0) document.getElementById(`${baseId}-option-${active}`)?.scrollIntoView({ block: 'nearest' })
  }, [active, baseId])

  const go = (href) => {
    close({ restoreFocus: false })
    navigate(href)
  }

  const handleKeyDown = (event) => {
    if (!options.length) return
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActive((index) => (index + 1) % options.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActive((index) => (index <= 0 ? options.length - 1 : index - 1))
    } else if (event.key === 'Home' && active >= 0) {
      event.preventDefault()
      setActive(0)
    } else if (event.key === 'End' && active >= 0) {
      event.preventDefault()
      setActive(options.length - 1)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (active >= 0) go(options[active].href)
    else if (search.enabled || query.trim().length >= 2) go(searchPath(query))
  }

  const optionIndex = new Map(options.map((option, position) => [option.key, position]))
  const renderOption = (entry) => {
    const current = optionIndex.get(entry.key)
    return (
      <li
        key={entry.key}
        id={optionId(current)}
        role="option"
        aria-selected={current === active}
        onMouseMove={() => current !== active && setActive(current)}
        onClick={() => go(entry.href)}
        className={cx(
          'flex min-h-[2.75rem] cursor-pointer items-center gap-3 rounded-control px-3 py-2',
          current === active ? 'bg-accent-soft text-accent-strong' : 'text-ink',
        )}
      >
        {entry.person ? (
          <Avatar name={entry.person.name} src={entry.person.avatarUrl} size="sm" />
        ) : (
          <Icon
            name={entry.key === 'see-all' ? 'search' : GROUP_ICONS[entry.group]}
            className="h-5 w-5 shrink-0 text-ink-muted"
          />
        )}
        <span className="min-w-0">
          <span lang={entry.lang} className={cx('block font-medium', entry.key !== 'see-all' && 'truncate')}>
            {entry.title}
          </span>
          {entry.detail && <span className="block truncate text-sm text-ink-muted">{entry.detail}</span>}
        </span>
      </li>
    )
  }

  const typed = query.trim().length > 0
  const noResults = result && total === 0 && !search.loading

  return (
    <search ref={containerRef} aria-label={t('search.openLabel')} className={className}>
      <button
        ref={buttonRef}
        type="button"
        onClick={onOpen}
        aria-expanded={open}
        aria-controls={`${baseId}-form`}
        aria-label={t('search.openLabel')}
        aria-keyshortcuts={IS_MAC ? 'Meta+K' : 'Control+K'}
        title={t('search.shortcut', { keys: SEARCH_SHORTCUT })}
        className={cx(
          'inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-ink-muted transition-colors hover:border-accent-line hover:text-accent',
          open && 'invisible',
        )}
      >
        <Icon name="search" className="h-5 w-5" />
      </button>

      {open && (
        <>
          <form
            id={`${baseId}-form`}
            onSubmit={handleSubmit}
            className={cx('flex animate-fade-in items-center gap-2 bg-surface', layout.form)}
          >
            <label htmlFor={`${baseId}-input`} className="sr-only">
              {t('search.inputLabel')}
            </label>
            <span className="relative flex-1">
              <Icon
                name="search"
                className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-muted"
              />
              <input
                ref={inputRef}
                id={`${baseId}-input`}
                type="search"
                role="combobox"
                aria-expanded={options.length > 0}
                aria-controls={listboxId}
                aria-autocomplete="list"
                aria-activedescendant={active >= 0 ? optionId(active) : undefined}
                aria-describedby={`${baseId}-hint`}
                autoComplete="off"
                enterKeyHint="search"
                maxLength={100}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t('search.placeholder')}
                className="field-input min-h-[2.75rem] rounded-full py-2 pl-11 pr-10 text-sm [&::-webkit-search-cancel-button]:appearance-none"
              />
              {search.loading && (
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2">
                  <Spinner size="sm" />
                </span>
              )}
            </span>
            <button
              type="button"
              onClick={() => close()}
              aria-label={t('search.close')}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ink-muted hover:bg-slate-100 hover:text-ink"
            >
              <Icon name="close" className="h-5 w-5" />
            </button>
          </form>

          <p id={`${baseId}-hint`} className="sr-only">
            {t('search.hint')}
          </p>
          <p role="status" className="sr-only">
            {search.loading
              ? t('search.loading')
              : result
                ? total
                  ? t('search.resultCount', { count: total })
                  : t('search.noResults', { query: search.query })
                : ''}
          </p>

          {typed && (
            <section
              aria-label={t('search.inputLabel')}
              className={cx(
                'card max-h-[min(70vh,32rem)] animate-fade-in overflow-y-auto p-2 shadow-pop',
                layout.panel,
              )}
            >
              {!search.enabled && <p className="px-3 py-2 text-sm text-ink-muted">{t('search.hint')}</p>}
              {noResults && (
                <p className="px-3 py-4 text-center text-sm text-ink-muted">
                  <strong className="block font-semibold text-ink">
                    {t('search.noResults', { query: search.query })}
                  </strong>
                  {t('search.noResultsHint')}
                </p>
              )}
              {options.length > 0 && (
                <ul id={listboxId} role="listbox" aria-label={t('search.inputLabel')} className="space-y-3">
                  {groups.map(({ group, entries }) => (
                    <li key={group} role="none">
                      <span
                        aria-hidden="true"
                        className="mb-1 block px-3 pt-1 text-xs font-bold uppercase tracking-wide text-ink-muted"
                      >
                        {t(`search.groups.${group}`)}
                      </span>
                      <ul role="group" aria-label={t(`search.groups.${group}`)}>
                        {entries.map(renderOption)}
                      </ul>
                    </li>
                  ))}
                  {seeAll && (
                    <li role="none" className="border-t border-slate-200 pt-2">
                      <ul role="none">{renderOption(seeAll)}</ul>
                    </li>
                  )}
                </ul>
              )}
            </section>
          )}
        </>
      )}
    </search>
  )
}
