import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import Avatar from '@/shared/components/Avatar'
import Icon from '@/shared/components/Icon'
import Modal from '@/shared/components/Modal'
import Spinner from '@/shared/components/Spinner'
import { searchPath } from '@/shared/config/paths'
import { siteConfig } from '@/shared/config/site'
import { useNavigate } from '@/shared/i18n/useNavigate'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'
import { GROUPS, totalResults, useSearch } from '../hooks/useSearch'
import { toEntries } from '../utils/searchEntries'

const GROUP_ICONS = { news: 'newspaper', jobs: 'briefcase', discussions: 'chat', people: 'user' }
const DIALOG_LIMIT = 4

/**
 * Ventana de búsqueda global (patrón ARIA «combobox» con lista agrupada). El foco se queda en el campo; las flechas
 * mueven la opción activa (aria-activedescendant), Intro la abre y, sin opción activa, abre la página de resultados.
 */
export default function SearchDialog({ onClose }) {
  const { t } = useI18n()
  const navigate = useNavigate()
  const baseId = useId()
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  // Atributo autofocus real (React no lo pone en el HTML): al abrirse, el <dialog> da el foco al campo y no al
  // botón de cerrar. Va en un efecto de diseño para que esté antes de que Modal llame a showModal().
  useLayoutEffect(() => {
    inputRef.current?.setAttribute('autofocus', '')
  }, [])
  const [active, setActive] = useState(-1)
  const search = useSearch(query, { limit: DIALOG_LIMIT })
  const { result } = search

  const groups = result
    ? GROUPS.map((group) => ({ group, entries: toEntries(group, result[group].items) })).filter((g) => g.entries.length)
    : []
  const seeAll = search.enabled
    ? { key: 'see-all', href: searchPath(search.query), title: t('search.seeAll', { query: search.query }) }
    : null
  const options = [...groups.flatMap((g) => g.entries), ...(seeAll ? [seeAll] : [])]
  const optionId = (index) => `${baseId}-option-${index}`
  const listboxId = `${baseId}-listbox`
  const total = totalResults(result)

  // Al cambiar los resultados, ninguna opción activa: Intro abre la página de resultados.
  const [resultSeen, setResultSeen] = useState(result)
  if (result !== resultSeen) {
    setResultSeen(result)
    setActive(-1)
  }

  useEffect(() => {
    if (active >= 0) document.getElementById(optionId(active))?.scrollIntoView({ block: 'nearest' })
    // eslint-disable-next-line react-hooks/exhaustive-deps -- optionId depende solo de baseId, que no cambia
  }, [active])

  const open = (href) => {
    onClose()
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
    if (active >= 0) open(options[active].href)
    else if (search.enabled || query.trim().length >= 2) open(searchPath(query))
  }

  let index = -1
  const renderOption = (entry) => {
    index += 1
    const current = index
    return (
      <li
        key={entry.key}
        id={optionId(current)}
        role="option"
        aria-selected={current === active}
        onMouseMove={() => current !== active && setActive(current)}
        onClick={() => open(entry.href)}
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
          <span className={cx('block font-medium', entry.key !== 'see-all' && 'truncate')}>{entry.title}</span>
          {entry.detail && <span className="block truncate text-sm text-ink-muted">{entry.detail}</span>}
        </span>
      </li>
    )
  }

  return (
    <Modal title={t('search.dialogTitle', { name: siteConfig.name })} onClose={onClose}>
      <search>
        <form onSubmit={handleSubmit} className="relative">
          <label htmlFor={`${baseId}-input`} className="sr-only">
            {t('search.inputLabel')}
          </label>
          <Icon
            name="search"
            className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-muted"
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
            className="field-input pl-10 pr-16"
          />
          {search.loading && (
            <span className="absolute right-10 top-1/2 -translate-y-1/2">
              <Spinner size="sm" />
            </span>
          )}
        </form>
      </search>

      <p id={`${baseId}-hint`} className="mt-2 text-sm text-ink-muted">
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

      {result && total === 0 && !search.loading && (
        <p className="mt-6 text-center text-ink-muted">
          <strong className="block font-semibold text-ink">{t('search.noResults', { query: search.query })}</strong>
          {t('search.noResultsHint')}
        </p>
      )}

      {/* La lista solo existe mientras hay opciones (una lista de opciones vacía no es válida). */}
      {options.length > 0 && (
        <ul id={listboxId} role="listbox" aria-label={t('search.inputLabel')} className="mt-4 space-y-4">
          {groups.map(({ group, entries }) => (
            <li key={group} role="none">
              {/* Título visible del grupo; para los lectores de pantalla lo nombra aria-label del grupo. */}
              <span
                aria-hidden="true"
                className="mb-1 block px-3 text-xs font-bold uppercase tracking-wide text-ink-muted"
              >
                {t(`search.groups.${group}`)}
              </span>
              <ul role="group" aria-label={t(`search.groups.${group}`)}>
                {entries.map(renderOption)}
              </ul>
            </li>
          ))}
          {seeAll && (
            <li role="none" className="border-t border-slate-200 pt-3">
              <ul role="none">{renderOption(seeAll)}</ul>
            </li>
          )}
        </ul>
      )}
    </Modal>
  )
}
