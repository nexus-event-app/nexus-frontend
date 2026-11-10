import { useState } from 'react'
import { useDebouncedValue } from '@/shared/hooks/useDebouncedValue'
import { useRequest } from '@/shared/hooks/useRequest'
import { searchService } from '../services/searchService'

export const MIN_QUERY_LENGTH = 2
export const GROUPS = ['news', 'jobs', 'discussions', 'people']

/** Número total de resultados de una respuesta de búsqueda. */
export function totalResults(result) {
  return result ? GROUPS.reduce((sum, group) => sum + result[group].total, 0) : 0
}

/**
 * Búsqueda global mientras se escribe: espera a que se deje de teclear, cancela las peticiones que se quedan antiguas
 * y conserva los resultados anteriores hasta que llegan los nuevos, para que la lista no parpadee.
 */
export function useSearch(query, { limit = 5, delay = 250 } = {}) {
  const text = useDebouncedValue(query.trim(), delay)
  const enabled = text.length >= MIN_QUERY_LENGTH
  const request = useRequest(`search:${text}:${limit}`, ({ signal }) => searchService.search(text, limit, { signal }), {
    enabled,
  })
  // Último resultado recibido (estado derivado: se actualiza durante el renderizado, sin efectos).
  const [lastResult, setLastResult] = useState(null)
  if (request.data && request.data !== lastResult) setLastResult(request.data)

  return {
    query: text,
    enabled,
    // Mientras se teclea (aún sin la búsqueda nueva) se considera que está cargando.
    loading: enabled && (request.loading || text !== query.trim()),
    error: request.error,
    result: enabled ? lastResult : null,
    reload: request.reload,
  }
}
