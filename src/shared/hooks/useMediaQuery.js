import { useCallback, useSyncExternalStore } from 'react'

/** ¿Se cumple la consulta de medios (p. ej. «(min-width: 1280px)»)? Se actualiza al cambiar el tamaño. */
export function useMediaQuery(query) {
  const subscribe = useCallback(
    (onChange) => {
      const media = window.matchMedia(query)
      media.addEventListener?.('change', onChange)
      return () => media.removeEventListener?.('change', onChange)
    },
    [query],
  )
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  )
}
