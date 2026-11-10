import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Indica si el texto de un elemento recortado con line-clamp no cabe entero (para mostrar «Leer más» solo
 * cuando hace falta). Se vuelve a medir cuando cambia el tamaño del elemento o su contenido (`deps`).
 */
export function useIsClamped(deps = []) {
  const ref = useRef(null)
  const [clamped, setClamped] = useState(false)

  const measure = useCallback(() => {
    const element = ref.current
    if (element) setClamped(element.scrollHeight > element.clientHeight + 1)
  }, [])

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `deps` es el contenido medido
  }, [measure, ...deps])

  return [ref, clamped]
}
