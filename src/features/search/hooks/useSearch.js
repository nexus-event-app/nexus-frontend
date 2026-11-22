import { useMemo, useState } from 'react'
import { useDebouncedValue } from '@/shared/hooks/useDebouncedValue'
import { useRequest } from '@/shared/hooks/useRequest'
import { useI18n } from '@/shared/i18n/useI18n'
import { glossarySearchGroup } from '@/features/learning/data/glossary'
import { searchService } from '../services/searchService'

export const MIN_QUERY_LENGTH = 2
export const GROUPS = ['glossary', 'news', 'jobs', 'discussions', 'people']

export function totalResults(result) {
  return result ? GROUPS.reduce((sum, group) => sum + result[group].total, 0) : 0
}

export function withGlossary(result, query, t, limit) {
  return { ...result, glossary: glossarySearchGroup(query, t, limit) }
}

export function useSearch(query, { limit = 5, delay = 250 } = {}) {
  const { t } = useI18n()
  const text = useDebouncedValue(query.trim(), delay)
  const enabled = text.length >= MIN_QUERY_LENGTH
  const request = useRequest(`search:${text}:${limit}`, ({ signal }) => searchService.search(text, limit, { signal }), {
    enabled,
  })
  const [lastResult, setLastResult] = useState(null)
  if (request.data && request.data !== lastResult) setLastResult(request.data)
  const result = useMemo(
    () => (enabled && lastResult ? withGlossary(lastResult, text, t, limit) : null),
    [enabled, lastResult, text, t, limit],
  )

  return {
    query: text,
    enabled,
    loading: enabled && (request.loading || text !== query.trim()),
    error: request.error,
    result,
    reload: request.reload,
  }
}
