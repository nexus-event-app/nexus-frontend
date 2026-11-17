import { useMemo, useState } from 'react'
import { useDebouncedValue } from '@/shared/hooks/useDebouncedValue'
import { useRequest } from '@/shared/hooks/useRequest'
import { useI18n } from '@/shared/i18n/useI18n'
import { glossarySearchGroup } from '@/features/learning/data/glossary'
import { searchService } from '../services/searchService'

export const MIN_QUERY_LENGTH = 2
// El glosario va primero: si buscas «API», lo primero útil es saber qué es.
export const GROUPS = ['glossary', 'news', 'jobs', 'discussions', 'people']

/** Número total de resultados de una respuesta de búsqueda. */
export function totalResults(result) {
  return result ? GROUPS.reduce((sum, group) => sum + result[group].total, 0) : 0
}

/** Añade a la respuesta del backend el grupo del glosario, con la misma forma que los demás. */
export function withGlossary(result, query, t, limit) {
  return { ...result, glossary: glossarySearchGroup(query, t, limit) }
}

/**
 * Búsqueda global mientras se escribe: espera a que se deje de teclear, cancela las peticiones que se quedan antiguas
 * y conserva los resultados anteriores hasta que llegan los nuevos, para que la lista no parpadee.
 */
export function useSearch(query, { limit = 5, delay = 250 } = {}) {
  const { t } = useI18n()
  const text = useDebouncedValue(query.trim(), delay)
  const enabled = text.length >= MIN_QUERY_LENGTH
  const request = useRequest(`search:${text}:${limit}`, ({ signal }) => searchService.search(text, limit, { signal }), {
    enabled,
  })
  // Último resultado recibido (estado derivado: se actualiza durante el renderizado, sin efectos).
  const [lastResult, setLastResult] = useState(null)
  if (request.data && request.data !== lastResult) setLastResult(request.data)
  // Los términos del glosario se buscan aquí mismo (son textos de la web, no están en el backend). Memorizado: el
  // resultado solo cambia cuando cambian la respuesta o el texto, y así no provoca repintados de más.
  const result = useMemo(
    () => (enabled && lastResult ? withGlossary(lastResult, text, t, limit) : null),
    [enabled, lastResult, text, t, limit],
  )

  return {
    query: text,
    enabled,
    // Mientras se teclea (aún sin la búsqueda nueva) se considera que está cargando.
    loading: enabled && (request.loading || text !== query.trim()),
    error: request.error,
    result,
    reload: request.reload,
  }
}
