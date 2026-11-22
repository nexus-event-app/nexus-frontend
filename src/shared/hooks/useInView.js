import { useEffect, useRef, useState } from 'react'

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
