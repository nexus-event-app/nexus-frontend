import { useEffect, useRef, useState } from 'react'

/**
 * Indica si un elemento ha entrado en pantalla (una sola vez): sirve para animar cuando se ve y no al cargar la
 * página. Sin IntersectionObserver (navegadores antiguos, pruebas) se considera visible desde el principio.
 */
export function useInView({ rootMargin = '0px 0px -10% 0px' } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    if (inView || !ref.current) return undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin },
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [inView, rootMargin])

  return [ref, inView]
}
