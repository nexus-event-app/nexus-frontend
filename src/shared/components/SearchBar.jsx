import { useEffect, useId, useRef, useState } from 'react'
import { useDebouncedValue } from '@/shared/hooks/useDebouncedValue'
import { useI18n } from '@/shared/i18n/useI18n'
import Icon from './Icon'

export default function SearchBar({ value, onSearch, label, placeholder }) {
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

  return (
    // Va dentro de la zona de búsqueda de cada página (<search>), que agrupa también sus filtros.
    <form onSubmit={handleSubmit} className="flex gap-2">
      <p className="relative flex-1">
        <label htmlFor={inputId} className="sr-only">
          {fieldLabel}
        </label>
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
          className="field-input pl-10"
        />
        <Icon
          name="search"
          className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
        />
      </p>
      <button type="submit" className="btn btn-primary" aria-label={t('common.search.submit', { label: fieldLabel })}>
        <span className="hidden sm:inline">{t('common.search.button')}</span>
        <Icon name="search" className="h-5 w-5 sm:hidden" />
      </button>
    </form>
  )
}
