import { useCallback, useEffect, useRef, useState } from 'react'

export function useIsClamped(content, expanded = false) {
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
    document.fonts?.ready.then(measure).catch(() => {})
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    return () => observer.disconnect()
  }, [measure, content, expanded])

  return [ref, clamped]
}
