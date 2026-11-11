import { useEffect, useId, useRef, useState } from 'react'
import { useDebouncedValue } from '@/shared/hooks/useDebouncedValue'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'
import Icon from './Icon'

/**
 * Buscador de una página: busca mientras se escribe (con una pequeña espera) y también al pulsar Intro.
 * `compact`: versión pequeña y discreta, una pastilla con la lupa y sin botón; Intro sigue enviando la búsqueda.
 */
export default function SearchBar({ value, onSearch, label, placeholder, compact = false, className }) {
  const { t } = useI18n()
  const fieldLabel = label ?? t('common.search.label')
  const inputId = useId()
  const [draft, setDraft] = useState(value)
  const [syncedValue, setSyncedValue] = useState(value)
  const valueRef = useRef(value)
  const onSearchRef = useRef(onSearch)
  const debounced = useDebouncedValue(draft)

  if (value !== syncedValue) {
    setSyncedValue(value)
    setDraft(value)
  }

  useEffect(() => {
    valueRef.current = value
    onSearchRef.current = onSearch
  })

  useEffect(() => {
    const next = debounced.trim()
    if (next !== valueRef.current) onSearchRef.current(next)
  }, [debounced])

  const handleSubmit = (event) => {
    event.preventDefault()
    onSearch(draft.trim())
  }

  const input = (
    <input
      id={inputId}
      type="search"
      inputMode="search"
      enterKeyHint="search"
      autoComplete="off"
      maxLength={100}
      value={draft}
      onChange={(event) => setDraft(event.target.value)}
      placeholder={placeholder ?? t('common.search.placeholder')}
      className={
        compact
          ? 'block min-h-[2.75rem] w-full rounded-full border border-slate-200 bg-surface py-2 pl-10 pr-4 text-sm text-ink shadow-sm transition-colors placeholder:text-slate-500 hover:border-slate-300 focus:border-accent-line'
          : 'field-input pl-10'
      }
    />
  )
  const icon = (
    <Icon
      name="search"
      className={cx(
        'pointer-events-none absolute top-1/2 -translate-y-1/2 text-slate-500',
        compact ? 'left-3.5 h-4 w-4' : 'left-3 h-5 w-5',
      )}
    />
  )
  const labelElement = (
    <label htmlFor={inputId} className="sr-only">
      {fieldLabel}
    </label>
  )

  // Va dentro de la zona de búsqueda de cada página (<search>), que agrupa también sus filtros.
  if (compact) {
    return (
      <form onSubmit={handleSubmit} className={cx('relative', className)}>
        {labelElement}
        {input}
        {icon}
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={cx('flex gap-2', className)}>
      <p className="relative flex-1">
        {labelElement}
        {input}
        {icon}
      </p>
      <button type="submit" className="btn btn-primary" aria-label={t('common.search.submit', { label: fieldLabel })}>
        <span className="hidden sm:inline">{t('common.search.button')}</span>
        <Icon name="search" className="h-5 w-5 sm:hidden" />
      </button>
    </form>
  )
}
